#include<stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	/*int lenght = 10;
	int grades[lenght];

	double values[4] = {3.4, 3, 6.4, 4.6};
	int values_2[5] = {1, 2, 3, 4};*/

	int lst_l = atoi(argv[1]);
	int array[lst_l];
	int sum = 0;
	float average = 0;

	for(unsigned int i = 0; i < lst_l; ++i)
	{
		array[i] = atoi(argv[i + 2]); /* +2 cuz the first argv is the lenght */
		sum += array[i];
	}

	average = (float)sum/lst_l;

	for(unsigned int i = 0; i < lst_l; ++i)
	{
		printf("Student %d : %d\n", i + 1, array[i]);
	}

	printf("The average of the %d grades is: %.1f\n", lst_l, average);

	return 0;
}