#include <stdio.h>
#include <stdlib.h>

int main(int argc, char*argv[])
{
	float inch, conversion;
	float lower = 30;
	float upper = 50;
	conversion = 2.54;


	for (int i = 0; i < 4; ++i)
	{
		for (int j = 0; j < 5; ++j)
		{
			printf("%.2f ", lower / conversion);
			lower ++;
		}
		printf("\n");

	}

	
	

	return 0;
}
