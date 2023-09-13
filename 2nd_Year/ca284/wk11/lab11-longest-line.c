#include <stdio.h>
#include <stdlib.h>
#include <string.h>



int main(int argc, char const *argv[])
{	
	char sentence[200];
	char current_sentence[200];
	int max_lenght, tmp_lenght = 0;

    FILE *pfile = NULL;
    char *filename = "paragraph.txt";
    pfile = fopen(filename, "r");
    if(!pfile)  // Open myfile.txt to write it
        printf("Failed to open %s.\n", filename);


	while(fgets(current_sentence, 200, pfile) != NULL)
	{
		fgets(current_sentence, 200, pfile);
		tmp_lenght = strlen(current_sentence);
		if (tmp_lenght > max_lenght)
		{
			max_lenght = tmp_lenght;
			strcpy(sentence, current_sentence);
		}
	}

	close(pfile);
	printf("%d\n", max_lenght);
	printf("%s\n", sentence);

	return 0;
}
