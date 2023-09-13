#include<stdio.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	int width;
	width = atoi(argv[1]);


	for(int j = 0; j < width; ++j)
		printf("*");
	printf("\n");
	for(int i = 0; i < (width - 2); ++i)
	{	

		for(int j = 0; j < width; ++j)
		{
			if((j == 0) || (j == width - 1))
				printf("*");
			else
				printf(" ");
		}	
		printf("\n");
	}
	for(int j = 0; j < width; ++j)
		printf("*");
	printf("\n");
	return 0;
}