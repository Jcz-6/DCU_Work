#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{	
	int tmp;
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
			if (nums[i] < nums[j])
			{
				tmp = nums[i];
				nums[i] = nums[j];
				nums[j] = tmp;
			}
		}
	}

	for (int i = 0; i < lenght; ++i)
	{
		printf("%d\n", nums[i]);
	}
	return 0;
}