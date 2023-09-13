//Jakub Czerniejewski 13/12/2022 Exam 4 Question 2

//This program uses structures and dynamic memory allocation to create a product
//calculates the average sales and it changes the status of prodcuts if its sales are
//above average, it also changes the country code into the country name


#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Product Product;


struct Product
{
	char item_code[20];
	int number_sold;
	float price;
	int status;
	Product *next;
	Product *prev;
};

//Here are my function prototypes.
Product* make_products(int *amount_of_products, char*argv[]);
void print_products(int *amount_of_products, Product *products);
void get_average(Product *products, float *avg, int *amount_of_products);
void upadate_status(Product *products, float *avg);

int main(int argc, char*argv[])
{
	int amount_of_products = (argc - 1) / 3;

	Product* products = make_products(&amount_of_products, argv);

	float avg = 0;
	get_average(products, &avg, &amount_of_products);
	//printf("%.2f\n", avg);

	upadate_status(products, &avg);

	print_products(&amount_of_products, products);

	free(products);
	products = NULL;

	return 0;
}

//This fucntion makes the products.
Product* make_products(int *amount_of_products, char*argv[])
{	
	Product *current, *first, *prev;
	
	int index = 1;

	first = calloc(1,sizeof(Product));

	if(!first)
	{
		printf("Mem alocation failed.\n");
		free(first);
		first = NULL;
		exit(0);
	}

	current = first;
	current->prev = NULL;

	for (int i = 0; i < *amount_of_products; ++i)
	{	
		prev = current;
		current->next = calloc(1,sizeof(Product));

		if(!current->next)
		{
			printf("Mem alocation failed.\n");
			free(current->next);
			current->next = NULL;
			exit(0);
		}

		strcpy(current->item_code, argv[index++]);
 		current->number_sold = atoi(argv[index++]);
 		current->price = atof(argv[index++]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; //this returns the last one;
}

//This function calculates the sales average.
void get_average(Product *products, float *avg, int *amount_of_products)
{
	Product* p = NULL;

	for (p = products; p != NULL; p = p->next)
	{
		*avg += p->price * p->number_sold;
	}
	*avg = *avg / *amount_of_products;	
}

//This function updates the status to 1 if the sales of the product are greater than the average sales
//otherwise its set to 0.
void upadate_status(Product *products, float *avg)
{
	Product* p = NULL;

	for (p = products; p != NULL; p = p->next)
	{	
		if ((p->price * p->number_sold) >= *avg)
		{
			p->status = 1;
		}
	}	
}

//This function prints out the product status and the country name.
void print_products(int *amount_of_products, Product *products)
{
	Product* p = NULL;

	for (p = products; p != NULL; p = p->next)
	{
		printf("%d\n", p->status);
		if (p->item_code[0] == 73)
		{
			printf("Ireland\n");
		}
		if (p->item_code[0] == 70)
		{
			printf("France\n");
		}
		if (p->item_code[0] == 83)
		{
			printf("Spain\n");
		}
		if (p->item_code[0] == 85)
		{
			printf("USA\n");
		}
		if (p->item_code[0] == 82)
		{
			printf("Russia\n");
		}						
	}	
	
}