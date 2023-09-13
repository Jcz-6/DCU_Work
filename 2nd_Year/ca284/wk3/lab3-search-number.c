#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{	
	int total = 0;
	int amount = 0;
	int lenght = argc - 2;
	int nums[50];
	int number = atoi(argv[1]);
	for (int i = 0; i < lenght; ++i)
	{
		if (atoi(argv[i + 2]) == number)
		{	
			nums[amount] = total;
			amount += 1;

		}
		total += 1;
	}

	if (amount > 0)
	{
		for (int i = 0; i < amount; ++i)
		{
			printf("Found %d at %d\n", number, nums[i]);
		}
	}
	else{
		printf("%d not found.\n", number);
	}

	return 0;
}