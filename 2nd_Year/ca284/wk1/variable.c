#include <stdio.h>

int main(int argc, char*argv[])
{

	int age = 20;
	long student_id = 15232762;
	float height = 1.80f;
	char initial = 'F';
	char first_name[] = "Jakub";
	char last_name[] = "Czeniejewski";

	printf("I have a first name %s.\n", first_name);
	printf("I have a last name %s.\n", last_name);
	printf("I have an initial %c.\n", initial);
	printf("My whole name is %s %c. %s.\n", first_name, initial, last_name);
	printf("I am %.02f m tall.\n", height);
	printf("My student ID is %ld.\n", student_id);

	float monthly_salary;
	double annual_salary;

	monthly_salary = 18.50;
	annual_salary = monthly_salary*12;

	printf("My monthly salary is %f euros.\n", monthly_salary);
	printf("My annual salary is %f euros.\n", annual_salary);

	return 0;
}