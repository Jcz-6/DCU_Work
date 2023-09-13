/** class Q1c representing Questions */
class Q1c {

    private static int MQUESTION_COUNT = 0; /** Count of Questions created */

    private String title; /** Question title */
    int number; /** Question number */
    private int marks; /** Question marks */

    /** Getters and Setters */

    public String getTitle() { return this.title; }

    public void setTitle(String title) { this.title = title; }

    public int getNumber() { return this.number; }

    public void setNumber(int number) { this.number = number; }

    public int getMarks() { return this.marks; }

    /** sets marks
        @param marks Marks for question, valid only when 0 or above
        Invalid marks are set to 0
     */
    public void setMarks(int marks) {
        if (marks < 0) { marks = 0; }
        this.marks = marks;
    }

    /** Default constructor
        Sets title to "untitled", number and marks to 0
     */
    Q1c() { this("untitled", 0, 0); }

    /** Constructor for creating a Question
        @param title Question title
        @param marks Question marks
        The number is automatically set incrementally using a central counter
     */
    Q1c(String title, int marks) { this(title, Q1c.MQUESTION_COUNT+1, marks); }

    /** Constructor for creating a Question
        @param title Question title
        @param number Question number
        @param marks Question marks
     */
    Q1c(String title, int number, int marks) {
        this.title = title;
        this.number = number;
        this.marks = marks;
        Q1c.MQUESTION_COUNT += 1;
    }

    /** @return String description as <number> <title> (<marks> marks)
     */
    public String toString() {
        return number + " " + title + " (" + marks + " marks)";
    }
}