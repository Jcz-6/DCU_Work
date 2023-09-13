#include <stdio.h>
#include <stdlib.h>
#include<string.h>


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
void sort_countries(int *amount_of_countries, Country *country);
void print_countries(int *amount_of_countries, Country *country);

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
	Country *pcountry = country;
 	
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
 	//printf("Country\t\t\tCapital\t\t\tSize\t\t\tPopulation\n");
 	
 	sort_countries(&amount_of_countries, country);
 	print_countries(&amount_of_countries, country);

	return 0;
}

void make_a_country(char *country_name, char *country_capital, float *country_population, int *country_size, int *i, Country *country)
{	
	strcpy(country->Country, country_name);
	strcpy(country->Capital, country_capital);
	country->Population = *country_population;
	country->Country_Size = *country_size;
	{
	//	printf("%s\t\t\t%s\t\t\t%d\t\t\t%.2f\n", country->Country, country->Capital, country->Country_Size, country->Population);
	}
	
}

void update_average(float *pop_avg, int *amount_of_countries, Country *country)
{	
	*pop_avg += country->Population;
}

void sort_countries(int *amount_of_countries, Country *country)
{
	Country tmp;
	int i, j;
	for (i = 0; i < *amount_of_countries - 1; ++i)
	{
		for (j = 0; j < (*amount_of_countries - 1 - i); ++j)
		{	
			if (country[j].Population < country[j + 1].Population)
			{
				tmp = country[j];
				country[j] = country[j + 1];
				country[j + 1] = tmp;
			}
		}
	}
}

void print_countries(int *amount_of_countries, Country *country)
{
	printf("Country\t\t\tCapital\t\t\tSize\t\t\tPopulation\n");

	for (int i = 0; i < *amount_of_countries; ++i)
	{
		printf("%s\t\t\t%s\t\t\t%d\t\t\t%.2f\n", country[i].Country, country[i].Capital, country[i].Country_Size, country[i].Population);
	}
}
// another way is to pass it argv and the array of the country class Jed has it !!