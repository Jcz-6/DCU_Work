#include <stdio.h>
#include <stdlib.h>
#include <string.h>


typedef struct Country Country;

struct Country
{
	char Country[100];
	char Capital[100];
	float Population;
	int Country_Size;
};


int main(int argc, char*argv[])
{
	Country country_1;

	strcpy(country_1.Country, argv[1]);
	strcpy(country_1.Capital, argv[2]);
	country_1.Population = atof(argv[3]);
	country_1.Country_Size = atoi(argv[4]);

	printf("%s\n", country_1.Country);
	printf("%s\n", country_1.Capital);
	printf("%.2f million people\n", country_1.Population);
	printf("%d km2\n", country_1.Country_Size);
	return 0;
}