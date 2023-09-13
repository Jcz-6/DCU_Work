
import java.util.Scanner;

public class VowelAge 
{
	public static void main(String[] args)
	{
		Scanner input = new Scanner(System.in);

		String name = input.nextLine();
		String name_changed = name.toLowerCase();

		int age = input.nextInt();

		//System.out.println(name_changed);
		//System.out.println(age);

		char[] name_arr = name_changed.toCharArray();

		int amount_of_vowels = 0;

		for (int i = 0; i<name_arr.length; ++i) 
		{
			char ch = name_changed.charAt(i);

			switch(ch)
			{
				case 'a':
				case 'e':
				case 'i':
				case 'o':
				case 'u':
					amount_of_vowels += 1;
			}
		}

		if (age >= 18) 
		{
			System.out.println("Hello " + name + ", you have " + amount_of_vowels + " vowels, and you are an adult");
		}
		else
		{
			System.out.println("Hello " + name + ", you have " + amount_of_vowels + " vowels, and you are a minor");
		}
	} 


}