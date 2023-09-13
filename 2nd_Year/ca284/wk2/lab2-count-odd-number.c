#include<stdio.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	int lenght, amount, sum;
	lenght = 10;
	int grades[lenght];
	amount = argc - 1;
	sum = 0;

	for(unsigned int i = 0; i < amount; ++i)
	{
		if(atoi(argv[i + 1]) % 2 == 1)
		{
			grades[i] = atoi(argv[i + 1]);
			sum += 1;

		}
	}
	printf("%d\n", sum);
	return 0;
}