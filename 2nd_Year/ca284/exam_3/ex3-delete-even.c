//Jakub Czerniejewski 30/11/2022 Exam 3 Question 4

//This program creates a doubly linked list of numbers and removes the even ones from it.
#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	int number;
	Double_list *next;
	Double_list *prev;

};

//Here I declare my function prototypes.
Double_list* make_list(int *amount_of_numbers, char *argv[]);
void print_odd_numbers_and_total(Double_list *start, int *amount_of_numbers);
Double_list* delete_even(Double_list *first, int *amount_of_numbers);



int main(int argc, char  *argv[])
{
	Double_list *first = NULL;
	int amount_of_numbers = argc - 1;

	first = make_list(&amount_of_numbers, argv);
	//print_numbers(first, &amount_of_numbers);
	Double_list *new_list = NULL;
	new_list = delete_even(first, &amount_of_numbers);
	print_odd_numbers_and_total(new_list, &amount_of_numbers);

	return 0;
}

//This function outputs a doubly linked list and takes in command line arguements and the amount
//of numbers as the input.
Double_list* make_list(int *amount_of_numbers, char *argv[])
{	
	Double_list *current, *first, *prev;

	first = calloc(1,sizeof(Double_list));

	current = first;
	current->prev = NULL;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		prev = current;
		current->next = calloc(1,sizeof(Double_list));
		current->number = atoi(argv[i + 1]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; 
}

//This function takes in a doubly linked list as input and outputs the same list
//but with all the even numbers deleted.
Double_list* delete_even(Double_list *first, int *amount_of_numbers)
{
	Double_list* current = first;
	Double_list* tmp = NULL;
	Double_list* head = NULL;
	current = first;
	int new_lenght = 0;

	while(first->number % 2 == 0)
	{
		tmp = first->next;
		free(first);
		first = tmp;
	}

	for (current = first; current != NULL; current->next)
	{
		if (current->number % 2 == 0)
		{
			current->prev->next = current->next;
			current->next->prev = current->prev;
			tmp = current->next;
			free(current);
			current = tmp;
			//current = current->next;
		}
		else
		{
		new_lenght += 1;
		current = current->next;
		}
	}
	*amount_of_numbers = new_lenght;
	return first;
}


//This function prints out the linked list.
void print_odd_numbers_and_total(Double_list *first, int *amount_of_numbers)
{	
	Double_list* p = NULL;
	int total = 0;

	for (p = first; p != NULL; p = p->next)
	{
		printf("%d\n", p->number);
		total += p->number;
	}
	printf("%d\n", total);
}