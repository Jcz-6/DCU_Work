
NAME
    myshell


DESCRIPTION
       Myshell is a basic implementation of a shell coded in the C language that has
       built in commands, i/o redirection, background processes which uses to fork and
       exec to execute commands. 


BUILT-IN COMMANDS

    DIR - dir [directory name | path to directory]

    Dir command allows user to list out all files and directories in a specific directory
    which is provided by the user as a command line arguement. If no arguement is provided
    dir use the current working directory.

    ##############################################################################

    ECHO - echo [string]

    Echo command takes in string(s) as a command line arguement and outputs it to standard
    output.

    ##############################################################################

    CLR - clr

    Clr clears previous output from the terminal, it takes no command line arguements.

    ##############################################################################

    QUIT - quit

    Quit command exits the program, it takes no command line arguements.
    
    ##############################################################################

    CD - cd [directory name | path to directory]

    Cd command allows the user to change the current working directory, 
    which is specified by the user by passing a command line arguement, cd also updates the
    enviorment variable for cwd and it updates the prompt. 
    If no command line arguement is passed cd list out the current directory path.

    ##############################################################################

    ENVIRON - environ

    Environ command lists out all the enviorment variables to standard output.

    ##############################################################################

    PAUSE - pause

    Pause command stop the user from inputting commands into the program until the
    "Enter" is pressed on the keyboard.

    ##############################################################################


DEFAULT BEHAVIOUR

    If the command line arguement at position 0 is not a built-in command, the program will 
    try to execute whatever command line arguements are passed, it will throw a error 
    if there is no such file or directory.


I/O REDIRECTION
    I/O redirection allows the user the change the input and output stream of their
    program by using the following symbols <, >, <<.
    

    READ - <

    By passing the < character as a command line arguement we can change the standard
    input stream to be a "input file" as such:

        program args1 args2 < "input file"

    ##############################################################################

    WRITE - >

    By passing the > character as a command line arguement we can change the standard
    output stream to be a "out file" as such:

        program args1 args2 > "output file"

    If the output file does not exist it will be created and if it exists it will
    be truncated(cleared).

    ##############################################################################

    APPEND - >>

    By passing the > character as a command line arguement we can change the standard
    output stream to be a "out file" as such:

        program args1 args2 >> "output file"

    If the output file does not exist it will be created and if it exists it will
    be appended to.

    ##############################################################################

REFERENCES
    Here are the references which helped me with this code:

    [1]Graham Healy 2023-02-06 CA216 Lab04/05: Building a shell
        https://loop.dcu.ie/mod/book/view.php?id=2054177.
        Used it to for the tokenisation of comandline arguements
        and for fork and exec.

    [2]Michael Kerrisk 2022-12-18 dup2() Linux manual page
        https://man7.org/linux/man-pages/man2/dup.2.html.
        Helped me with the dup2() function when doing I/O
        redirection.

    [3]Michael Kerrisk 2022-12-18 open(2) Linux manual page
        https://man7.org/linux/man-pages/man2/openat.2.html.
        Helped me with the open() function when doing I/O
        redirection.


    [4]Michael Kerrisk 2022-12-18 environ(7) Linux manual page
        https://man7.org/linux/man-pages/man7/environ.7.html.
        Helped me with using the enviornment strings also led me
        to setenv() and getenv().
    ##############################################################################

                                Jakub Czerniejewski
                                    ID: 21466494
                I acknowledge DCU's academic plagerism integrity policy.
