package wk10;
/**
 * @author Jakub
 * enum BookGenre is used to determine the book genre
 */
enum BookGenre {
    Fiction, NonFiction;
}
/**
 * @author Jakub
 * enum BookMedium is used to determine the book medium
 */
enum BookMedium {
    EBook, PhysicalBook, AudioBook;
}
/**
 * @author Jakub
 * enum BookRating is used to determine the book rating
 */
enum BookRating {
    Rating1, Rating2, Rating3, Rating4, Rating5;
}
/**
 * @author Jakub
 * @see PublishedBook
 * @see ReadBook
 */

/**
 * class Book is the parent class
 */
public class Book {
    /**
     * variable title stores the book title
     */
    public String title;
    /**
     * variable author stores the book author
     */
    public String author;
    /**
     * variable genre stores the book genre
     */
    public BookGenre genre;

    /**
     * @param title
     * @param author
     * @param genre
     * This is the default constructor for the class Book
     */
    Book(String title, String author, BookGenre genre){
        this.title = title;
        this.author = author;
        this.genre = genre;
    }


    /**
     * Method gets and returns the current title
     * @return title
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * Method takes in a string and set the Book title to that string
     * @param title
     * sets a new title
     */
    public void setTitle(String title){
        this.title = title;
    }

    /**
     * Method gets and returns the current author
     * @return author
     */
    public String getAuthor() {
        return this.author;
    }

    /**
     * Method takes in a string and set the Book author to that string
     * @param author
     * sets a new author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Method gets and returns the current genre
     * @return genre
     * @see BookGenre
     */
    public BookGenre getGenre() {
        return this.genre;
    }

    /**
     * Method takes in a string and set the Book author to that string
     * @param genre
     * @see BookGenre
     * sets a new author
     */
    public void setGenre(BookGenre genre) {
        this.genre = genre;
    }


    public String toString(){
        String output = this.title + " by " + this.author;
        return output;
    }



    public static void main(String[] args) {
        Book b1 = new Book("Children of Time", "Adrian Tchaikovsky", BookGenre.Fiction);
        System.out.println(b1);
        PublishedBook b2 = new PublishedBook("The Fifth Season", "N. K. Jemesin", BookGenre.Fiction, 2015, BookMedium.EBook);
        System.out.println(b2);
        ReadBook b3 = new ReadBook("Perdido Street Station", "China Mieville",
            BookGenre.Fiction, 2000, 2020, BookMedium.EBook, BookRating.Rating5);
        System.out.println(b3);
        //System.out.println(b3.rating);
    }
}



class ReadBook extends PublishedBook{

    public int readDate = 0;
    public BookRating rating;

    ReadBook(String title, String author, BookGenre genre, int publishedDate, int readDate, BookMedium medium, BookRating rating){
        super(title, author, genre, publishedDate, medium);
        this.readDate = readDate;
        this.rating = rating;
    }

    public BookRating getRating() {
        return this.rating;
    }

    public void setRating(BookRating rating) {
        this.rating = rating;
    }

    public int getReadDate() {
        return this.readDate;
    }

    public void setReadDate(int readDate){
        this.readDate = readDate;
    }

    public String toString(){
        String output = super.toString();
        String rating = this.rating.name();
        output += " - read in "+ this.readDate + ", rated "+ rating.charAt(6) + "/5";
        return output;
    }
}
