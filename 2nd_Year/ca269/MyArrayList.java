interface MyList<E> {
    void add(E e);
    void add(E e, int pos);
    E remove();
    E remove(int pos);
    void clear();
    int size();
    int contains(E e);
}

public class MyArrayList<E> implements MyList<E> {
    private E[] array = (E[])new Object[100]; // DANGEROUS!
    private int size = 0;

    public void add(E e) {
        this.array[size] = e;
        size += 1;
    }

    public String toString() {
        String output = "[";
        for(int i=0; i<size; i++) {
            output += array[i] + ",";
        }
        return output + "]";
    }

    public void add(E e, int pos){
        size += 1;
        System.out.println(e);
        for (int i = 0; i < pos; i++) {
            System.out.println(size - i);
            this.array[size - i - 1] = this.array[size - i - 2];
            //System.out.println(this.array[size - ]);
            if (size - i - 2 == pos) {
                this.array[pos] = e;
            }
        }
    }

    public E remove(){
        E item = this.array[size];
        size -=1;
        return item;
    }

    public E remove(int pos){
        E item = this.array[pos];
        for (int i = 0; i < size - 1; i++) {
            if (i >= pos) {
                this.array[i] = this.array[i + 1];
            }
        }
        size -= 1;
        return item;
    }

    public void clear(){
        size = 0;
        array = (E[])new Object[100];
    }

    public int size(){
        return this.size;
    }

    public int contains(E e){
        for (int i = 0; i < size; i++) {
            if (this.array[i] == e) {
                return i;
            }
        }
        return -1;
    }


    // TODO: add
    // TODO: remove from end
    // TODO: remove at position
    // TODO: clear
    // TODO: size
    // TODO: contains
    public static void main(String[] args) {
        MyArrayList<Integer> numList = new MyArrayList<>();
        for(int i=0; i<=9; i++) { numList.add(i); }
        System.out.println(numList);
        // output: [0,1,2,3,4,5,6,7,8,9,]
         // add 0 at position 5
        System.out.println(numList.contains(5));
        // output: [0,1,2,3,4,5,5,6,7,8,9,]
    }
}