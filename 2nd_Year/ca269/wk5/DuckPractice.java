class Duck{}

class DuckSingleton{
    private Duck duck;
    DuckSingleton(Duck duck){
        this.duck = duck;
    }
    public Duck getItem(){
        return this.duck;
    }
}


public class DuckPractice {
    public static void main(String[] args) {
        DuckSingleton D = new DuckSingleton(new Duck());
        Duck d1 = D.getItem();
        Duck d2 = D.getItem();
        System.out.println(d1==d2);
    }
}
