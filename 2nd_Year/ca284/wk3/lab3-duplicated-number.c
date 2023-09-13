#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{	
	int total = 0;
	int lenght = argc - 1;
	int nums[50];
	for (int i = 0; i < lenght; ++i)
	{
		nums[i] = atoi(argv[i + 1]);
	}


	for (int i = 0; i < lenght; ++i)
	{
		for (int j = 0; j < lenght; ++j)
		{	
			if (nums[i] == nums[j])
			{
				total += 1;
			}
		}
	if (total > 1)
	{
		printf("%d\n", nums[i]);
		break;
	}
	total = 0;
	}
	if (total == 0)
	{
		printf("no duplicated number\n");
	}
	return 0;
}