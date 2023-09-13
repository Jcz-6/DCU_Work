#include <stdio.h>
#include <stdlib.h>
#include <string.h>



typedef struct Student Student;

struct Student
{
	char Name[20];
	char Programme[20];
	float Grade;
};


void make_student(char *argv[], Student *students, int *amount_of_students);
void print_students(Student *students, int *amount_of_students);



int main(int argc, char *argv[])
{
	int amount_of_students = (argc - 1) / 3;
	Student *pstudents = calloc(amount_of_students, sizeof(Student));

	if(!pstudents)
	{
		printf("Unfortunately memory reallocation failed.\n");
		free(pstudents);
		pstudents = NULL;
		return 0;
	}

	make_student(argv, pstudents, &amount_of_students);
	print_students(pstudents, &amount_of_students);

	return 0;
}


void make_student(char *argv[], Student *students, int *amount_of_students)
{
	int index = 1;

	for(int i=0; i < *amount_of_students; ++i)
	{	
		strcpy((students + i)->Name, argv[index++]);
		strcpy((students + i)->Programme, argv[index++]);
		(students + i)->Grade = atof(argv[index++]);
	}
	
}


void print_students(Student *students, int *amount_of_students)
{
	for (int i = 0; i < *amount_of_students; ++i)
	{
		printf("%s, %s, %.2f\n", (students + i)->Name, (students + i)->Programme, (students + i)->Grade);
	}
}