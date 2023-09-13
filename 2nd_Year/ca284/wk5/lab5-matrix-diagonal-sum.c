#include <stdio.h>
#include <stdlib.h>



int matrix_diagonal(int *matrix, int *lenght);


int main(int argc, char *argv[])
{
	int lenght;
	lenght = atoi(argv[1]);

	int matrix[lenght][lenght];

	int counter = 2;

	for (int i = 0; i < lenght; ++i)
		{
			for (int j = 0; j < lenght; ++j)
			{
				matrix[i * (*lenght) +j] = atoi(argv[counter]);
				counter++;
			}	
		}

	printf("%d\n", matrix_diagonal(*matrix, &lenght));

	return 0;
}

int matrix_diagonal(int *matrix, int *lenght)
{	
	int sum_of = 0;

	for (int i = 0; i < *lenght; ++i)
	{
		sum_of += matrix[i * (*lenght) + i];
	}
	return sum_of;
}