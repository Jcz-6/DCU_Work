import java.time.LocalDate;

import java.time.Period;

class Task {
    // think why private is the WRONG choice here
    // instead, think what should be the access modifier
    protected final String title;
    protected String description;
    protected LocalDate scheduled;
    protected LocalDate deadline; // think why this isn't final
    protected State state;

    Task (String title, State state){
        this.title = title;
        this.state = state;
    }

    Task(String title, String description, LocalDate scheduled, LocalDate deadline, State state)
    {
        this.title = title;
        setState(state);
        setDeadline(deadline);
        setDesription(description);
        setScheduled(scheduled);
    }

    public String getTitle() {
        return title;
    }

    public State getState() {
        return state;
    }

    public String getDesription() {
        return description;
    }

    public LocalDate getScheduled() {
        return scheduled;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    /* 
    public void setTitle(String title) {
        this.title = title;
    }
    */

    public void setState(State state) {
        this.state = state;
    }

    public void setDesription(String description) {
        this.description = description;
    }

    public void setScheduled(LocalDate scheduled) {
        this.scheduled = scheduled;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String toString() {
        String message = this.title + " (" + this.state + ")";
        if (scheduled != null) {
            message += " scheduled: " + scheduled;
        }
        if (deadline != null) {
            message += " deadline: " + deadline;
        }
        return message;
    }

    public static void main(String[] args) {

        Task t1 = new Task("T1", State.TODO);
        LocalDate now = LocalDate.now();
        LocalDate.now();
        System.out.println(t1);

        /* OUTPUT
        T1 (TODO)
        */

        Task s1 = new RepeatedTask("S1", State.TODO);
        System.out.println(s1);
        s1.setState(State.DONE);
        System.out.println(s1);

        /* OUTPUT
        S1 (TODO)
        S1 (TODO)
        */

        // Check Chores work correctly on DONE -> repeat
        // note s2 is Task but object is type Chore
        Task s2 = new Chore("S2", State.TODO,
            LocalDate.now(),
            LocalDate.now().plus(Period.ofDays(7)));
        System.out.println(s2);
        s2.setState(State.DONE);
        System.out.println(s2);
        // verify the scheduled date has moved by +7 days

        /* OUTPUT
        S2 (TODO) scheduled: 2023-01-26
        S2 (TODO) scheduled: 2023-02-02
        */

        Task t2 = new SharedTask("T2", "Alice");
        System.out.println(t2);

        /* OUTPUT
        T2 (WAIT) shared with: Alice
        */

        Task t3 = new Dependency("T3", State.TODO, t1);
        System.out.println(t3);
        //t3.setState(State.DONE);
        //System.out.println(t3);
        //t1.setState(State.DONE);
        //t3.setState(State.DONE);
        //System.out.println(t3);

        /* OUTPUT
        T3 (TODO) dependent on: T1 (TODO)
        T3 (TODO) dependent on: T1 (TODO)
        T3 (DONE) dependent on: T1 (DONE)
        */
    }

}

enum State {
    TODO, BEGN, HALT, WAIT, DONE;
}


class Chore extends Task {
    // think how to use inheritence to avoid repeating fields from Task
    LocalDate repeat;

    Chore(String title, State state, LocalDate scheduled, LocalDate repeat) {
        // parameters are the mandatory fields
        // super() is to ensure parent constructor is called - otherwise we get Errors!
        super(title, state);
        // even in constructor, defer to setters
        // because there may be input validation, default values, etc. implemented in them
        super.setScheduled(scheduled);

        setRepeat(repeat);

    }

    public LocalDate getRepeat() {
        return repeat;
    
    }

    public void setRepeat(LocalDate repeat) {
        this.repeat = repeat;
    
    }

    public void setState(State state) {
        // if state is DONE
        super.setState(state);
        if (state == State.DONE) {
            // scheduled = repeat
            // but first set repeat to +7 days
            LocalDate repeat_new = repeat.plus(Period.ofDays(7));
            setScheduled(repeat);
            setRepeat(repeat_new);
            super.setState(State.TODO);
        }
    }
    
}

class RepeatedTask extends Task{

    RepeatedTask(String title, State state) {
        super(title, state);

    }

    public void setState(State state) {
        // if state is DONE
        super.setState(state);
        if (state == State.DONE) {
            // scheduled = repeat
            // but first set repeat to +7 days
            super.setState(State.TODO);
        }
    }
}

class SharedTask extends Task {
    // think how to use inheritence to avoid repeating fields from Task
    String name;

    SharedTask(String title, String name) {
        super(title, State.WAIT);
        setName(name);

    }

    public String getName() {
        return name;
    
    }

    public void setName(String name) {
        this.name = name;
    
    }

    public String toString() {
        String message = this.title + " (" + this.state + ")" + " shared with: " + this.name;
        return message;
    }
    
    
}

class Dependency extends Task{

    public Task dependency;

    Dependency(String title, State state, Task dependency) {
        super(title, state);

        setDependency(dependency);
    }

    public Task getDependency() {
        return this.dependency;
    
    }

    public void setDependency(Task dependency) {
        this.dependency = dependency;
    }


    public void setState(State state){

        if (dependency.state == State.DONE & state == State.DONE) {
            super.setState(state);
        }
        else if (state != State.DONE){
            super.setState(state);
        }
    }
    

    public String toString(){
        String message;
        message = super.toString() + " dependent on: " + dependency.title + " (" + dependency.state +")";
        return message;
    }
}
