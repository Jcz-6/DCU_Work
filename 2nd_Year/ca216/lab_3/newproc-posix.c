/**
 * This program forks a separate process 
 * using the fork()/exec() system calls.
 *
 * Figure 3.08
 *
 * @author Silberschatz, Galvin, and Gagne
 * Operating System Concepts  - Tenth Edition
 * Copyright John Wiley & Sons - 2018
 */

#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main()
{
pid_t pid;

	/* fork a child process */
	pid = fork();

    int status;
    pid_t cpid;

	if (pid < 0) { /* error occurred */
		fprintf(stderr, "Fork Failed\n");
		return 1;
	}
	else if (pid == 0) { /* child process */
		printf("I am the child %d\n",pid);
        execlp("/bin/ls","ls", NULL);
        return 0;

    }
	else { /* parent process */
		/* parent will wait for the child to complete */
		printf("I am the parent %d\n",pid);
		
        cpid = wait(&status);
		
		printf("Child Complete (pid=%d) with status=%d\n", cpid, status);
	}
    
    return 0;
}