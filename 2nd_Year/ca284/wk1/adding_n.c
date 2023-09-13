#include <stdio.h>

int main(int argc, char const *argv[])
{
	int a = 15000;
	int b = 15000;
	int sum;
	a = a + 2000;
	b = b + 2000;
	sum = a + b;
	printf("Sum of two values is: %d.\n", sum);

	return 0;
}