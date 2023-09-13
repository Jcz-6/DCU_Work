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


void make_a_country(char *country_name, char *country_capital, float *country_population, int *country_size, int *i, Country *country);
void update_average(float *pop_avg, int *amount_of_countries, Country *country);


int main(int argc, char*argv[]) 
{
 	int amount_of_countries = (argc - 1) / 4;
 	int index = 1;
 	int size = 0;

 	char name[100];
 	char capital[100];

 	float pop = 0;
 	float pop_avg = 0;
 	//float *ppop_avg = &pop_avg;
	
	Country country[50];
 	
 	for (int i = 0; i < amount_of_countries; ++i)
 	{	
 		strcpy(name, argv[index++]);
 		strcpy(capital, argv[index++]);
 		pop = atof(argv[index++]);
  		size = atoi(argv[index++]);
 		make_a_country(name, capital, &pop, &size, &i, &country[i]);
 		update_average(&pop_avg, &amount_of_countries, &country[i]);
 	}
 	//printf("Population average: %.2f\n", pop_avg / amount_of_countries);

	return 0;
}

void make_a_country(char *country_name, char *country_capital, float *country_population, int *country_size, int *i, Country *country)
{	
	if (*i == 0)
	{
		printf("Country\t\t\tCapital\t\t\tSize\t\t\tPopulation\n");
	}
	strcpy(country->Country, country_name);
	strcpy(country->Capital, country_capital);
	country->Population = *country_population;
	country->Country_Size = *country_size;
	if (country->Country_Size < 100000)
	{
		printf("%s\t\t\t%s\t\t\t%d\t\t\t%.2f\n", country->Country, country->Capital, country->Country_Size, country->Population);
	}
	
}

void update_average(float *pop_avg, int *amount_of_countries, Country *country)
{	
	*pop_avg += country->Population;
}


// another way is to pass it argv and the array of the country class Jed has it !!