/* 
strtokeg - skeleton shell using strtok to parse command line
usage:
strtokeg
reads in a line of keyboard input at a time, parsing it into
tokens that are separated by white spaces (set by #define SEPARATORS).
can use redirected input if the first token is a recognised internal command, 
then that command is executed. otherwise the tokens are printed on the display.
internal commands:
clear - clears the screen
quit - exits from the program
********************************************************************
version: 1.0
date:    December 2003
author:  Ian G Graham
School of Information Technology
Griffith University, Gold Coast
ian.graham@griffith.edu.au
copyright (c) Ian G Graham, 2003. All rights reserved.
This code can be used for teaching purposes, but no warranty,
explicit or implicit, is provided.
*******************************************************************/

/******************************************************************
 TO DO 
 SPLIT INTO FUNCTIONS
 MANUAL
 MAKEFILE
 HEADER FILE
 LOOK FOR SOURCES
*/
#include <envz.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include "utility.h"
#define MAX_BUFFER 1024                        // max line buffer
#define MAX_ARGS 64                            // max # args
#define SEPARATORS " \t\n"                     // token separators




int main (int argc, char ** argv)
{   

    
    //printf("amount of args %d\n", argc);
    char buf[MAX_BUFFER];                      // line buffer
    char * args[MAX_ARGS];                     // pointers to arg strings
    char ** arg;                               // working pointer thru args
    char prompt[400];           // shell prompt

    getcwd(prompt, 400);
    strcat(prompt,"  DN:===> ");

    if (argc == 2)
    {
        int in;
            //fprintf(stdout, "%s\n", check); // shows input for check
                    // looking for input character
        if ((in = open("batchfile", O_RDONLY)) < 0) {   // open file for reading
            fprintf(stderr, "error opening file\n");
            }
            dup2(in, STDIN_FILENO);         // duplicate stdin to input file
            close(in);                // close after use
            strcpy(prompt, "");                             // end input chech
        
                
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
            while ((*arg++ = strtok(NULL,SEPARATORS))){
                lenght++;
            }
            //int dn = checker(args, lenght);

            // last entry will be NULL
            //printf("amount of arg strings %d\n", lenght);
            if (args[0]) {
                //printf("%d\n", lenght);
                int dn = checker(args, lenght, argc, prompt);                    // if there's anything there
                if (dn == -1) // quit return
                {
                    break;
                }                
                continue;

                /* check for internal/external command
                if (!strcmp(args[0],"cat")) {
                     // "clear" command
                    pid_t pid;
                    int status;
                    
                    //printf("%s \n", args[lenght - 1]);
                    
                    bool check_wait = true;
                    pid = fork();
                    //printf("%d \n", check_wait);


                    if (pid == -1)
                    {
                        fprintf(stderr, "Fork Failed\n");
                    }
                    else if (pid == 0)
                    {
                        
                       /* int file = open("dn.txt", O_WRONLY, O_CREAT, 0777);

                        if (file == -1)
                        {
                            return 2;
                        }

                        dup2(file, STDOUT_FILENO);
                        close(file); 
                        char * check;
                        char *args_clean[lenght];
                        int cleanidx = 0;
                        int in;
                        int out;
                        for (int j = 0; j < lenght; j++) {
                            check = strdup(args[j]);
                            //fprintf(stdout, "%s\n", check); // shows input for check
                            if (!strcmp(check, "<")) {        // looking for input character
                                ++j;
                                check = strdup(args[j]);
                                if ((in = open(check, O_RDONLY)) < 0) {   // open file for reading
                                    fprintf(stderr, "error opening file\n");
                                }
                                dup2(in, STDIN_FILENO);         // duplicate stdin to input file
                                close(in);                      // close after use
                                continue;
                            }                                   // end input chech
                            if (!strcmp(check, ">")) {        // looking for output character
                                ++j;
                                check = strdup(args[j]);
                                out = open(check, O_CREAT | O_RDWR ,0644); // create new output file
                                dup2(out, STDOUT_FILENO);       // redirect stdout to file
                                close(out);                     // close after usere
                                continue;
                            }                                   // end output check
                            if (!strcmp(check, ">>")) {       // looking for append
                                ++j;
                                check = strdup(args[j]);
                                int append = open(check, O_CREAT | O_RDWR | O_APPEND, 0644);
                                dup2(append, STDOUT_FILENO);
                                close(append);
                                continue;
                            }
                            if (!strcmp(check, "&")){
                                break;
                                }


                            
                            args_clean[cleanidx++] = check;
                        }
                        check = NULL;
                        free(check);
                                  // end loop
                        args_clean[cleanidx] = NULL;
                        execvp(args_clean[0], args_clean);                  // execute in child do ./program_name to test programs
                        //fprintf(stderr, "error in child execi \n"); // error
                        

                        //execvp (args[0], args);
                        //fprintf(stderr, "%s Failed\n", args[0]);
                    }
                    //printf("check wait = %d \n", check_wait);
                    if (!strcmp(args[lenght - 1], "&")){
                        check_wait = false;
                        //printf("check wait = %d \n", check_wait);
                    }

                    if (check_wait == 1)
                    {
                        waitpid(pid, &status, WUNTRACED);
                        printf("%s finished (pid=%d) with status %d\n",args[0], pid, status);
                    }
                    else{
                        printf("child running carry on\n");
                        waitpid(-1, &status, WNOHANG);
                    }
                    
                    
                    continue;
                }

                if (!strcmp(args[0],"quit"))   // "quit" command
                    free(prompt);
                    prompt = NULL;
                    break;                     // break out of 'while' loop
            
                /* else pass command onto OS (or in this instance, print them out) */
                //arg = args;


                /*if (!strcmp(args[0],"environ"))
                {
                    char **s = environ;
                    for (; *s; s++) {
                       printf("%s\n", *s);
                    }
                    continue;
                }

                if (!strcmp(args[0],"dir"))
                {
                    char dict[100] = "ls -al ";
                    if (args[1]){
                        strcat(dict, args[1]);
                    }
                    else{
                        strcat(dict, ".");
                    }
                    
                    system(dict);
                    continue;
                }
                if (!strcmp(args[0], "cd")){
                    char *tmp_path = calloc(200, sizeof(char));
                    tmp_path = getcwd(tmp_path, 200);
                    
                    if (args[1])
                    {   
                    
                        if (chdir(args[1]) == 0)
                        {
                            strcat(tmp_path, "/");
                            strcat(tmp_path, args[1]); 
                        }
                        //chdir(s);
                        //strcat(s, args[1]);
                        setenv("PWD", getcwd(tmp_path, 200), 1);

                    }
                    printf("%s\n", getenv("PWD"));
                    //printf("%s\n", tmp_path);

                    if (argc < 2)
                    {
                        strcpy(prompt ,tmp_path);
                        strcat(prompt, "  DN:===> ");
                    }
                    

                    
                    free(tmp_path);
                    tmp_path = NULL;



                    continue;
                }

                if (!strcmp(args[0], "pause")){
                    int c;
                    c = getchar();
                    while (c != '\n')
                    {
                        pause();
                    }
                
                    
                }
                while (*arg) {
                    fprintf(stdout,"%s ",*arg++);
                    fputs ("\n", stdout);
                }*/


            
            

            
            }
        }
    }
    return 0; 
}


                    /*
                        case -1:
                           fprintf(stderr, "Fork Failed\n");
                        case 0: // child
                            execvp (args[0], args);
                            fprintf(stderr, "%s Failed\n", args[0]);

                        default: // parent
                        if (dont_wait == true)

                            waitpid(pid, &status, WUNTRACED);
                            printf("deez nuts (pid=%d) with status %d\n", pid, status);
}                       
                    if (dont_wait == false)
                    {
                        wait(NULL);
                        printf("child complete\n");
                    }
                    
                    system("clear");*/ 
/*
                char *args_clean[argc];
                int cleanidx = 0;
                int in;
                int out;
                for (int j = 0; j < argc; j++) {
                    if (!strcmp(args[j], "<")) {        // looking for input character
                        ++j;
                        if ((in = open(args[j], O_RDONLY)) < 0) {   // open file for reading
                            fprintf(stderr, "error opening file\n");
                        }
                        dup2(in, STDIN_FILENO);         // duplicate stdin to input file
                        close(in);                      // close after use
                        continue;
                    }                                   // end input chech
                    if (!strcmp(args[j], ">")) {        // looking for output character
                        ++j;
                        out = creat(args[j], 0644); // create new output file
                        dup2(out, STDOUT_FILENO);       // redirect stdout to file
                        close(out);                     // close after usere
                        continue;
                    }                                   // end output check
                    if (!strcmp(args[j], ">>")) {       // looking for append
                        ++j;
                        int append = open(args[j], O_CREAT | O_RDWR | O_APPEND, 0644);
                        dup2(append, STDOUT_FILENO);
                        close(append);
                        continue;
                    }
                    args_clean[cleanidx++] = args[j];
                }                                       // end loop
                args_clean[cleanidx] = NULL;
                execvp(args_clean[0], args_clean);                  // execute in parent
                fprintf(stderr, "error in child execi \n"); // error
                exit(0);
                */

