
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;
import java.util.Queue;
import java.util.Map;

class Item {
    final String name;
    final double price;

    Item(String name, double price){
        this.name = name;
        this.price = price;
    }
}

class Basket {
    private final Stack<Item> basket;

    Basket() {
       this.basket = new Stack<>();
    }

    public void addItem(Item item) {
        this.basket.push(item);
    }

    public Item removeItem() {
        return this.basket.pop();
    }

    public boolean checkBasket() {
        return this.basket.empty();
    }

    public String toString() {
        return "basket:" + this.basket.toString();
    }
}

class Checkout {
    private final Queue<Item> checkout;

    Checkout(Basket basket) {
        this.checkout = new LinkedList<>();
        while (basket.checkBasket() == false) {
            addItem(basket.removeItem());
        }
        // TODO - create the queue, add items from basket by using addItem()
    }

    public void addItem(Item item) {
        this.checkout.add(item);
    }

    public Item removeItem() {
        return this.checkout.remove();
    }

    public Item checkCheckout(){
        return this.checkout.peek();
    }

    public String toString() {
        return "checkout:" + this.checkout.toString();
    }
}

class Bill {
    private final Map<String,Integer> basket;
    private double price;

    Bill(Checkout checkout) {
        this.basket = new LinkedHashMap<>();
        this.price = 0;
        while (checkout.checkCheckout() != null) {
            Item item = checkout.removeItem();
            this.price += (double)item.price;
            billItem(item);
        }
        // TODO - initialise Map, set price, bill items from checkout
        
    }

    public void billItem(Item item) {
        if (this.basket.containsKey(item.name)) {
            int amount = this.basket.get(item.name);
            this.basket.replace(item.name, (amount + 1));
        }
        else{
            this.basket.put(item.name, 1);
        }
        // TODO - put item in map, keep count of same items being billed
        // Note that the Map is from String to Integer
        // Items have names as Strings and count of items is an integer
    }

    public double getTotal() {
        return this.price;
    }

    public String toString() {
        String output = "";
        for(String item: this.basket.keySet()) {
            output += item + " (" + this.basket.get(item) + "nos)\n";
        }
        return output + "total: " + this.price;
    }
}

public class ShopInventory2{
    public static void main(String[] args) {
        Basket basket = new Basket();
        loadBasket(basket);
        //System.out.println(basket); // for DEBUG
        Checkout checkout = new Checkout(basket);
        //System.out.println(checkout); // for DEBUG
        Bill bill = new Bill(checkout);
        System.out.println(bill);
    }

    static void loadBasket(Basket basket) {
        basket.addItem(new Item("Twinings Earl Grey Tea", 4.50));
        basket.addItem(new Item("Folans Orange Marmalade", 4.00));
        basket.addItem(new Item("Free-range Eggs", 3.35));
        basket.addItem(new Item("Brennan's Bread", 2.15));
        basket.addItem(new Item("Ferrero Rocher", 7.00));
        basket.addItem(new Item("Ferrero Rocher", 7.00));
    }
}