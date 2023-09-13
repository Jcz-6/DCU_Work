
#include "utility.h"
extern char **environ;

/*int checker(char * args, int lenght);


int call_help();
int call_quit();
int call_pause();
int call_environ();
int call_clear(char * args, int lenght);
int call_dir(char * args, int lenght);
int call_cd(char * args, int lenght);
int call_echo(char * args, int lenght);


int default_fork(char * args, int lenght);
int fork_with_redirect(char * args, int lenght);*/



int checker(char ** args, int lenght, int argc, char*prompt){
    //printf("%s\n", args[0]);
    if (!strcmp(args[0], "clr"))
    {
        return call_clear(args, lenght);
    }

    if (!strcmp(args[0], "dir"))
    {
        return call_dir(args, lenght);
    }

    if (!strcmp(args[0], "echo"))
    {
        return call_echo(args, lenght);
    }

    if (!strcmp(args[0], "cd"))
    {
        return call_cd(args, argc, prompt);
    }
    
    if (!strcmp(args[0], "environ"))
    {
        return call_environ(args, lenght);
    }
    
    if (!strcmp(args[0], "pause"))
    {
        return call_pause();
    }
    
    if (!strcmp(args[0], "quit"))
    {
        return call_quit();
    }
    else{
        /*struct stat sb;
        if (stat(args[0], &sb) == 0 && sb.st_mode & S_IXUSR){

        }*/
        return fork_with_redirect(args, lenght);
        
    }  
}



int call_clear(char **args, int lenght){

    int status = default_fork(args, lenght);

    return status;
}

int call_quit(){
    return -1;
}

int call_dir(char **args, int lenght){
    char **tmp_args = malloc(sizeof(char**) * 64);


    //printf("%d\n", lenght);
    if (!tmp_args)
    {
        return -1;
    }
    tmp_args[0] = malloc(3);
    strcpy(tmp_args[0], "ls\0");

    tmp_args[1] = malloc(4);
    strcpy(tmp_args[1], "-al\0");

    //tmp_args[2] = malloc(2);
    //strcpy(tmp_args[2], ".\0");

    if (args[1])
    {   
        char *p_tmp = args[1];
        size_t size = strlen(p_tmp);
        tmp_args[2] = malloc(size + 1);
        strcpy(tmp_args[2], args[1]);
    }
    else{
        tmp_args[2] = malloc(2);
        strcpy(tmp_args[2], ".\0");
    }
    // new_length = lenght;
    //printf("%d\n", new_length);*/
    if (args[2])
    {

        for (int i = 2; i < lenght; i++)
        {
            char *p_tmp = args[i];
            size_t size = strlen(p_tmp);
            tmp_args[i + 1] = malloc(size + 1);
            strcpy(tmp_args[i + 1], args[i]);
            printf("%s\n" ,args[i]);

        }
        
        
    }
    
    // TO DO make fork_with_redirect work focus on new lenght and how args are passed when io redirection is in place
    

    
    //printf("%d\n", new_length);

    int status = fork_with_redirect(tmp_args, lenght + 1);

    free(tmp_args[0]);
    tmp_args[0] = NULL;

    free(tmp_args[1]);
    tmp_args[1] = NULL;

    free(tmp_args[2]);
    tmp_args[2] = NULL;

    free(tmp_args);
    tmp_args = NULL;
    return status;

    //system(args[0]);
    //return 0;
}

int call_echo(char ** args, int lenght){
    
    int status = default_fork(args, lenght);
    
    return status;
}

int call_cd(char ** args, int argc, char*prompt){

    char *tmp_path = calloc(400, sizeof(char));
    tmp_path = getcwd(tmp_path, 400);
                    
    if (args[1])
    {   
                    
        if (chdir(args[1]) == 0){
            strcat(tmp_path, "/");
            strcat(tmp_path, args[1]); 
        }
        //chdir(s);
        //strcat(s, args[1]);
        setenv("PWD", getcwd(tmp_path, 400), 1);

    }
    printf("%s\n", getenv("PWD"));
    //printf("%s\n", tmp_path);

    if (argc < 2){
        strcpy(prompt ,tmp_path);
        strcat(prompt, "  DN:===> ");
    }
                    

                    
    free(tmp_path);
    tmp_path = NULL;

    return 0;
}

int call_environ(char ** args, int lenght){
    /*char **s = environ;
    for (; *s; s++) {
        printf("%s\n", *s);
    }*/
    char **tmp_args = malloc(sizeof(char**) * 64);

        //printf("%d\n", lenght);
        if (!tmp_args)
        {
            return -1;
        }
        tmp_args[0] = malloc(4);
        strcpy(tmp_args[0], "env\0");

        if (args[1])
        {

            for (int i = 1; i < lenght; i++)
            {
                char *p_tmp = args[i];
                size_t size = strlen(p_tmp);
                tmp_args[i] = malloc(size + 1);
                strcpy(tmp_args[i], args[i]);
                printf("%s\n" ,args[i]);

            }


        }

        // TO DO make fork_with_redirect work focus on new lenght and how args are passed when io redirection is in place



        //printf("%d\n", new_length);

        int status = fork_with_redirect(tmp_args, lenght);
        free(tmp_args[0]);
        tmp_args[0] = NULL;

        free(tmp_args);
        tmp_args = NULL;


        return status;
        //return 0;
}

int call_pause(){
    int c;
    c = getchar();
    while (c != '\n')
    {
        pause();
    }
    return 0;
}






int default_fork(char **args, int lenght){
    pid_t pid;
    int status;
    
    //printf("%s \n", args[lenght - 1]);
    
    bool check_wait = true;
    pid = fork();
    //printf("%d \n", check_wai
    if (pid == -1)
    {
        fprintf(stderr, "Fork Failed\n");
        return -1;
    }
    else if (pid == 0)
    {
        if (!strcmp(args[0],"clr"))
        {
            execvp ("clear", args);
            fprintf(stderr, "%s Failed\n", args[0]);


        }
        //printf("%s \n", args[0]);

        execvp (args[0], args);
        fprintf(stderr, "%s Failed\n", args[0]);
    }
    //printf("check wait = %d \n", check_wait);
    /*if (!strcmp(args[lenght - 1], "&")){
        check_wait = false;
        //printf("check wait = %d \n", check_wait);
    }*/
    
    
    if (check_wait)
    {
        waitpid(pid, &status, WUNTRACED);
        //printf("%s\n", args[0]);
        printf("%s finished (pid=%d) with status %d\n",args[0], pid, status);
    }
    else{
        printf("child running carry on\n");
        waitpid(-1, &status, WNOHANG);
    }
    
    
    return 0;
}

int fork_with_redirect(char ** args, int lenght){
    pid_t pid;
    int status;
    bool check_wait = true;
    char *check;
    pid = fork();
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
        close(file); */
        //printf("%s \n", args[0]);

        char *args_clean[lenght];
        int cleanidx = 0;
        int in;
        int out;
        //printf("%d\n", lenght);
        for (int j = 0; j < lenght; j++) {
            check = strdup(args[j]);
            fprintf(stdout, "%s\n", check); // shows input for check
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
                out = open(check, O_CREAT | O_RDWR | O_TRUNC ,0644); // create new output file
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
                  // end loop
        //printf("%s\n", args_clean[cleanidx]);
        args_clean[cleanidx] = NULL;
        if(execvp(args_clean[0], args_clean) == -1){
            perror("Error");   
            return -1;
        }                  // execute in child do ./program_name to test programs
        }//fprintf(stderr, "error in child execi \n"); // error
        //execvp (args[0], args);
        //fprintf(stderr, "%s Failed\n", args[0]);
        
        //printf("check wait = %d \n", check_wait);
        if (!strcmp(args[lenght - 1], "&")){
            check_wait = false;
            printf("check wait = %d \n", check_wait);
        }
        
        
        if (check_wait){
            waitpid(pid, &status, WUNTRACED);
            //printf("%s finished (pid=%d) with status %d\n",args[0], pid, status);
        }
        else{

            waitpid(-1, &status, WNOHANG);
            printf("child running carry on\n");

        }



        return 0;
}
