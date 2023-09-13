#include <stdio.h>
#include <stdlib.h>
#include <string.h>



typedef struct Sentence Sentence;

struct Sentence
{
	char word[30];
};


void max_lenght(Sentence *sentences, int *amount_of_sentences, int *m_lenght);
void make_sentence(char *argv[], Sentence *sentences, int *amount_of_sentences);
void print_longest_sentences(Sentence *sentences, int *amount_of_sentences, int *m_lenght);


int main(int argc, char *argv[])
{
	int amount_of_sentences = argc - 1;
	int m_lenght = 0;
	Sentence *sentences = calloc(amount_of_sentences, sizeof(Sentence));

	if(!sentences)
	{
		printf("Unfortunately memory reallocation failed.\n");
		free(sentences);
		sentences = NULL;
		return 0;
	}

	make_sentence(argv, sentences, &amount_of_sentences);
	max_lenght(sentences, &amount_of_sentences, &m_lenght);
	print_longest_sentences(sentences, &amount_of_sentences, &m_lenght);

	free(sentences);
	sentences = NULL;

	return 0;
}

void make_sentence(char *argv[], Sentence *sentences, int *amount_of_sentences)
{
	for (int i = 0; i < *amount_of_sentences; ++i)
	{
		strcpy((sentences+i)->word, argv[i + 1]);
	}
}

void max_lenght(Sentence *sentences, int *amount_of_sentences, int *m_lenght)
{
	for (int i = 0; i < *amount_of_sentences; ++i)
	{
		if (strlen((sentences + i)->word) > *m_lenght)
		{
			*m_lenght = strlen((sentences + i)->word);
		}
	}
}

void print_longest_sentences(Sentence *sentences, int *amount_of_sentences, int *m_lenght)
{
	for (int i = 0; i < *amount_of_sentences; ++i)
	{
		if (strlen((sentences + i)->word) == *m_lenght)
		{
			printf("%s\n", (sentences + i)->word);
		}
	}
}