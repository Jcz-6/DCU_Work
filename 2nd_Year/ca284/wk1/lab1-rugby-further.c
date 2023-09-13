#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	int try, conversion, penalty, dropGoal, sum;
	
	printf("Enter the amount of Tries, Conversions, Penalties and Dropgoals.\n");
	scanf("%d%d%d%d", &try, &conversion, &penalty, &dropGoal);

	sum = try * 5 + conversion * 2 + penalty * 3 + dropGoal * 3;
	printf("%d\n", sum);

	return 0;
}