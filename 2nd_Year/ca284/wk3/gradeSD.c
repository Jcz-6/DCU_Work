#include<stdio.h>
#include <stdlib.h>

int sumCal(int a[], int lenght); //Function prototype is declared here so main func can run;


int main(int argc, char *argv[])
{

	int lenght = argc - 1;
	int grade[50];

	for (int i = 0; i < lenght; ++i)
	{
		grade[i] = atoi(argv[i + 1]);
	}
	printf("Sum of inputs is: %d\n", sumCal(grade, lenght));
	
	return 0;
}

int sumCal(int a[], int lenght)
{
	int result = 0; //to store the final result of the final array;
	for (int i = 0; i < lenght; ++i)
	{
		result += a[i];
	}
	return result;
}

