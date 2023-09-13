#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	int try, conversion, penalty, dropGoal, total, sum;
	
	try = 5 * atoi(argv[1]);
	conversion = 2 * atoi(argv[2]);
	penalty = 3 * atoi(argv[3]);
	dropGoal = 3 * atoi(argv[4]);

	sum = try + conversion + penalty + dropGoal;
	printf("%d\n", sum);

	return 0;
}