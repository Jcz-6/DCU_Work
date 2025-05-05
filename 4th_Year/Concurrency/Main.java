import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.ThreadLocalRandom;


public class Main extends Thread{
    public static int MAX_TICKS = 1000;    

    // Default values for the similation based on the Spec provided on loop
    public static int FARMERS = 5;
    public static int BUYERS = 4;
    public static int farmersOnBreak = 3;
    public static String paraConfig = "No";
    public static int deliverySize = 10;
    public static int deliveryTime = 100;
    public static int carryLimit = 10;
    public static int fieldLimit = 10;
    public static int TICK_TIME_SIZE = 100;

    // Wait ticks functions used to implement breaks, travelling between fields, stocking animals, delays on buying and delivering
    public static void waitTicks(int ticks) {
        try {
            Thread.sleep(ticks * TICK_TIME_SIZE);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    

    public static AtomicInteger tick = new AtomicInteger(0);
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Custom input readers which use a scanner
        try {
            System.out.println("Type Yes to use Custom Parameters Type No to Use Default ones, Press enter");
            paraConfig = scanner.nextLine();
            if (paraConfig.equalsIgnoreCase("Yes")) {
                System.out.print("Enter number of Farmers (Must be =< 5): ");
                FARMERS = Integer.parseInt(scanner.nextLine());

                System.out.print("Enter number of Buyers: ");
                BUYERS = Integer.parseInt(scanner.nextLine());

                System.out.print("Enter number of Farmers to take breaks: ");
                farmersOnBreak = Integer.parseInt(scanner.nextLine());

                System.out.print("Enter number for Delivery Size: ");
                deliverySize = Integer.parseInt(scanner.nextLine());

                System.out.print("Ticks to wait per Delivery: ");
                deliveryTime = Integer.parseInt(scanner.nextLine());

                System.out.print("Limit of animals each Farmer can carry: ");
                carryLimit = Integer.parseInt(scanner.nextLine());

                System.out.print("Limit of animals each Field can hold: ");
                fieldLimit = Integer.parseInt(scanner.nextLine());

                System.out.print("Tick Time (Default=100): ");
                TICK_TIME_SIZE = Integer.parseInt(scanner.nextLine());
            } 
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Using default values.");
        }
        scanner.close();

        // Initiate needed classes and variables for simulation: Fields Enclosure Farm
        Enclosure enclosure = new Enclosure();
        String[] animals = {"chicken", "pig", "llama", "sheep", "cow"};
        
        FarmField chickenField = new FarmField("chicken", fieldLimit);
        FarmField cowField = new FarmField("cow", fieldLimit);
        FarmField sheepField = new FarmField("sheep", fieldLimit);
        FarmField pigField = new FarmField("pig" , fieldLimit);
        FarmField llamaField = new FarmField("llama", fieldLimit);


        Farm farm = new Farm(chickenField, pigField, llamaField, sheepField, cowField);

        //Executor service used to manage threads
        ExecutorService executorService = Executors.newCachedThreadPool();
        
        // Create Farmers based on input
        for (int i = 0; i < FARMERS; i++) {
            String type = animals[i % animals.length]; 
            int fieldId = i % animals.length;
            Farmer farmer = new Farmer(i, enclosure, type, fieldId, farm, carryLimit);
            executorService.submit(farmer);
        }

        

        Runnable tickCounter = new Runnable() {
            @Override
            public void run(){
                while (tick.get() < MAX_TICKS) {
                    tick.incrementAndGet();
                    waitTicks(1);
                }
                //Once the Ticks reach 1000 we shutdown the simulation
                executorService.shutdownNow();
                // For processes still running after ticks
                try {
                    if (!executorService.awaitTermination(10, TimeUnit.SECONDS)) {
                        executorService.shutdownNow();
                    }
                } catch (InterruptedException e) {
                    executorService.shutdownNow();
                    Thread.currentThread().interrupt();
                }
            }
            
        };

        executorService.submit(tickCounter);
        executorService.submit(enclosure);

        // Create Buyers based on input
        for (int i = 0; i < BUYERS; i++) {
            executorService.submit(new Buyer(i, farm));
        }

    }
}


class Enclosure implements Runnable{
    String[] animals = {"chicken", "pig", "llama", "cow", "sheep"};

    Map<String, Integer> animalCount = new HashMap<String, Integer>(){{
        put("chicken",0);
        put("pig", 0);
        put("llama", 0);
        put("cow", 0);
        put("sheep", 0);
        }};

    Random random = new Random();

    // Generate delivery via random selection in the list based on input or default value
    synchronized void generateDelivery(){
        for (int i = 0; i < Main.deliverySize; i++) {
            String animal = animals[random.nextInt(animals.length)];
            animalCount.put(animal, animalCount.getOrDefault(animal, 0) + 1);
        }
        //Prints how many animals are in stock
        printDelivery();
        notifyAll();
        //Nofify once a delivery has been notify all the farmers
    }

    // Take animals from the enclosure and assign them to their farmer
    synchronized void takeFromEnclosure(Farmer farmer){
        int animalAmount = animalCount.get(farmer.farmerType);
        //Check if there is animals to take
        if (animalAmount != 0) {

            int currentAnimals = farmer.animals.get(farmer.farmerType);
            //If the farmer has less animals than the set limit
            if (currentAnimals < farmer.farmerLimit) {
                int animalsToTake = farmer.farmerLimit - currentAnimals;
                //Logic for when there is more animals delivered than the farmer can take
                //So the farmer takes as much as he can and the rest is added back to the enclosure
                if (animalAmount > animalsToTake) {
                    int animalsLeftOver = animalAmount - animalsToTake;
                    animalCount.put(farmer.farmerType, animalsLeftOver);
                    farmer.animals.put(farmer.farmerType, (currentAnimals + animalsToTake));
                }
                //Otherwise take them all
                else{
                    animalCount.put(farmer.farmerType, 0);
                    farmer.animals.put(farmer.farmerType, (currentAnimals + animalAmount));
                }
                
            }
            
        }
        else {
            try {
                //If the farmer has no animals wait for delivery
                if (farmer.animals.get(farmer.farmerType) == 0) {
                    wait();
                }
                
            } catch (Exception e) {
                Thread.currentThread().interrupt();
                return;
            }
        }

    }

    //Prints out the current stock of the enclosure and the size of our delivery set by input or default value
    void printDelivery(){
        System.out.println("<" + Main.tick + "> Delivery of " + Main.deliverySize + " Animals Arrived");
        for (Map.Entry<String, Integer> entry : animalCount.entrySet()) {
            System.out.println("<" + Main.tick + "> Enclosure stock " + entry.getValue() + " " + entry.getKey());
        }
    };

    @Override
    public void run(){
        try {
            while (Main.tick.get() < Main.MAX_TICKS) {
                Main.waitTicks(Main.deliveryTime);
                generateDelivery();
                 
            }
            
        } catch (Exception e) {
            Thread.currentThread().interrupt();
            return;
        }

    }
}

class Farm{
    Semaphore farmLock = new Semaphore(1);
    List<FarmField> farmFields = new ArrayList<FarmField>();

    // Initialize fields
    public Farm(FarmField chickenField, FarmField pigField, FarmField llamaField, FarmField sheepField, FarmField cowField) {
        farmFields.add(chickenField);
        farmFields.add(pigField);
        farmFields.add(llamaField);
        farmFields.add(sheepField);
        farmFields.add(cowField);
    }
    
}

class Farmer implements Runnable{
    int farmerId;
    Map<String, Integer> animals = new HashMap<String, Integer>();
    String farmerType = "";
    int fieldId;
    Enclosure enclosure;
    Farm farm;
    int farmerLimit;
    int breakTime;
    int ticksSinceBreak;
    static AtomicInteger farmersOnBreak = new AtomicInteger(0);
    int breakLimit = Main.farmersOnBreak;

    
    // Farmers takes a break waiting 150 ticks
    void takeBreak(){
        try {
            System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> Farmer: " + farmerId + " is taking a break.");
            Main.waitTicks(150);
        } catch (Exception e) {
            Thread.currentThread().interrupt();
            return;
        } finally {
            //Once farmer finishes break it enables the next farmer to go on break
            farmersOnBreak.decrementAndGet();
        }
        
    }

    public Farmer(int id, Enclosure enclosure, String farmerType, int fieldId, Farm farm, int farmerLimit) {
        this.farmerId = id;
        this.enclosure = enclosure;
        this.farmerType = farmerType;
        this.fieldId = fieldId;
        this.farm = farm;
        this.farmerLimit = farmerLimit;
        //Randomly between 200-300 ticks
        this.breakTime = ThreadLocalRandom.current().nextInt(200, 301);
        this.ticksSinceBreak = Main.tick.get();
        //Give the farmer 0 animals at the start
        animals.put(farmerType, 0);
    }

    @Override
    public void run(){
        try {
            while (Main.tick.get() < Main.MAX_TICKS) {
                //If the current tick - ticks since last break exceeds or equals the scheduled break time give them a break
                if ((Main.tick.get() - ticksSinceBreak >= breakTime) && farmersOnBreak.get() <= breakLimit)  {
                    if (farmersOnBreak.incrementAndGet() <= breakLimit) {  
                        takeBreak();
                    } else {
                        farmersOnBreak.decrementAndGet();
                    }
                    ticksSinceBreak = Main.tick.get();
                    breakTime = ThreadLocalRandom.current().nextInt(200, 301);
                }
                //Take a delivery
                enclosure.takeFromEnclosure(this);
                
                //If the farmer has animals deliver them
                int deliveryAnimals = animals.get(farmerType);
                if (deliveryAnimals > 0 ) {
                    //Add Stock to the field
                    farm.farmFields.get(fieldId).AddStock(this);
      
                }
                
            }

        } catch (Exception e) {
            Thread.currentThread().interrupt();
            return;
        }
    }
    
}

class Buyer implements Runnable{
        int buyerID;
        Farm farm;
        Boolean waiting = false;
        int waitingOn;
        Random rm = new Random();
        String[] animals = {"chicken", "pig", "llama", "sheep", "cow"};
    
        public Buyer(int id, Farm farm) {
            this.buyerID = id;
            this.farm = farm;
        }
    
        public void buy(){
            //If the waiting flag is set try to buy the same animal type
            if (waiting) {
                farm.farmFields.get(waitingOn).BuyStock(this);
                
            }
            int animalType = rm.nextInt(5);
            //Set a variable which saves the animal the buyer tried to buy last, it is used to buy the same one if he is waiting
            if (!waiting) {
                waitingOn = animalType;
            }
            
            //Buy an animal
            farm.farmFields.get(animalType).BuyStock(this);
        }

        @Override
        public void run(){
            try {
                //Buy every 10 ticks
                while (Main.tick.get() < 1000) {
                    buy();
                    Main.waitTicks(10);
                }
                
        } catch (Exception e) {
            Thread.currentThread().interrupt();
            return;
        }
    }
    
}

class FarmField {
    Random rn = new Random();
    public String type;
    public Integer stock = 5;
    public int fieldLimit;

    public FarmField(String type, int fieldLimit){
        this.type = type;
        this.fieldLimit = fieldLimit;

    }

    public synchronized void AddStock(Farmer farmer) {
        
        int currentStock = this.stock;
        int amount = farmer.animals.get(type);
        
        //Check the current stock and the amount is greater than the field limit
        if (currentStock + amount > fieldLimit) {
            int animalsToStock = amount - ((currentStock + amount) - fieldLimit);
            
            System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> Farmer: " + farmer.farmerId + " puts " + animalsToStock +  " into " + type + " field");

            Main.waitTicks(animalsToStock);
            farmer.animals.put(type, (amount - animalsToStock));
            this.stock = currentStock + animalsToStock;
            
            //Since the farmer didnt empty all of his stock he will wait at the field until its empty again.
            try {
                notify();
                System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> Farmer waiting at field " + type);
                wait();
            } catch (Exception e) {
                Thread.currentThread().interrupt();
                return;
            }
        }
        //Check the current stock and the amount is equal than the field limit
        if (currentStock + amount == fieldLimit) {
            System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> Farmer: " + farmer.farmerId + " puts " + amount +  " into " + type);

            Main.waitTicks(fieldLimit);
            farmer.animals.put(type, 0);
            this.stock = currentStock + amount;
            notify();
            Main.waitTicks(10);
            
        }
        //Check the current stock and the amount is less than the field limit
        if (currentStock + amount < fieldLimit) {
            this.stock = currentStock + amount;
            farmer.animals.put(type, 0);
            System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> Farmer: " + farmer.farmerId + " puts " + amount +  " into " + type);
            notify();
            Main.waitTicks(10);
            
        }
        //Otherwise set the farmer farmers animal count to 0 which sends him back to the enclosure, the "walking" to other the enclosure
        //is implemented in the stocking functions above.
        else{
            if (farmer.animals.put(type, 0) == 0) {
                notify();
            }
        }
             
    }

    // Buyer buys from field if field stock isnt empty
    public synchronized void BuyStock(Buyer buyer) {
        int currentStock = this.stock;
        if (currentStock > 0) {
            
            this.stock = currentStock - 1;
            System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> buyer " + buyer.buyerID + " buys " + type);
            //Sets waiting to false if the buyer bought the animal he was waiting on
            buyer.waiting = false;
            notify();
            
        }
        else{
            try {
                System.out.println("<" + Main.tick + "> <THREAD: " + Thread.currentThread().getId() + "> No more " + this.type + " Buyer " + buyer.buyerID + " waiting");
                //If the animal isnt in stock the buyer waits for it to be in stock
                buyer.waiting = true;
                wait();
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
        }
    }

}

