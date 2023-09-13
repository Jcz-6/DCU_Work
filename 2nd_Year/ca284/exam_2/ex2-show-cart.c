//Jakub Czerniejewski
// 03/11/2022
// A question from the 2nd lab exam.

//In this program I will define a cart structure as shown below,
//the goal of this program is to make a shopping cart with following properties
//using the make a cart function Item, Amount, Price and Promotion Status.
//and then to print them out for each item using the print_cart function


#include <stdio.h>
#include <stdlib.h>
#include<string.h>

typedef struct Cart Cart; //making a new structure called Cart


struct Cart
{
	char Item[20];
	unsigned int Amount;
	float Price;
	unsigned int Promotion;
};


void make_a_cart(int *amount_of_items, char *argv[], Cart *carts);
void print_cart(int *amount_of_items, Cart *carts);


int main(int argc, char *argv[])
{
	Cart carts[100]; // declare a empty cart array called carts
	int amount_of_items = (argc - 1) / 4; // this is the amount of items each item has 4 attributes so its the lenght of (argc - 1) /4

	make_a_cart(&amount_of_items, argv, carts);
	print_cart(&amount_of_items, carts);

	return 0; 
}

void make_a_cart(int *amount_of_items, char *argv[], Cart *carts)
{	

	int index = 1;									// index starts at 1 as the first item is at index one in the command arguements
													// I pass this function a pointer to the array of Cart called carts
													// I update each attribute within it
	for (int i = 0; i < *amount_of_items; ++i)
 	{												// each time I assing a attribute the index increases by one to move onto the next item
 		strcpy(carts[i].Item, argv[index++]);
 		carts[i].Amount = atoi(argv[index++]);
 		carts[i].Price = atof(argv[index++]);
  		carts[i].Promotion = atoi(argv[index++]);
 	}
}

void print_cart(int *amount_of_items, Cart *carts) //prints out the attributes in specified orther
{
	for (int i = 0; i < *amount_of_items; ++i)
	{	
		if (carts[i].Promotion == 1)// checks if there is a promotion on the item and prints a diffrent messesage if there is one and if there isnt one
		{
			printf("%s,%d,%.2f,On Sale\n", carts[i].Item, carts[i].Amount, carts[i].Price);
		}
		else
			printf("%s,%d,%.2f,No Sale\n", carts[i].Item, carts[i].Amount, carts[i].Price);
	}
}