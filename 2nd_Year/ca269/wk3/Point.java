
public class Point implements Comparable{ 
    private double x, y;

    public Point(double newX, double newY) {
        x = newX;
        y = newY;
    }

    public String toString() {
        return "(" + x + ", " + y + ")";
    }

    public double getX(){
        return this.x;
    }

    public double getY(){
        return this.y;
    }


    public boolean lessThan(Order other){

        Point next = (Point)other;

        if (next.x < this.x | equals(next)){
            return false;
        }
        return true;
    }

    public boolean equals(Point other){
        
        //Point next = (Point)other;

        if(this.x == other.x & this.y == other.y){
            return true;
        }
        return false;
    }

    public int compareTo(Object other){

        Point next = (Point)other;

        if (equals(next)) {
            return 0;
        }
        else if (lessThan(next)){
            return -1;
        }

        return 1;
    }


    public static void main(String[] args) {

        Comparable P1 = new Point(0, 0);
        Comparable P2 = new Point(1, 1);
        Comparable P3 = new Point(0, 1);
        
        System.out.println("P1 less than P2: " + P1.compareTo(P2)); // -1
        System.out.println("P1 less than P3: " + P1.compareTo(P3)); // -1
        System.out.println("P2 less than P3: " + P2.compareTo(P3)); // 1
        System.out.println("P3 less than P3: " + P3.compareTo(P3)); // 0
    }
    
}

/*interface Order {
    public boolean lessThan(Order other);
}

interface Comparable extends Order{
    public int compareTo(Object other);
}
*/