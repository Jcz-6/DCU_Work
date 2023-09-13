#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	float number;
	Double_list *next;
	Double_list *prev;

};

Double_list* make_list(int *amount_of_numbers, char *argv[]);
void print_numbers(Double_list *start, int *amount_of_numbers);


int main(int argc, char  *argv[])
{
	Double_list *last = NULL;
	int amount_of_numbers = argc - 2;

	last = make_list(&amount_of_numbers, argv);
	print_numbers(last, &amount_of_numbers);

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
		current->number = atof(argv[i + 2]);

		current = current->next;
		current->prev = prev;
	}
	current->next = NULL;
	return current; //this returns the last one;
}

void print_numbers(Double_list *last, int *amount_of_numbers)
{	
	Double_list* p = NULL;

	for (p = last->prev; p != NULL; p = p->prev)
	{
		printf("%.2f\n", p->number);
	}	
}