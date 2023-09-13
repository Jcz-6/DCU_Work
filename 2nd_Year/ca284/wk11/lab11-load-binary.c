#include <stdlib.h>
#include <stdio.h>
#include <string.h>


int main()
{
	FILE *pfile = NULL;
	char *file_name = "studentBinary.bin";

    pfile = fopen(file_name, "rb"); //Now the mode is read binary
    if(!pfile)
        printf("Failed to open %s.\n", file_name);


   	int lenght_of_name = 0;
   	int lenght_of_college = 0;
   	int age = 0;
   	float grade = 0;


    int rcount1 = fread(&lenght_of_name, sizeof(int), 1, pfile);
    char student_name[lenght_of_name];
	int rcount2 = fread(student_name, sizeof(char), lenght_of_name, pfile);

	int rcount3 = fread(&lenght_of_college, sizeof(int), 1, pfile);
    char college_name[lenght_of_college];
    int rcount4 = fread(college_name, sizeof(char), lenght_of_college, pfile);

    int rcount5 = fread(&age, sizeof(int), 1, pfile);

    int rcount6 = fread(&grade, sizeof(float), 1, pfile);

    fclose(pfile);

    printf("Name: %s\n", student_name);
    printf("College: %s\n", college_name);
    printf("Age: %d\n", age);
    printf("Grade: %.2f\n", grade);

    return 0;
}