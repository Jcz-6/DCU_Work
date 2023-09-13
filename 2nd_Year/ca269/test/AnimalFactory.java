import java.util.*;

interface SafetyRegulation{
   int getMaxItemsPermitted();
}

abstract class Items implements SafetyRegulation{
        
 }

class Duck extends Items{
    final int max = 5;
    public int getMaxItemsPermitted(){
        return this.max;
    }
  }
class Swan extends Items{
    final int max = 2;
    public int getMaxItemsPermitted(){
        return this.max;
    }
 }
class Flamingo extends Items{
    final int max = 3;
    public int getMaxItemsPermitted(){
        return this.max;
    }
  }
class Dog extends Items{
    final int max = 20;
    public int getMaxItemsPermitted(){
        return this.max;
    }
  }
 
class Cat extends Items{
    final int max = 20;
    public int getMaxItemsPermitted(){
        return this.max;
    }
  }


public class AnimalFactory <T extends Items> {
    int unitsProduced = 0;

    public T continueProduction(T t){
        if (unitsProduced < t.getMaxItemsPermitted()) {
            unitsProduced += 1;
            return t;
        }
        return null;
    }

    public int getCount(){
        return unitsProduced;
    }

    public static void main(String[] args) {
         // main() for testing:
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
        
       // which produces the output
       // Total Ducks produced: 5
       // Total Swans produced: 2
       // Total Flamingos produced: 3
       // Total Dogs produced: 20
       // Total Cats produced: 20
    }
}