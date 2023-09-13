#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	int number;
	Double_list *next;
	Double_list *prev;

};

Double_list* make_list(int *amount_of_numbers, int *numbers);
void pop(int *amount_of_numbers, Double_list *start);
void push(int *amount_of_numbers, Double_list *start, int *push);
void print_numbers(Double_list *start, int *amount_of_numbers);
void enqueue(Double_list *start, int *amount_of_numbers, int *search, int *put_in);


int main(int argc, char  *argv[])
{
	Double_list *start = NULL;
	int amount_of_numbers = 10;
	int numbers[] = {8, 7, 3, 4, 5, 6, 9, 2, 14, 12};

	int search = atoi(argv[1]);
	int put_in = atoi(argv[2]);

	//int push_1 = atoi(argv[argc - 2]);
	//int push_2 = atoi(argv[argc - 1]);

	start = make_list(&amount_of_numbers, numbers);
	if (search == 12)
	{
		push(&amount_of_numbers, start, &put_in);
	}
	else
	{
		enqueue(start, &amount_of_numbers, &search, &put_in);
	}	

	//pop(&amount_of_numbers, start);
	//pop(&amount_of_numbers, start);

	//push(&amount_of_numbers, start, &push_1);
	//push(&amount_of_numbers, start, &push_2);

	print_numbers(start, &amount_of_numbers);

	return 0;
}

Double_list* make_list(int *amount_of_numbers, int *numbers)
{	
	Double_list *current, *first, *prev;

	first = calloc(1,sizeof(Double_list));

	current = first;
	current->prev = NULL;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		prev = current;
		current->next = calloc(1,sizeof(Double_list));
		current->number = numbers[i];

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

void enqueue(Double_list *start, int *amount_of_numbers, int *search, int *put_in)
{
	Double_list* current = NULL;
	Double_list* new = calloc(1,sizeof(Double_list));
	Double_list* tmp = NULL;
	current = start;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{	
		if (current->number == *search)
		{	
			tmp = current->next;

			new->prev = current;
			new->number = *put_in;
			new->next = tmp;
			tmp->prev = new;
			current->next = new;
			//printf("%d\n", tmp->number);


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