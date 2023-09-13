#include <stdio.h>
#include <stdlib.h>
#include <string.h>

float multi(float num, float dom);
float divi(float num, float dom);

int main(int argc, char* argv[])
{
	int operation = strlen(argv[1]);
	float num = atof(argv[2]);
	float dom = atof(argv[3]);
	if (dom == 0)
	{
		printf("invalid\n");
	}
	else if (operation == strlen("multiply"))
	{
		printf("%f\n", multi(num, dom));
	}
	else{
		printf("%f\n", divi(num, dom));
	}
	return 0;
}

float multi(float num, float dom)
{
	float outcome = 0;
	outcome = num*dom;
	return outcome;
}

float divi(float num, float dom)
{
	float outcome = 0;
	outcome = num/dom;
	return outcome;
}
