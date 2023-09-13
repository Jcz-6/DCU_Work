#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>


void find_word(char *string, char *word, int *lenght_string, int *lenght_word);


int main(int argc, char *argv[])
{
	char string[100];
	char word[100];
	int lenght_word, lenght_string;

	strcpy(string, argv[1]);
	strcpy(word, argv[2]);

	lenght_string = strlen(string);
	lenght_word = strlen(word);

	find_word(&string[0], &word[0], &lenght_string, &lenght_word);

	return 0;
}


void find_word(char *string, char *word, int *lenght_string, int *lenght_word)
{
	int start = 0;
	int end = 0;

	for (int i = 0; i < *lenght_string; ++i)
	{
		if (string[i] == word[0])
		{
			start = i;
			end = i;
			for (int j = start; j < (start + *lenght_word); ++j)
			{
				if (string[j] == word[j - start])
				{
					end ++;
				}
			}
		if (end - start == *lenght_word)
		{
			printf("%d %d\n", start, (end - 1));
		}
		start = 0;
		end = 0;
		}
	}
}
