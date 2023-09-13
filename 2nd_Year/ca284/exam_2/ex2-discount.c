//Jakub Czerniejewski
// 03/11/2022
// A question from the 2nd lab exam.


//This program is based on the show cart program
//its goal is to calculate the total price of the items
//depending on their Promotion status using the 
//total_cart function

#include <stdio.h>
#include <stdlib.h>
#include<string.h>

typedef struct Cart Cart;


struct Cart
{
	char Item[20];
	unsigned int Amount;
	float Price;
	unsigned int Promotion;
};


void make_a_cart(int *amount_of_items, char *argv[], Cart *carts);
void print_cart(int *amount_of_items, Cart *carts);
void total_price(int *amount_of_items, Cart *carts);

int main(int argc, char *argv[])
{
	Cart carts[100];
	int amount_of_items = (argc - 1) / 4;
	make_a_cart(&amount_of_items, argv, carts);
	//print_cart(&amount_of_items, carts);
	total_price(&amount_of_items, carts);
	return 0; 
}

void make_a_cart(int *amount_of_items, char *argv[], Cart *carts)
{	

	int index = 1;


	for (int i = 0; i < *amount_of_items; ++i)
 	{	
 		strcpy(carts[i].Item, argv[index++]);
 		carts[i].Amount = atoi(argv[index++]);
 		carts[i].Price = atof(argv[index++]);
  		carts[i].Promotion = atoi(argv[index++]);
 	}
}

void print_cart(int *amount_of_items, Cart *carts)
{
	for (int i = 0; i < *amount_of_items; ++i)
	{	
		if (carts[i].Promotion == 1)
		{
			printf("%s,%d,%.2f,On Sale\n", carts[i].Item, carts[i].Amount, carts[i].Price);
		}
		else
			printf("%s,%d,%.2f,No Sale\n", carts[i].Item, carts[i].Amount, carts[i].Price);
	}
}

void total_price(int *amount_of_items, Cart *carts)
{
	float total = 0;

	for (int i = 0; i < *amount_of_items; ++i)
	{
		if (carts[i].Promotion == 1)
		{
			total += (((carts[i].Amount - (carts[i].Amount) / 3)) - (carts[i].Amount % 3)) * carts[i].Price;
			total += (carts[i].Amount % 3) * carts[i].Price;
		}													//this if statement checks if the item has a promotions on it if it does 
		else
			total += carts[i].Amount * carts[i].Price;		//then total is equal to total + the the amount of items
	}														//								- the amount of items reminder after division of 3
	printf("%.02f\n", total);								//								- hte amount of items modulo 3
}															// 								* the price of the item
															//then the total is updated again by the amount of the items modulo 3 * the price of the item
															//
															//the else statement multiplies the amount of items by the price of the item if there is no promotion