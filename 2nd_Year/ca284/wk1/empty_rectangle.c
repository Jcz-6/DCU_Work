#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	int height, lenght;
	height = atoi(argv[2]);
	lenght = atoi(argv[1]);


	for(int j = 0; j < lenght; ++j)
		printf("*");
	printf("\n");
	for(int i = 0; i < height; ++i)
	{	

		for(int j = 0; j < lenght; ++j)
		{
			if((j == 0) || (j == lenght - 1))
				printf("*");
			else
				printf(" ");
		}	
		printf("\n");
	}
	for(int j = 0; j < lenght; ++j)
		printf("*");
	printf("\n");
	return 0;
}