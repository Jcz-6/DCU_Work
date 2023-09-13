#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>


void count_char(char *string, int *lenght);

int main(int argc, char*argv[])
{
	char word[100];
	int lenght;

	strcpy(word, argv[1]);
	lenght = strlen(word);

	count_char(word, &lenght);

	return 0;
}

void count_char(char *string, int *lenght)
{	
	char ans;
	int max = 0;
	int count = 0;

	for (int i = 0; i < *lenght; ++i)
	{
		for (int j = 0; j < *lenght; ++j)
		{	
			if (string[i] == string[j] && isalpha(string[i]))
			{
				count++;
			}
		}

		if (count > max)
		{
			max = count;
			ans = string[i];
		}
		count = 0;
	}
	printf("%c\n", ans);
}