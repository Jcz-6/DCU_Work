//Jakub Czerniejewski 13/12/2022 Exam 4 Question 4

//This program uses a singly linked list and dynamic memory allocation to find the longest or
//shortest based on a comand line input.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct Singly_list Singly_list;

struct Singly_list {
	char sentence[200];
	int amount_of_chars;
	Singly_list *next;
};

//Here are my function prototypes.
Singly_list* make_list(int *amount_of_numbers, char *p_paragraph);




int main(int argc, char*argv[])
{
	int length_1 = strlen(argv[1]);
	int length_2 = strlen(argv[2]);

	char *p_paragraph = calloc(length_1, sizeof(char));
	if(!p_paragraph)
	{
		printf("Mem alocation failed.\n");
		free(p_paragraph);
		p_paragraph = NULL;
		exit(0);
	}

	char *p_operation = calloc(length_2, sizeof(char));

	if(p_operation)
	{
		printf("Mem alocation failed.\n");
		free(p_operation);
		p_operation = NULL;
		exit(0);
	}
	
	strcpy(p_paragraph, argv[1]);
	strcpy(p_operation, argv[2]);

	make_list(&length_1, p_paragraph);

	printf("%s\n", p_operation);

	free(p_paragraph);
	p_paragraph = NULL;

	free(p_operation);
	p_operation = NULL;

	return 0;
}

//This function takes in a input of a array with a paragraph and the amount of characters in it
//it appends the characters to singly linked list until it meet a ? or a .

Singly_list* make_list(int *amount_of_numbers, char *p_paragraph)
{	
	Singly_list *current, *first;

	first = calloc(1,sizeof(Singly_list));

	if(!first)
	{
		printf("Mem alocation failed.\n");
		free(first);
		first = NULL;
		exit(0);
	}

	current = first;

	for (int i = 0; i < *amount_of_numbers; ++i)
	{

		current->sentence[i] = *(p_paragraph + i);
		current->amount_of_chars += 1;

		//printf("%d\n", i);

		if (*(p_paragraph + i) == 46 || *(p_paragraph + i) == 63)
		{	
			//printf("%s\n", current->sentence);
			//printf("%d\n", current->amount_of_chars);
			current->next = calloc(1,sizeof(Singly_list));
			if(!current->next)
			{
				printf("Mem alocation failed.\n");
				free(current->next);
				current->next = NULL;
				exit(0);
			}
			current = current->next;
		}
	}
	current->next = NULL;
	return first;
}