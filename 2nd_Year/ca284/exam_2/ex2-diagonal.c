//Jakub Czerniejewski
// 03/11/2022
// A question from the 2nd lab exam.


//This program get the sum of the negative diagonal elements in a matrix
//Firsty I will get the size of the n x n matrix which is the first command line
//arguement
//then I will declare the empty matrix and pass it ot the make_matrix function
//once the matrix is made I pass it to the matrix_diagonal function which will
//print out the total sum


#include <stdio.h>
#include <stdlib.h>



int matrix_diagonal(int *matrix, int *lenght);
void make_matrix(char* argv[], int *matrix, int *lenght);

int main(int argc, char *argv[])
{

	int lenght = atoi(argv[1]); // get the lenght of the n x n matrix
	int matrix[lenght][lenght]; // declare an empty matrix of such size

	make_matrix(argv, *matrix, &lenght);

	printf("%d\n", matrix_diagonal(*matrix, &lenght));

	return 0;
}

int matrix_diagonal(int *matrix, int *lenght)
{	
	int sum_of = 0;
	int var = *lenght - 1;

	for (int i = 0; i < *lenght; ++i)
	{
		//printf("%d\n", matrix[(*lenght)]);
		sum_of += matrix[var];
		var += *lenght - 1;
	}
	return sum_of;
}

void make_matrix(char* argv[], int *matrix, int *lenght)
{
	int counter = 2; 	// make the counter = 2 as this is the index of the first element in the command line
						// arguement.
	for (int i = 0; i < *lenght; ++i)
		{
			for (int j = 0; j < *lenght; ++j)
			{
				matrix[i * (*lenght) +j] = atoi(argv[counter]); // this line assigns the value to the corresponding
				counter++;										// index in the matrix
			}													// i is 0 at the start to 0 * the lenght is 0 and j is 0 at the start so + 0
		}														// is still 0 (0th index in the matrix == first item)
}																// j increases to the max width
																// then i increases to account for j being reset to 0 (1 * lenght(width) + 0)	