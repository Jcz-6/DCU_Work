#include <stdio.h>
#include <stdlib.h>

void make_array(char *argv[], int *numbers, int *amount_of_numbers);
void largest_twice(int *numbers, int *amount_of_numbers);


int main(int argc, char *argv[])
{
	int amount_of_numbers = argc - 1;
	int *pnumbers = calloc(amount_of_numbers, sizeof(int));

	make_array(argv, pnumbers, &amount_of_numbers);
	largest_twice(pnumbers, &amount_of_numbers);


	return 0;
}


void make_array(char *argv[], int *numbers, int *amount_of_numbers)
{
	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		numbers[i] = atoi(argv[i + 1]);
	}
}


void largest_twice(int *numbers, int *amount_of_numbers)
{
	int max = 0;

	for (int i = 1; i < *amount_of_numbers; ++i)
	{
		if (numbers[i] > max)
		{
			max = numbers[i];
		}
	}

	int i = 0;
	while(numbers[i] * 2 != max && i != *amount_of_numbers)
	{
		++i;
	}

	if (i < *amount_of_numbers)
	{
		printf("%d\n", max);
	}
	else
	{
		printf("0\n");
	}
}