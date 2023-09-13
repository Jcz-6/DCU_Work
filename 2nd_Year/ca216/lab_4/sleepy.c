#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>

unsigned int sleepy(unsigned int *time);
void sighandler(int signum);


int main(int argc, char const *argv[])
{
    unsigned int seconds = atoi(argv[1]);
    unsigned int status;

    signal(SIGINT,sighandler);
    status = sleepy(&seconds);

    
    return 0;
}

unsigned int sleepy(unsigned int *time){

    unsigned int sleepy_status;
    pid_t pid;

    for (int i = 0; i < *time; i++)
    {   
        sleepy_status = sleep(5);
        pid = getpid();
        if (sleepy_status != 0)
        {
        printf("Process %d has been interupted after %d seconds\n", pid, (5 - sleepy_status));
        }
    }
    
    return sleepy_status;
}

void sighandler(int signum){
    printf("Received a signal %d\n", signum);
}
