#include <stdio.h>
#include <stdlib.h>




void make_array(int argc, char*argv[], int *numbers, int *vector_size);
void dot_product(int *numbers, int *vector_size);



int main(int argc, char *argv[])
{
	int vector_size = atoi(argv[1]);
	int *p_numbers = calloc((vector_size * 2), sizeof(int));

	if(!p_numbers)
	{
		printf("Unfortunately memory reallocation failed.\n");
		free(p_numbers);
		p_numbers = NULL;
		return 0;
	}


	make_array(argc, argv, p_numbers, &vector_size);
	dot_product(p_numbers, &vector_size);

	free(p_numbers);
	p_numbers = NULL;

	return 0;
}

void make_array(int argc, char*argv[], int *numbers, int *vector_size)
{
	for (int i = 0; i < (*vector_size * 2); ++i)
	{
		numbers[i] = atoi(argv[i + 2]);
	}
}

void dot_product(int *numbers, int *vector_size)
{
	int total = 0;

	for (int i = 0; i < *vector_size; ++i)
	{
		total += numbers[i] * numbers[i + *vector_size];
	}

	printf("%d\n", total);
}