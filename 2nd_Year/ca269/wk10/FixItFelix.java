/**
 * enum BookGenre is used to determine the book genre
 * @author Jakub
 */
enum BookGenre {
    /**
     * Fiction is a book genre
    */
    Fiction, 
    /**
     * NonFiction is a book genre
     */
    NonFiction;
}
/**
 * enum BookMedium is used to determine the book medium
 * @author Jakub
 */
enum BookMedium {
    /**
     * Ebook is a book medium
     */
    EBook, 
    /**
     * PhysicalBook is a book medium
     */
    PhysicalBook, 
    /**
     * AudioBook is a book medium
     */
    AudioBook;
}
/**
 * enum BookRating is used to determine the book rating
 * @author Jakub
 */
enum BookRating {
    /**
     * Rating1 is a book rating with value 1
     */
    Rating1, 
    /**
     * Rating2 is a book rating with value 2
     */
    Rating2,
    /**
     * Rating3 is a book rating with value 3
     */ 
    Rating3,
    /**
     * Rating4 is a book rating with value 4
     */ 
    Rating4,
    /**
     * Rating5 is a book rating with value 5
     */  
    Rating5;
}

/**
 * @author Jakub
 * @see PublishedBook
 * @see ReadBook
 */

/**
 * class Book is the parent class
 * @author Jakub
 */
class Book {
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
     * Title of the book
     * @param author
     * Author of the book
     * @param genre
     * Genre of the book
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
     * @return Genre of the Book
     * @see BookGenre
     */
    public BookGenre getGenre() {
        return this.genre;
    }

    /**
     * Method takes in a BookGenre and set the Book genre to that genre
     * @param genre
     * One of the possible Genres in the enum BookGenre
     * @see BookGenre
     */
    public void setGenre(BookGenre genre) {
        this.genre = genre;
    }

    /**
     * toString method for Book Class
     * @return output - this.title + " by " + this.author;
     */
    public String toString(){
        String output = this.title + " by " + this.author;
        return output;
    }


}


/**
 * PublishedBook extends class Book it adds two paramaters
 * publishedDate and medium
 */
class PublishedBook extends Book{

    /**
     * publishedDate is a int number of the year of publishing
     */
    public int publishedDate = 0;
    /**
     * medium is a BookMedium variable that stores the medium of the book
     */
    public BookMedium medium;

    /**
     * Constructor for Published Books
     * @param title
     * title is a string that will be used to set the title of the book
     * @param author
     * author is a string that will be used to set the author of the book
     * @param genre
     * genre is a BookGenre that will be used to set the genre of the book
     * @param publishedDate
     * publishedDate is a int that will be used to set the publishedDate of the book
     * @param medium
     * medium is a BookMedium that will be used to set the medium of the book
     */
    PublishedBook(String title, String author, BookGenre genre, int publishedDate, BookMedium medium){
        super(title, author, genre);
        this.publishedDate = publishedDate;
        this.medium = medium;
    }

    /**
     * Getter for the book medium of a published book
     * @return medium - the medium of the book
     */
    public BookMedium getMedium() {
        return this.medium;
    }

    /**
     * Setter for the book medium of a published book
     * @param medium
     * medium is a BookMedium that will be used to set the new PublishedBook medium
     */
    public void setMedium(BookMedium medium) {
        this.medium = medium;
    }

    /**
     * Getter for the published date of a published book
     * @return publishedDate - the published date of the book
     */
    public int getPublishedDate() {
        return this.publishedDate;
    }

    /**
     * Setter for the published date of a published book
     * @param publishedDate
     * publishedDate is a int that will be used to set the new PublishedBook publishedDate
     */
    public void setPublishedDate(int publishedDate) {
        this.publishedDate = publishedDate;
    }

    /**
     * toString method for Book Class
     * @return output of the super class (Book) + " (" + this.publishedDate + ")";
     * @see Book
     */
    public String toString(){
        String output = super.toString();
        output +=" (" + this.publishedDate + ")";
        return output;
    }
}

/**
 * ReadBook extends class PublishedBook it adds two paramaters
 * readDate and rating
 */
class ReadBook extends PublishedBook{

    /**
     * readDate is an int storing the read date of the book
     */
    public int readDate = 0;
    /**
     * rating is a Bookrating that stores the book rating
     */
    public BookRating rating;

    /**
     * Constructor for Published Books
     * @param title
     * title is a string that will be used to set the title of the book
     * @param author
     * author is a string that will be used to set the author of the book
     * @param genre
     * genre is a BookGenre that will be used to set the genre of the book
     * @param publishedDate
     * publishedDate is a int that will be used to set the publishedDate of the book
     * @param medium
     * medium is a BookMedium that will be used to set the medium of the book
     * @param readDate
     * readDate is a int that will be used to set the readDate of the book
     * @param rating
     * rating is a BookRating that will be used to set the rating of the book
     */
    ReadBook(String title, String author, BookGenre genre, int publishedDate, int readDate, BookMedium medium, BookRating rating){
        super(title, author, genre, publishedDate, medium);
        this.readDate = readDate;
        this.rating = rating;
    }

    /**
     * Getter for the rating of a read book
     * @return rating - the rating of the book
     */
    public BookRating getRating() {
        return this.rating;
    }
    /**
     * Setter for rating of a read book
     * @param rating
     * rating is a BookRating that will be used to set the new rating
     */
    public void setRating(BookRating rating) {
        this.rating = rating;
    }

    /**
     * Getter for the read date of a read book
     * @return readDate - the read date of the book
     */
    public int getReadDate() {
        return this.readDate;
    }

    /**
     * Setter for the read date of a read book
     * @param readDate
     * readDate is a int that will be used to set the new read date
     */
    public void setReadDate(int readDate){
        this.readDate = readDate;
    }

    /**
     * toString method for Book Class
     * @return output of the super class (PublishedBook) +  " - read in "+ this.readDate + ", rated "+ rating.charAt(6) + "/5";
     * @see PublishedBook
     */
    public String toString(){
        String output = super.toString();
        String rating = this.rating.name();
        output += " - read in "+ this.readDate + ", rated "+ rating.charAt(6) + "/5";
        return output;
    }
}

/**
 * FitItFelix is a dummy class containing the main function
 * it creates instances of Book, PublishedBook and Readbook
 * then tests them.
 * @see Book
 * @see PublishedBook
 * @see ReadBook
 */
public class FixItFelix {
    
    /**
     * Main method is used to test that the classes work as intended
     * @param args
     * args are comandline arguements
     */
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
