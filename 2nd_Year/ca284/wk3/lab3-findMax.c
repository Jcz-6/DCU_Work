#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int findmax(int nums[], int lenght);

int main(int argc, char *argv[])
{
	int lenght = argc - 1;
	int nums[lenght];
	for (int i = 0; i < lenght; ++i)
	{
		nums[i] = atoi(argv[i + 1]);
	}
	printf("%d\n", findmax(nums, lenght));
	return 0;
}

int findmax(int nums[], int lenght)
{
	int max = 0;
	for (int i = 0; i < lenght; ++i)
	{
		if (nums[i] > max)
		{
			max = nums[i];
		}
	}
	return max;
}