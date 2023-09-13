#include <stdio.h>
#include <stdlib.h>


void make_array(char*argv[], float *numbers, int *amount_of_numbers);
void find_second_largest(float *numbers, int *amount_of_numbers);


int main(int argc, char*argv[])
{
	int amount_of_numbers = argc - 1;
	float *pnumbers = calloc(amount_of_numbers, sizeof(float));

	if(!pnumbers)
	{
		printf("Unfortunately memory reallocation failed.\n");
		free(pnumbers);
		pnumbers = NULL;
		return 0;
	}

	make_array(argv, pnumbers, &amount_of_numbers);
	find_second_largest(pnumbers, &amount_of_numbers);

	free(pnumbers);
	pnumbers = NULL;

	return 0;
}



void make_array(char*argv[], float *numbers, int *amount_of_numbers)
{
	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		numbers[i] = atof(argv[i + 1]);
	}
}

void find_second_largest(float *numbers, int *amount_of_numbers)
{
	float max = 0;
	float before_max = 0;
	float tmp = 0;

	for (int i = 1; i < *amount_of_numbers; ++i)
	{
		if (numbers[i] > max)
		{
			max = numbers[i];
		}
	}

	for (int i = 0; i < *amount_of_numbers; ++i)
	{
		if (numbers[i] > before_max && numbers[i] < max)
		{
			before_max = numbers[i];
		}
	}
	printf("%.1f\n", before_max);
}