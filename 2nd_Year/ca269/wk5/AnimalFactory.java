import java.util.function.IntFunction;

interface SafetyRegulation{
    int getMaxItemsPermitted();
}

abstract class Item implements SafetyRegulation{
    final int max_permitted = 0;
}

class Duck extends Item{
    final int max_permitted = 5;

    public int getMaxItemsPermitted(){
        return this.max_permitted;

    }
}

class Swan extends Item{
    final int max_permitted = 2;

    public int getMaxItemsPermitted(){
        return this.max_permitted;

    }
}

class Flamingo extends Item{
    final int max_permitted = 3;

    public int getMaxItemsPermitted(){
        return this.max_permitted;

    }
}

class Dog extends Item{
    final int max_permitted = 20;

    public int getMaxItemsPermitted(){
        return this.max_permitted;

    }
}

class Cat extends Item{
    final int max_permitted = 20;

    public int getMaxItemsPermitted(){
        return this.max_permitted;

    }
}


public class AnimalFactory<T extends Item>{
    int counter = 0;
    public T continueProduction(T t){
        int amount = t.getMaxItemsPermitted();
        if (counter < amount) {
            counter ++;
            return t;
        }
        return null;

    }
    public int getCount(){
        return counter;
    }

    public static void main(String[] args) {
        AnimalFactory<Duck> AF_D = new AnimalFactory<>();
        while(AF_D.continueProduction(new Duck()) != null);
        System.out.println("Total Ducks produced: " + AF_D.getCount());
    
        AnimalFactory<Swan> AF_S = new AnimalFactory<>();
        while(AF_S.continueProduction(new Swan()) != null);
        System.out.println("Total Swans produced: " + AF_S.getCount());
    
        AnimalFactory<Flamingo> AF_F = new AnimalFactory<>();
        while(AF_F.continueProduction(new Flamingo()) != null);
        System.out.println("Total Flamingos produced: " + AF_F.getCount());
    
        AnimalFactory<Dog> AF_G = new AnimalFactory<>();
        while(AF_G.continueProduction(new Dog()) != null);
        System.out.println("Total Dogs produced: " + AF_G.getCount());
    
        AnimalFactory<Cat> AF_C = new AnimalFactory<>();
        while(AF_C.continueProduction(new Cat()) != null);
        System.out.println("Total Cats produced: " + AF_C.getCount());
    }

// which produces the output
// Total Ducks produced: 5
// Total Swans produced: 2
// Total Flamingos produced: 3
// Total Dogs produced: 20
// Total Cats produced: 20
}
