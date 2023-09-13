#include<stdio.h>
#include<stdlib.h>

#define PI 3.1415

int main(int argc, char *argv[])
{
	int height, radius;
	float area;
	if (argc < 2){
		printf("No input given!\n");
	}
	else if(argc < 3){
		printf("Two arguments needed!\n");
	}

	radius = atoi(argv[1]);
	height = atoi(argv[2]);
	if(radius < 0 || height < 0){
		printf("The radius or height cannot be negative!\n");
	}
	else{
		area = (2 * PI * radius) * (radius + height);
		printf("%.2f\n", area);
	}
	return 0;
}