#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[])

{	
	int i;
	int j = 0;
	int lenght = strlen(argv[1]);
	char inputString[50];
	char outputString[50];
	strcpy(inputString, argv[1]);
	for(i = lenght - 1; i >= 0; --i)
	{
		outputString[j] = inputString[i];
		j++;
	}
	printf("%s\n", outputString);
	return 0;
}
