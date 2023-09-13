#include <stdio.h>
#include <stdlib.h>

int main(int argc, char*argv[])
{
	float inch, conversion;
	float cm;

	conversion = 2.54;
	cm = atof(argv[1]);
	inch = cm / conversion;
	printf("%.2f\n", inch);

	return 0;
}


