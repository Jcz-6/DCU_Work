//Jakub Czerniejewski 13/12/2022 Exam 4 Question 5

//This programe uses a doubly linked list and dynamic memory allocation to remove
//duplicate numbers from a doubly linked list statically.


#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	int number;
	Double_list *next;
	Double_list *prev;

};

//Here are my function prototypes.
Double_list* make_list(int *amount_of_numbers, char *argv[]);
void print_numbers(Double_list *start, int *amount_of_numbers);
void remove_duplicates(Double_list *start, int *amount_of_numbers);

int main(int argc, char  *argv[])
{
	Double_list *first = NULL;
	int amount_of_numbers = argc - 1;

	first = make_list(&amount_of_numbers, argv);
	remove_duplicates(first, &amount_of_numbers);
	print_numbers(first, &amount_of_numbers);

	free(first);
	first = NULL;

	return 0;
}

//This function creates a doubly linked list that stores numbers.
Double_list* make_list(int *amount_of_numbers, char *argv[])
{	
	Double_list *current, *first, *prev;

	first = calloc(1,sizeof(Double_list));

	if(!first)
	{
		printf("Mem alocation failed.\n");
		free(first);
		first = NULL;
		exit(0);
	}

	current = first;
	current->prev = NULL;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		prev = current;
		current->next = calloc(1,sizeof(Double_list));
		if(!current->next)
		{
			printf("Mem alocation failed.\n");
			free(current->next);
			current->next = NULL;
			exit(0);
		}
		current->number = atoi(argv[i + 1]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; //this returns the first one;
}

//This function removes duplicate numbers from the doubly linked list.
void remove_duplicates(Double_list *start, int *amount_of_numbers)
{
	Double_list* p = NULL;
	Double_list* tmp = NULL;

	int duplicate = 0;


	for(p = start; p->next != NULL; p = p->next)
	{
		if (p->next->number == p->number)
		{
			duplicate = p->number;
			//printf("%d\n", duplicate);
		}
		while(p->number == duplicate)
 		{

			if (p->prev == NULL)
			{
				tmp = p->next; 
				free(p);
				p = tmp;
			}
			else
			{
				p->prev->next = p->next;
				p->next->prev = p->prev;
				tmp = p->prev;
				free(p);
				p = tmp;
			}
		}
	}
	//printf("%d\n", duplicate);
	if (p->number == duplicate)
	{
		p = p->prev;
		p ->next = NULL;
	}
	
}

//This function prints out the doubly linked list.
void print_numbers(Double_list *first, int *amount_of_numbers)
{	
	Double_list* p = NULL;

	for (p = first; p != NULL; p = p->next)
	{	
		if (p->number == 0)
		{
			p = p->next;
			printf("%d\n", p->number);
		}
		else
		{
			printf("%d\n", p->number);
		}
	}	
}