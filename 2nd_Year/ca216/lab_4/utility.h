#include <envz.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>



int checker(char ** args, int lenght, int argc, char*prompt);


int call_help(char ** args, int lenght);
int call_quit();
int call_pause();
int call_environ(char ** args, int lenght);
int call_clear(char ** args, int lenght);
int call_dir(char ** args, int lenght);
int call_echo(char ** args, int lenght);
int call_cd(char ** args, int argc, char*prompt);

int default_fork(char ** args, int lenght);
int fork_with_redirect(char ** args, int lenght);