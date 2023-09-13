import java.util.*;

class PreferLowerValues implements Comparator<Value>{
    public int compare(Value value1, Value value2){
        return Integer.compare(value1.value, value2.value);
    }
}

class PreferHigherValues implements Comparator<Value>{
    public int compare(Value value1, Value value2){
        return Integer.compare(value2.value, value1.value);
    }
}

enum SortingOrder{
    HIGHER, LOWER;
}

class PreferenceComparator implements Comparator<Value>{
    private SortingOrder order;

    PreferenceComparator(SortingOrder order){
        this.order = order;
    }

    public int compare(Value value1, Value value2){
        if (order == SortingOrder.HIGHER) {
            return Integer.compare(value2.value, value1.value);
        }
        return Integer.compare(value1.value, value2.value);
    }
}

class PreferenceComparatorFactory{
    private SortingOrder order;

    PreferenceComparatorFactory(SortingOrder order){
        this.order = order;
    }
    
}

class Value implements Comparable<Value>{
    final int value;
    static private boolean SORT_LOWER;

    Value(int value){
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }

    public String toString(){
        return "" + this.value;
    }

    public static void setSortLower(){
        SORT_LOWER = true;
    }

    public static void setSortHigher(){
        SORT_LOWER = false;
    }

    public static boolean isSortLower(){
        return SORT_LOWER;
    }

    public static boolean isSortHigher(){
        return !SORT_LOWER;
    }

    public int compareTo(Value value){
        if (isSortLower()) {
            return this.value - value.value;
        }
        return value.value - this.value;
    }
}


public class MyFancyDataStructure {
    public static void main(String[] args) {
        List<Value> list = Arrays.asList(
            new Value(2), new Value(3), new Value(1), new Value(6));

        Value.setSortLower();
        Collections.sort(list);
        //System.out.println(list);
   // OUTPUT: [1, 2, 3]
        
        Value.setSortHigher();
        Collections.sort(list);
        //System.out.println(list);
   // OUTPUT: [3, 2, 1]


        list.sort(new PreferLowerValues());
        //System.out.println(list);
        // OUTPUT: [1, 2, 3]

        list.sort(new PreferHigherValues());
        //System.out.println(list);
        // OUTPUT: [3, 2, 1]

        list.sort(new PreferenceComparator(SortingOrder.LOWER));
        System.out.println(list);

        // output = [1, 2, 3]
        list.sort(new PreferenceComparator(SortingOrder.HIGHER));
        System.out.println(list);

        // output = [3, 2, 1]

    }
}
