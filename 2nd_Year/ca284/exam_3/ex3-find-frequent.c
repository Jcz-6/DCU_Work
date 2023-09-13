//Jakub Czerniejewski 30/11/2022 Exam 3 Question 4

//This programe uses dynamic memory allocation and arrays to find the most frequent
//elements of an array and outputs them in order

#include <stdlib.h>
#include <stdio.h>


//Here I declare my function prototypes.
void read_integers(char *argv[], int *numbers, int lenght);
void find_frequent(int *numbers, int lenght, int *p_frequent_numbers, int *new_lenght);
void sort_array(int *numbers, int lenght);
void print_frequent_numbers(int *p_numbers, int lenght);

int main(int argc, char*argv[])
{
	int *p_numbers = (int*)calloc(5, sizeof(int));
	if(!p_numbers)
	{
		printf("Mem alocation failed.\n");
		free(p_numbers);
		p_numbers = NULL;
		exit(0);
	}

	int lenght = (argc - 1);
	read_integers(argv, p_numbers, lenght);
	sort_array(p_numbers, lenght);

	int *p_frequent_numbers = (int*)calloc(1, sizeof(int));
	if(!p_numbers)
	{
		printf("Mem alocation failed.\n");
		free(p_frequent_numbers);
		p_frequent_numbers = NULL;
		exit(0);
	}

	int new_lenght = 0; 

	find_frequent(p_numbers, lenght, p_frequent_numbers, &new_lenght);

	free(p_numbers);
	p_numbers = NULL;

	print_frequent_numbers(p_frequent_numbers, new_lenght);


	free(p_frequent_numbers);
	p_frequent_numbers = NULL;


	return 0;
}


//This function takes in command line arguements and the amount of numbers as input
//and outputs an array of them.
void read_integers(char*argv[], int *numbers, int lenght)
{
	int size = 5;
	int count = 0;

	for (int i = 0; i < lenght; ++i)
	{
		if (count >= 5)
		{	
			int *p_tmp = NULL;
			size += 1;
			p_tmp = realloc(numbers, size*sizeof(int));

			if(!p_tmp)
			{
				printf("Mem alocation failed.\n");
				free(numbers);
				numbers = NULL;
				exit(0);
			}
			numbers = p_tmp;
		}
		count += 1;
		*(numbers + i) = atoi(argv[i + 1]);

	}
}

//This function takes in an array and uses bubble sort to sort in.
void sort_array(int *numbers, int lenght)
{	
	int tmp = 0;

	for (int i = 0; i < lenght; ++i)
	{
		for (int j = 0; j < lenght; ++j)
		{	
			if (*(numbers + i) < (*(numbers + j)))
			{
				tmp = *(numbers + i);
				*(numbers + i) = *(numbers + j);
				*(numbers + j) = tmp;
			}
		}
	}
}

//This function takes in a sorted array as input and outputs an array with only the most frequent numbers in it.
void find_frequent(int *numbers, int lenght, int *p_frequent_numbers, int *new_lenght)
{

	int tmp_number = 0;
	int count_of_tmp_number = 0;
	int index = 0;
	int size = 1;
	int diff = 0;

	for (int i = 0; i < lenght;)
	{	
		//printf("%d\n", i);
		tmp_number = *(numbers + i);
		//printf("%d\n", tmp_number);
		for (int j = 0; j < lenght; ++j)
		{
			if (*(numbers + j) == tmp_number)
			{
				count_of_tmp_number += 1;
			}
		}
		if (count_of_tmp_number > 3)
		{
			for (int k = *new_lenght; k < *new_lenght + count_of_tmp_number; ++k)
			{	
				//printf("%d\n", k);
				int *p_tmp = NULL;
				size += count_of_tmp_number;
				p_tmp = realloc(p_frequent_numbers, size*sizeof(int));

				if(!p_tmp)
				{
					printf("Mem alocation failed.\n");
					free(p_frequent_numbers);
					p_frequent_numbers = NULL;
					exit(0);
				}
				p_frequent_numbers = p_tmp;
				p_tmp = NULL;
				*(p_frequent_numbers + k) = tmp_number;
				//printf("%d\n", *(p_frequent_numbers + k));
			}
			i += count_of_tmp_number;
			*new_lenght += count_of_tmp_number;

		}
		else
		{
			i += 1;
		}
		count_of_tmp_number = 0;
	}
}


//This function takes in a array and prints it.
void print_frequent_numbers(int *p_numbers, int lenght)
{
	for (int i = 0; i < lenght; ++i)
	{
		printf("%d\n", *(p_numbers + i));
	}
}