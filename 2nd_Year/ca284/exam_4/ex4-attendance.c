//Jakub Czerniejewski 13/12/2022 Exam 4 Question 1

//This programe uses dynanamic memory allocation and structures to determine
//whether a students absend status is 1 or 0
//its one if they have 3 absences.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Student Student;

struct Student {
	int late;
	int absent;
};


//Here are my function prototypes.
void update_students(Student *p_students, int *amount_of_students, char*argv[]);
void print_attendance_record(Student *p_students, int *amount_of_students);
int compare(char letter);


int main(int argc, char*argv[])
{
	int amount_of_students = argc - 1;
	Student *p_students = calloc(amount_of_students, sizeof(Student));

	if(!p_students)
	{
		printf("Mem alocation failed.\n");
		free(p_students);
		p_students = NULL;
		exit(0);
	}
	update_students(p_students, &amount_of_students, argv);
	print_attendance_record(p_students, &amount_of_students);

	free(p_students);
	p_students = NULL;
	return 0;
}

//This function takes in an input from the command line and creates the students absence and late
//record.
void update_students(Student *students, int *amount_of_students, char*argv[])
{
	char *tmp = calloc(50, sizeof(char));

	if(!tmp)
	{
		printf("Mem alocation failed.\n");
		free(tmp);
		tmp = NULL;
		exit(0);
	}


	for (int i = 0; i < *amount_of_students; ++i)
	{	
		strcpy(tmp, argv[i + 1]);
		int n = strlen(tmp);

		int count_l = 0;

		//printf("%d\n", n);

		for (int j = 0; j < n; ++j)
		{
			//printf("%d\n", i);
			//printf("%d\n", letter);
			//printf("%d\n", *(tmp + j));

			//printf("%d\n", compare);
			//printf("%d\n", compare_2);

			if (*(tmp + j) == 76)
			{
				count_l += 1;
				if (count_l == 3)
				{
					(students + i)->late += count_l;
					count_l = 0;
				}
			}

			if (*(tmp + j) == 65)
			{
				(students + i)->absent += 1;
				count_l = 0;
			}

			if (*(tmp + j) == 80)
			{
				count_l = 0;
			}
			//printf("%d\n", count_a);
			//printf("%d\n", count_l);
			//(students + i)->absent += 1;
			//(students + i)->late += 1;
		}
		//printf("%d\n", (students + i)->absent);
		//printf("%d\n", (students + i)->late);
	}
	free(tmp);
	tmp = NULL;	
}


//This function determines whether the attendence status is 1 or 0
//and prints it.
void print_attendance_record(Student *students, int *amount_of_students)
{
	int absence = 0;
	for (int i = 0; i < *amount_of_students; ++i)
	{
		absence = 0;
		absence += (students + i)->absent;
		absence += (students + i)->late / 3;
		//printf("%d\n", absence);
		if (absence >= 3)
		{
			printf("1\n");
		}
		else
		{
			printf("0\n");
		}
	}
}

