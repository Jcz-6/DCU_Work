import java.lang.reflect.*;

interface X{
    void m_X();
}

class A {
    public String f_A;
}

class B extends A { }


class C extends B implements X {
    private String f_C;
    public void m_X() { }
}


public class Reflection {
    

    public static boolean checkField(Class check, String value){
        
        if (check == null) {
            return false;
        }
        try {
            if (check.getField(value) != null) {
                return true;
            }
        } catch (NoSuchFieldException e) {
            System.out.println("No such field " + e.getMessage());
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    public static boolean checkMethod(Class check, String value){
        if (check == null) {
            return false;
        }
        try {
            check.getDeclaredMethod(value);
            return true;
            
        } catch (NoSuchMethodException e) {
            System.out.println("No such method " + e.getMessage());
        }
        return false;
    }

    public static boolean isClass(Class check){
        return ((check instanceof Class) && !check.isInterface());
    }

    public static boolean isInterface(Class check){
        return check.isInterface();
    }

    public String WishYouA(){
        return "Happy St. Patrick's Day!";
    }

    public static boolean hasAncestor(Class check, String value){
        if (check == null) {
            return false;
        }
        Class parent = check.getSuperclass();

        if (parent == null) {
            return false;
        }

        while(!parent.equals(Object.class)){
            if (parent.getName() == value) {
                return true;
            }
            parent = parent.getSuperclass();
        }


        for(Class parentInterface : check.getInterfaces()) {
            if (parentInterface.getName().equals(value)) { 
                return true; 
            }
        }

        return false;
    }




    public static void main(String[] args) {
        System.out.println(Reflection.checkMethod(C.class, "m_Y"));
    }
}