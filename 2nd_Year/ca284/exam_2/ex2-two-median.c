//Jakub Czerniejewski
// 03/11/2022
// A question from the 2nd lab exam.


//I will use functions and pointers in this programs.
//to make an array using a for loop and command line arguements
//then sort it using two for loops
//pick out the two median values by getting the lenght of the array
//dividing it by two and subtracting 1 to get the first median value and to get second
//one I will do the same but without the subraction  




#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void make_array(char *argv[], int *numbers, int *lenght);
void sort_array(int *numbers, int *lenght);
void print_median(int *numbers, int *lenght);


int main(int argc, char *argv[])
{	
	int lenght = argc - 1; //lenght of the array
	int numbers[lenght];// max number of integer elements
	
	make_array(argv, numbers, &lenght);
	sort_array(numbers, &lenght);
	print_median(numbers, &lenght);

	return 0;
}

void make_array(char *argv[], int *numbers, int *lenght)
{
	for (int i = 0; i < *lenght; ++i)
	{
		*(numbers + i) = atoi(argv[i + 1]); //making the integer array
	}	
}

void sort_array(int *numbers, int *lenght)
{
	int tmp;

	for (int i = 0; i < *lenght; ++i)
	{
		for (int j = 0; j < *lenght; ++j)
		{	
			if (numbers[i] < numbers[j])
			{
				tmp = numbers[i]; //storing one of the values in a tmp variable
				numbers[i] = numbers[j];
				numbers[j] = tmp;
			}
		}
	}
}

void print_median(int *numbers, int *lenght)
{	
	printf("%d\n", numbers[((*lenght) / 2) - 1]);
	printf("%d\n", numbers[(*lenght) / 2]);
}