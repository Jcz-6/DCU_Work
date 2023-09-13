#include<stdio.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	char* days_of_week[] = {"Sunday", "Monday", "Tuesday", "Wednesday",
							"Thursday", "Friday", "Saturday"};
	printf("%s\n", days_of_week[atoi(argv[1]) - 1]);				
	return 0;
}