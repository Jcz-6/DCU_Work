	

import java.util.Scanner;

public class AlarmClock
{
	public static void main(String[] args) 
	{
		Scanner input = new Scanner(System.in);

		int alarm_time_hours = input.nextInt();
		int alarm_time_min = input.nextInt();

		int current_alarm_hours = input.nextInt();
		int current_alarm_min = input.nextInt();

		int counter = 0;


		while (((current_alarm_hours * 60) + current_alarm_min) < ((alarm_time_hours * 60)) + alarm_time_min) 
		{
		 	counter += 1;
		 	current_alarm_hours = input.nextInt();
			current_alarm_min = input.nextInt();	
		}	

		System.out.println("false alarms: " + counter);
	}

}