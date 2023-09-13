#include <stdio.h>
#include <stdlib.h>

typedef struct Singly_list Singly_list;

struct Singly_list {
	int nunber;
	Singly_list *next;
};

Singly_list* make_list(int *amount_of_numbers, char *argv[]);
void print_numbers(Singly_list *start, int *amount_of_numbers);


int main(int argc, char  *argv[])
{
	Singly_list *start = NULL;
	int amount_of_numbers = argc - 2;

	start = make_list(&amount_of_numbers, argv);
	print_numbers(start, &amount_of_numbers);

	return 0;
}

Singly_list* make_list(int *amount_of_numbers, char *argv[])
{	
	Singly_list *current, *first;

	first = calloc(1,sizeof(Singly_list));

	current = first;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		current->nunber = atoi(argv[i + 2]);
		current->next = calloc(1,sizeof(Singly_list));
		current = current->next;
	}
	current->next = NULL;
	return first;
}

void print_numbers(Singly_list *start, int *amount_of_numbers)
{
	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		printf("%d\n", start->nunber);
		start = start->next;
	}	
}
