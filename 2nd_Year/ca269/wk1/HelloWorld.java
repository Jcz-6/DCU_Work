// HelloWorld.java
// Make sure the name of the file is the SAME as the name of the public Class

// To compile, javac HelloWorld.java
// To execute, java HelloWorld
// Example operation:
// Name: Jane Doe
// Hello, World! Jane Doe is now a Java programmer!

// like Python and C, 'import' is used to invoke other code
// this can be present in existing libraries (typically prefixed as java.*)
// or can be another code written by you or shared from someone else
import java.util.Scanner;

// This is the 'object' you are creating, representing a HelloWorld task
public class HelloWorld {

    // this method is the 'main entry point' when HelloWorld is executed directly
    // public: this method is 'publicly visible' i.e. any other code can see and access it
    // static: this method is associated directly with the class HelloWorld
    //         and does not need instances of the class to be called
    // void: this method returns nothing, i.e. the return type if 'void'
    // String[]: Java is a typed language, i.e. each variable requires a type
    //           In this, we want arguments passed when calling main
    //           So we use `[]` which is the syntax to express an array
    // args: the conventional variable names for invoking commands where
    //       args means 'arguments'
    public static void main(String[] args) {

        // To take input, we use the imported tool called Scanner
        // Scanner provide a easy and convenient way to collect inputs
        // Create a new 'object' for where you want to take inputs from
        // For inputs from the command line, use System.in
        Scanner input = new Scanner(System.in);

        // To take inputs, call the scanner object with appropriate methods
        // These can be associated with inputs for integers, characters, lines
        // The variable storing the input needs to have the correct 'type'
        // A name is a 'String' type i.e. a fixed stream of characters

        // For visual cues, a message is printed to ask for input
        // To print something, Java I/O is provided through the 'System' library
        // System.out provides several output functions
        // print takes a string and prints it without a new line
        System.out.print("Name: ");
        String name = input.nextLine();
        System.out.print("Hello, World! ");
        // Mixing strings to print the name and message has several methods
        // String concatenation is the one used here
        // Also, println takes a string and prints it on a new line
        System.out.println(name + " is now a Java programmer!");

        // If the return type of the method would not have been void,
        // but instead int, you would be returning a number here
  }

}