#include <stdio.h>

int main(int argc, char*argv[])
{
int matrix[3][3] = {
                   {10,20,30},
                   {40,50,60},
                   {70,80,90}
                 };

char *fullName = "Tai Mai";// you can still change the letters by adding + 1 to indexed char


printf("address of matrix        : %p\n", matrix);
printf("address of matrix[0][0]  : %p\n", &matrix[0][0]);
printf("value of matrix[0]       : %p\n", matrix[0]);




printf("value of matrix[0][0]        : %d\n", matrix[0][0]); /* the normal way */
printf("address of *matrix[0]  : %d\n", *matrix[0]); /* pointer and array */
printf("value of **matrix       : %d\n", **matrix); /* using pointer only */



printf("matrix[1][2]: %d\n", matrix[1][2]); /* the normal way */
printf("*(matrix[1]+2): %d\n", *(matrix[1]+2)); /* pointer and array */
printf("*(*(matrix + 1)+2): %d\n", *(*(matrix + 1)+2)); /* using pointer only */
printf("*(*matrix + 5): %d\n", *(*matrix + 5)); /* using pointer only */
printf("%s\n", fullName);
return 0;
}
