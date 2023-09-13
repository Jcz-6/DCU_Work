#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	int number;
	Double_list *next;
	Double_list *prev;

};

Double_list* make_list(int *amount_of_numbers, char *argv[]);
void pop(int *amount_of_numbers, Double_list *start);
void push(int *amount_of_numbers, Double_list *start, int *push);
void print_numbers(Double_list *start, int *amount_of_numbers);


int main(int argc, char  *argv[])
{
	Double_list *start = NULL;
	int amount_of_numbers = argc - 4;

	int push_1 = atoi(argv[argc - 2]);
	int push_2 = atoi(argv[argc - 1]);

	start = make_list(&amount_of_numbers, argv);

	pop(&amount_of_numbers, start);
	pop(&amount_of_numbers, start);

	push(&amount_of_numbers, start, &push_1);
	push(&amount_of_numbers, start, &push_2);

	print_numbers(start, &amount_of_numbers);

	return 0;
}

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
		current->number = atoi(argv[i + 2]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; //this returns the last one;
}

void pop(int *amount_of_numbers, Double_list *start)
{	
	Double_list* current = NULL;
	current = start;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		if (current->next == NULL)
		{
			current->prev->next = current->next;
		}
		current = current->next;
	}
	*amount_of_numbers = *amount_of_numbers - 1;
}

void push(int *amount_of_numbers, Double_list *start, int *push)
{	
	Double_list* current = NULL;
	Double_list* prev = NULL;
	current = start;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		if (current->next == NULL)
		{	
			prev = current;
			current->next = calloc(1,sizeof(Double_list));
			current = current->next;
			current->number = *push;
			current->prev = prev;
		}
		current = current->next;
	}
	*amount_of_numbers = *amount_of_numbers + 1;
}


void print_numbers(Double_list *start, int *amount_of_numbers)
{
	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		printf("%d\n", start->number);
		start = start->next;
	}	
}