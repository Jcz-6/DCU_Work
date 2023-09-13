//Jakub Czerniejewski 30/11/2022 Exam 3 Question 3

//This program uses a linked list to store product take and update the product
//price if the country_name attribute is "Ireland".

#include <stdio.h>
#include <stdlib.h>
#include<string.h>

typedef struct Product Product;


struct Product
{
	char product_code[30];
	char country_name[30];
	int price;
	Product *next;
	Product *prev;
};


// Here I declare my function prototypes.
void print_products(int *amount_of_products, Product *products);
Product* make_products(int *amount_of_products, char*argv[]);
void update_products(int *amount_of_products, Product *products);

int main(int argc, char *argv[])
{
	int amount_of_products = (argc - 1) / 3;

	Product* products = make_products(&amount_of_products, argv);
	update_products(&amount_of_products, products);
	print_products(&amount_of_products, products);
	return 0; 
}

//This function takes in command line arguements and the amount of products
//and puts the date acordingly in the structure for the linked list.
//Each product has 3 attributes.
Product* make_products(int *amount_of_products, char*argv[])
{	
	Product *current, *first, *prev;
	
	int index = 1;

	first = calloc(1,sizeof(Product));

	current = first;
	current->prev = NULL;

	for (int i = 0; i < *amount_of_products; ++i)
	{	
		prev = current;
		current->next = calloc(1,sizeof(Product));
		strcpy(current->product_code, argv[index++]);
 		strcpy(current->country_name, argv[index++]);
 		current->price = atoi(argv[index++]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; //this returns the last one;
}


//This Function takes in a linked list of products and updates the price of all
//products that have a country_name Ireland.
void update_products(int *amount_of_products, Product *products)
{
	Product* p = NULL;
	int add_on = 0;

	for (p = products; p != NULL; p = p->next)
	{
		if (strcmp(p->country_name, "Ireland") == 0)
		{
			add_on = p->price / 5;
			p->price += add_on;
		}

	}	
}

//This Function prints out all the products with their corresponding attributes.
void print_products(int *amount_of_products, Product *products)
{
	Product* p = NULL;

	for (p = products; p != NULL; p = p->next)
	{

		printf("%s\n", p->product_code);
		printf("%s\n", p->country_name);
		printf("%d\n", p->price);

	}	
	
}