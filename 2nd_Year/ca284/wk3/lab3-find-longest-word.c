#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main(int argc, char* argv[])

{	
	int lenght = argc - 1;
	int start = 0, max = 0;
	int longest = 0;
	char input_string[50];
	strcpy(input_string, argv[1]);

	for (int i = 0; input_string[i] != '\0'; i++) {
        if (input_string[i] == ' ') { /* if a char is a space*/
            start = i + 1; /* start a new word at index i + 1 */
        } 
        else {
            if (i - start > longest) { /* else */
                longest = i - start;   /*if index - starting position of the word*/
                max = start;			/*is > than the longest word, longest is the index - start of the word*/
            }							/*this give us our width for printf*/
        }								/*and max becomes the start of the word i goes around increasing till it hits a space or the loops ends */
    }   
    printf("%.*s\n",
           longest + 1, input_string + max);/* % sepcidies that its a char
           									 .* width of unspecified have to give a integer
           									 s in a string
           									 input_string + max somehow gets the array and starts
           									 printing from max until the max width of chars is reached*/

	return 0;
}
