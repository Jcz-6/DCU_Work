#include <stdio.h>
#include <stdlib.h>


void matrix_multiply(int *matrix_1, int *matrix_2, int *m1, int *n1, int *m2, int *n2);


int main(int argc, char *argv[])
{
	int m1, n1, m2, n2;
	m1 = atoi(argv[1]);
	n1 = atoi(argv[2]);

	m2 = atoi(argv[3 + (m1 * n1)]);
	n2 = atoi(argv[4 + (m1 * n1)]);


	int matrix_1[m1][n1];
	int matrix_2[m2][n2];

	int counter_1 = 3;
	int counter_2 = 4 + (m1 * n1) + 1;


	for (int i = 0; i < m1; ++i)
		{
			for (int j = 0; j < n1; ++j)
			{
				matrix_1[i][j] = atoi(argv[counter_1]);
				counter_1++;
			}	
		}
	for (int i = 0; i < m2; ++i)
		{
			for (int j = 0; j < n2; ++j)
			{
				matrix_2[i][j] = atoi(argv[counter_2]);
				counter_2++;
			}	
		}



	matrix_multiply(*matrix_1, *matrix_2, &m1, &n1, &m2, &n2);

	return 0;
}


void matrix_multiply(int *matrix_1, int *matrix_2, int *m1, int *n1, int *m2, int *n2)
{
		int new_matrix[*m1][*n2];


	for (int i = 0; i < *m1; ++i)
	{
		for (int j = 0; j < *n2; ++j)
		{
			new_matrix[i][j] = 0;
			for (int k = 0; k < *m2; ++k)
			{	

				new_matrix[i][j] = new_matrix[i][j] + (matrix_1[i * (*n1) + k] * matrix_2[k * (*n2) + j]);
			}
		}
	}	

	for (int i = 0; i < *m1; ++i)
	{
		for (int j = 0; j < *n2; ++j)
		{	
			if (j + 1 == *n2)
			{
				printf("%d\n", new_matrix[i][j]);
			}
			else
			{
				printf("%d ", new_matrix[i][j]);
			}
		}
	}
}

//new_matrix[i * ] = matrix_1[i * (*n1) + j] * matrix_2[j * (*n2) + i];