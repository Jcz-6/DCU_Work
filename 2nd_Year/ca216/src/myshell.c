
/*
Jakub Czerniejewski
ID: 21466494
I acknowledge DCU's academic plagerism integrity policy
*/


#include "utility.h"                            //my header file
#define MAX_BUFFER 1024                        // max line buffer
#define MAX_ARGS 64                            // max # args
#define SEPARATORS " \t\n"                     // token separators


int main (int argc, char ** argv)
{   
    char buf[MAX_BUFFER];                      // line buffer
    char * args[MAX_ARGS];                     // pointers to arg strings
    char ** arg;                               // working pointer thru args
    char prompt[400];           // shell prompt

    getcwd(prompt, 400);
    strcat(prompt,"  DN:===> ");

    char shell_env[400];
    setenv("SHELL", getcwd(shell_env, 400), 1); 
    /*Set the SHELL env variable to the current working directory
        at the start*/


    /*This if statement checks if there is a second comand line arg
        when running this shell program (batchfile)*/
    if (argc == 2)
    {
        int in;
        if ((in = open("batchfile", O_RDONLY)) < 0) {   // open file for reading
            fprintf(stderr, "error opening file\n");
            }
            dup2(in, STDIN_FILENO);         // duplicate stdin to input file
            close(in);                // close after use
            strcpy(prompt, ""); // get rid of promt fomr the output
        
                
    }

    /* keep reading input until "quit" command or eof of redirected input */

    while (!feof(stdin)) { 
        /* get command line from input */
        if (argc < 2)
        {
            fputs (prompt, stdout); // write prompt

        }
        

        if (fgets (buf, MAX_BUFFER, stdin )) { // read a line
            /* tokenize the input into args array */
            arg = args;
            *arg++ = strtok(buf,SEPARATORS);   // tokenise input

            int lenght = 1;
            while ((*arg++ = strtok(NULL,SEPARATORS))){   // last entry will be NULL
                /*Here im keeping count of comand line strings so I can pass it 
                to my checker function, this lenght is later used when cheking for
                I/O redirection*/
                lenght++;
            }

            if (args[0]) {
                int dn = checker(args, lenght, argc, prompt);
                /*Checker function is being called to check for built in commands
                   it will fork it with redirection in place otherwise */
                if (dn == -1) // if -1 is returned quit has been called
                {
                    break;
                }                
                continue;

                
            }
        }
    }
    return 0; 
}


