#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int count_l(char *string, int *lenght, char *letter);

int main(int argc, char*argv[])
{
	char word[100];
	char letter[2];
	int lenght = 0;


	strcpy(word, argv[2]);
	strcpy(letter, argv[1]);
	lenght = strlen(word);


	int *plenght = &lenght;


	printf("%d\n", count_l(word, plenght, letter));
	return 0;
}


int count_l(char *string, int *lenght, char *letter)
{
	int count = 0;
	//printf("%s\n", letter);
	//printf("%s\n", string);
	//printf("%d\n", *lenght);

	for (int i = 0; i < *lenght; ++i)
	{
		if (*letter == string[i])
		{
			count++;
		}
	}
	return count;
}