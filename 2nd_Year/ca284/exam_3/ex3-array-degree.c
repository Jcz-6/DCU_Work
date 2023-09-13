//Jakub Czerniejewski 30/11/2022 Exam 3 Question 4
//This programe find the degree of an array using linked lists.



#include <stdio.h>
#include <stdlib.h>

typedef struct Singly_list Singly_list;

struct Singly_list {
	int number;
	Singly_list *next;
};

//Here I declare my function prototypes
Singly_list* make_list(int *amount_of_numbers, char *argv[]);
int find_degree(Singly_list *start, int *amount_of_numbers);


int main(int argc, char  *argv[])
{
	Singly_list *start = NULL;
	int amount_of_numbers = argc - 1;

	start = make_list(&amount_of_numbers, argv);
	int deegre = find_degree(start, &amount_of_numbers);
	printf("%d\n", deegre);

	return 0;
}

//This function creates a singly linked list with comand line arguements and the amount of numbers
//as the input and outputs a pointer to the start of the list.
Singly_list* make_list(int *amount_of_numbers, char *argv[])
{	
	Singly_list *current, *first;

	first = calloc(1,sizeof(Singly_list));

	current = first;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		current->number = atoi(argv[i + 1]);
		current->next = calloc(1,sizeof(Singly_list));
		current = current->next;
	}
	current->next = NULL;
	return first;
}


//This functions takes in a singly linked list as input and outputs the degree of the linked list.
int find_degree(Singly_list *start, int *amount_of_numbers)
{
	Singly_list* p = NULL;
	Singly_list* j = NULL;

	int degree = 0;
	int tmp = 0;
	int current_number = 0;

	for (p = start; p != NULL; p = p->next)
	{
		//printf("%d\n", current_number);
		for (j = start; j != NULL; j = j->next)
		{	
			if (p->number == j->number)
				{
					tmp += 1;
				}	
		}
		if (tmp > degree)
		{
			degree = tmp;
		}
		tmp = 0;
	}
	return degree;
}