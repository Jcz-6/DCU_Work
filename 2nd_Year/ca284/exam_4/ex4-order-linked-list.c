//Jakub Czerniejewski 13/12/2022 Exam 4 Question 3

//This program uses a doubly linked list and dynamic memory allocation to store a floating point number,
//then it checks if the numbers are in the list in an descending over
//if they are the output is 1 otherwise the output is 0.




#include <stdio.h>
#include <stdlib.h>

typedef struct Double_list Double_list;

struct Double_list {
	float number;
	Double_list *next;
	Double_list *prev;

};

//here are my function prototypes.
Double_list* make_list(int *amount_of_numbers, char *argv[]);
int check_if_desending(Double_list *start, int *amount_of_numbers);


int main(int argc, char  *argv[])
{
	Double_list *first = NULL;
	int amount_of_numbers = argc - 1;

	first = make_list(&amount_of_numbers, argv);

	int check = check_if_desending(first, &amount_of_numbers);
	printf("%d\n", check);

	free(first);
	first = NULL;

	return 0;
}

//this function creates a doubly linked list and takes in input from the command line.
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
		current->number = atof(argv[i + 1]);

		current = current->next;
		current->prev = prev;
	}
	current->prev->next = NULL;
	return first; //this returns the first one;
}

//this function checks a doubly linked list if the numbers are in descending order
//it returns 1 if they are, and 0 otherwise.
int check_if_desending(Double_list *start, int *amount_of_numbers)
{
	Double_list* p = start;

	while(p->next != NULL)
	{

		if (p->next->number > p->number)
		{
			return 0;
		}
		p = p->next;
	}
	return 1;
}
