/*
Jakub Czerniejewski
ID: 21466494
I acknowledge DCU's academic plagerism integrity policy
*/


#include "utility.h" //importing my header file
extern char **environ; //getting the enviorment strings

/*This funtion is called inside myshell to check for any
built in commands first if there is non present it will call
the default for and exec function with direction*/
int checker(char ** args, int lenght, int argc, char*prompt){
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
    
    if (!strcmp(args[0], "help"))
    {
        return call_help(args, lenght);
    }
    else{
        return fork_with_redirect(args, lenght);
        
    }  
}

/*Function for clear comand which uses default fork*/
int call_clear(char **args, int lenght){
    char **tmp_args = malloc(sizeof(char**) * 64);

    if (!tmp_args)
    {
        return -1;
    }
    tmp_args[0] = malloc(7);
    strcpy(tmp_args[0], "clear\0");


    int status = fork_with_redirect(tmp_args, lenght);

    free(tmp_args);
    tmp_args = NULL;
    return status;
}


/*Function for quit command that returns -1
which ends the while loop*/
int call_quit(){
    return -1;
}


/*Function for dir comand which uses fork with redirection
the dir command lists out contents of the current directory
by default or of a specifiend directory*/
int call_dir(char **args, int lenght){
    char **tmp_args = malloc(sizeof(char**) * 64);


    if (!tmp_args)
    {
        return -1;
    }
    tmp_args[0] = malloc(3);
    strcpy(tmp_args[0], "ls\0");

    tmp_args[1] = malloc(4);
    strcpy(tmp_args[1], "-al\0");


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
    if (args[2])
    {

        for (int i = 2; i < lenght; i++)
        {
            char *p_tmp = args[i];
            size_t size = strlen(p_tmp);
            tmp_args[i + 1] = malloc(size + 1);
            strcpy(tmp_args[i + 1], args[i]);

        }
        
        
    }


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
}


/*Function for echo comand which uses fork with redirection*/
int call_echo(char ** args, int lenght){
    
    int status = fork_with_redirect(args, lenght);
    
    return status;
}


/*Function for cd comand which allows the user to change directories
using the myshell programe*/
int call_cd(char ** args, int argc, char*prompt){

    char *tmp_path = calloc(400, sizeof(char));
    tmp_path = getcwd(tmp_path, 400);
                    
    if (args[1])
    {   
                    
        if (chdir(args[1]) == 0){
            strcat(tmp_path, "/");
            strcat(tmp_path, args[1]); 
        }
        setenv("PWD", getcwd(tmp_path, 400), 1);

    }
    else{
        printf("%s\n", getenv("PWD"));
    }

    //printf("%s\n", tmp_path);

    if (argc < 2){
        strcpy(prompt ,tmp_path);
        strcat(prompt, "  DN:===> ");
    }
                    

                    
    free(tmp_path);
    tmp_path = NULL;

    return 0;
}


/*Function for environ comand which uses fork with redirection,
this function lists out all the enviorment strings*/
int call_environ(char ** args, int lenght){
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

        //printf("%d\n", new_length);

        int status = fork_with_redirect(tmp_args, lenght);
        free(tmp_args[0]);
        tmp_args[0] = NULL;

        free(tmp_args);
        tmp_args = NULL;


        return status;
        //return 0;
}


/*Function for pause command which waits for "enter"
to be pressed*/
int call_pause(){
    int c;
    c = getchar();
    while (c != '\n')
    {
        pause();
    }
    return 0;
}


/*Function for help comand which uses fork with redirection, this
function uses more and a readme.md manual for this program*/
int call_help(char ** args, int lenght){
    char **tmp_args = malloc(sizeof(char**) * 64);

        //printf("%d\n", lenght);
        if (!tmp_args)
        {
            return -1;
        }
        tmp_args[0] = malloc(5);
        strcpy(tmp_args[0], "more");

        tmp_args[1] = malloc(19);
        strcpy(tmp_args[1], "manual/readme.md\0");

        if (args[1])
        {

            for (int i = 1; i < lenght; i++)
            {
                char *p_tmp = args[i];
                size_t size = strlen(p_tmp);
                tmp_args[i + 1] = malloc(size + 1);
                strcpy(tmp_args[i + 1], args[i]);
                printf("%s\n" ,tmp_args[0]);

            }
        }
        //printf("%s\n", tmp_args[1]);

        int status = fork_with_redirect(tmp_args, lenght + 1);

        free(tmp_args[0]);
        tmp_args[0] = NULL;

        free(tmp_args[1]);
        tmp_args[1] = NULL;

        free(tmp_args);
        tmp_args = NULL;

        return status;
}

/*this is the funtion used for forking and executing the commands
alongside I/O redirection*/
int fork_with_redirect(char ** args, int lenght){
    pid_t pid;
    int status;
    bool check_wait = true; //Flag for background execution
    pid = fork();
    if (pid == -1)
    {
        fprintf(stderr, "Fork Failed\n");
    }
    else if (pid == 0)
    {   
        setenv("PARENT", getenv("SHELL"), 1); // set the parent of the process to the shell env string


        char *check;
        char *args_clean[lenght]; // make a new char array without the redirection signs
        int cleanidx = 0; // index for the array
        int in;
        int out;
        //printf("%d\n", lenght);
        for (int j = 0; j < lenght; j++) {
            check = strdup(args[j]); // this pointer is used to check our string
            //fprintf(stdout, "%s\n", check);
            if (!strcmp(check, "<")) {        // looking for input character
                ++j;
                check = strdup(args[j]);// goes to the next arguement(the file)
                if ((in = open(check, O_RDONLY)) < 0) {   // open file for reading
                    fprintf(stderr, "error opening file\n");
                }
                dup2(in, STDIN_FILENO);         // duplicate stdin to input file
                close(in);                      // close after use
                continue;
            }                                  
            if (!strcmp(check, ">")) {        // looking for output character
                ++j;
                check = strdup(args[j]);
                out = open(check, O_CREAT | O_RDWR | O_TRUNC ,0644); // create new output file if there isnt one otherwise truncate it
                dup2(out, STDOUT_FILENO);       // redirect stdout to file
                close(out);                     // close after usere
                continue;
            }                                   // end output check
            if (!strcmp(check, ">>")) {       // looking for append
                ++j;
                check = strdup(args[j]);
                int append = open(check, O_CREAT | O_RDWR | O_APPEND, 0644);//create a new outputfile for append if it doesnt exist
                dup2(append, STDOUT_FILENO); //redirect stdout to file
                close(append);              //close after use
                continue;
            }                               // end looking for append
            /*if check is & stop the for loop*/
            if (!strcmp(check, "&")){
                break;
        
            }
            /*add check string to the array with no redirection signs*/
            args_clean[cleanidx++] = check;
             
        }
        /*set the last position to NULL*/
        args_clean[cleanidx] = NULL;
        
        /*execute the commands or throw an error*/
        if(execvp(args_clean[0], args_clean) == -1){
            perror("Error");   
            return -1;
        }
    }

    /*if the last char is "&" set the flag to false*/    
    if (!strcmp(args[lenght - 1], "&")){
        check_wait = false;
        //printf("check wait = %d \n", check_wait);
    }
        
    /*depending on the flag wait for the process to finish or carry on*/    
    if (check_wait){
        waitpid(pid, &status, WUNTRACED);
    }
    else{
        waitpid(-1, &status, WNOHANG);
        printf("child running carry on\n");
    }

    return 0;
}
