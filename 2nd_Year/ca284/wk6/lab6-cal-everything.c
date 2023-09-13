#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>



double sum(float,float);
double product(float,float);
double difference(float,float);
double division(float,float);
double any_operation(double(*pfunction)(float, float), float x, float y);



int main(int argc, char *argv[])
{
	float number_1 = atof(argv[1]);
	float number_2 = atof(argv[2]);

	printf("%.2f\n", any_operation(sum, number_1, number_2));
	printf("%.2f\n", any_operation(difference, number_1, number_2));	
	printf("%.2f\n", any_operation(product, number_1, number_2));
	printf("%.2f\n", any_operation(division, number_1, number_2));
	printf("%.2f\n", pow(number_1, number_2));	
	printf("%.2f\n", (log(number_1) + log(number_2)));


	return 0;
}

double any_operation(double(*pfunction)(float, float), float x, float y)
{
	return pfunction(x, y);
}

double sum(float x, float y)
{
	return x + y;
}

double product(float x, float y)
{
	return x * y;
}

double difference(float x, float y)
{
	return x - y;
}

double division(float x, float y)
{
	return x / y;
}



