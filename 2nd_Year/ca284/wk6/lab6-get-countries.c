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

void make_a_country(char *country_name, char *country_capital, float *country_population, int *country_size, int *i, Country country);


int main(int argc, char*argv[])
{
 	int amount_of_countries = (argc - 1) / 4;
 	int index = 1;
 	char name[100];
 	char capital[100];
 	float pop;
 	int size;
	printf("Country\t\t\tCapital\t\t\tSize\t\t\tPopulation\n");

 	for (int i = 0; i < amount_of_countries; ++i)
 	{	
 		Country country[i];
 		strcpy(name, argv[index]);
 		strcpy(capital, argv[index + 1]);
 		pop = atof(argv[index + 2]);
 		size = atoi(argv[index + 3]);
 		make_a_country(name, capital, &pop, &size, &i, country[i]);
 		index += 4;
 	}
	return 0;
}

void make_a_country(char *country_name, char *country_capital, float *country_population, int *country_size, int *i, Country country)
{	
	strcpy(country.Country, country_name);
	strcpy(country.Capital, country_capital);
	country.Population = *country_population;
	country.Country_Size = *country_size;
	printf("%s\t\t\t%s\t\t\t%d\t\t\t%.2f\n", country.Country, country.Capital, country.Country_Size, country.Population);
}
