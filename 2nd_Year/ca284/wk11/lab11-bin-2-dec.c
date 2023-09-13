#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// you can use is digit



void bin_to_dec(int *number, int *lenght, int *dec_number);
void bin_array(int *number, int *lenght, char* argv[]);


int main(int argc, char*argv[])
{
	int dec_number = 0;
	int lenght = argc - 1;
	int number[lenght];

	bin_array(number, &lenght, argv);
	bin_to_dec(number, &lenght, &dec_number);

	printf("%d\n", dec_number);
	return 0;
}

void bin_array(int *number, int *lenght, char* argv[])
{
	char tmp[1];
	int is_1;
	int is_0;

	for (int i = 0; i < *lenght; ++i)
	{	
		strcpy(tmp, argv[i + 1]);
		//printf("%s\n", tmp);
		is_1 = strcmp(tmp, "1");
		is_0 = strcmp(tmp, "0");
		//printf("%s\n", tmp);

		//printf("%d\n", is_0);
		//printf("%d\n", is_1);
		if (is_1 > 1 || is_0 > 1)
		{
			printf("Only digits 1 and 0 are permitted.\n");
			exit(0);
		}
		number[i] = atoi(tmp);
	}
}

void bin_to_dec(int *number, int *lenght, int *dec_number)
{
	int tmp = 1;

	if (*lenght > 8)
	{
		printf("Too many binary digits entered.\n");
		exit(0);
	}

	for (int i = 0; i < *lenght - 1; ++i)
	{
		tmp *= 2;
	}


	for (int i = 0; i < *lenght; ++i)
	{
		*dec_number += number[i] * tmp;
		tmp /= 2;
	}	
}