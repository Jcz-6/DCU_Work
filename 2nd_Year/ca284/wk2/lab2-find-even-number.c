#include<stdio.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	int lenght = 10;
	int numbers[lenght];
	int sum = 0;

	for(unsigned int i = 0; i < (argc - 1); ++i)
	{
		if(atoi(argv[i + 1]) % 2 == 0)
		{
			numbers[i] = atoi(argv[i + 1]);
			printf("%d - %d\n", i, atoi(argv[i + 1]));
			sum += 1;
		}
	}
	if(sum == 0)
	{
		printf("Not found!\n");
	}
	return 0;
}