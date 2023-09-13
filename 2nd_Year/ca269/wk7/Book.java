
enum BookGenre {
    Fiction, NonFiction;
}

enum BookMedium {
    EBook, PhysicalBook, AudioBook;
}

enum BookRating {
    Rating1, Rating2, Rating3, Rating4, Rating5;
}

public class Book {
    public String title;
    public String author;
    public int publishedDate = 0;
    public int readDate = 0;
    public BookGenre genre;
    public BookMedium medium;
    public BookRating rating;

    Book(String title, String author, BookGenre genre){
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    Book(String title, String author, BookGenre genre, int publishedDate){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publishedDate = publishedDate;
    }

    Book(String title, String author, BookGenre genre, int publishedDate, int readDate, BookMedium medium, BookRating rating){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publishedDate = publishedDate;
        this.readDate = readDate;
        this.medium = medium;
        this.rating = rating;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPublishedDate() {
        return this.publishedDate;
    }

    public void setPublishedDate(int publishedDate) {
        this.publishedDate = publishedDate;
    }

    public int getReadDate() {
        return this.readDate;
    }

    public void setReadDate(int readDate){
        this.readDate = readDate;
    }

    public BookGenre getGenre() {
        return this.genre;
    }

    public void setGenre(BookGenre genre) {
        this.genre = genre;
    }

    public BookMedium getMedium() {
        return this.medium;
    }

    public void setMedium(BookMedium medium) {
        this.medium = medium;
    }

    public BookRating getRating() {
        return this.rating;
    }

    public void setRating(BookRating rating) {
        this.rating = rating;
    }

    public String toString(){
        String output = this.title + " by " + this.author;
        if (genre != null && publishedDate != 0) {
            output = this.title + " by " + this.author + " (" + this.publishedDate + ")";
        }
        if (genre != null && publishedDate != 0 && readDate != 0 && medium != null && rating != null){
            String rating = this.rating.name();
            output = this.title + " by " + this.author + " (" + this.publishedDate + ")" + " - read in "+ this.readDate + ", rated "+ rating.charAt(6) + "/5";
        }
        return output;
    }



    public static void main(String[] args) {
        Book b1 = new Book("Children of Time", "Adrian Tchaikovsky", BookGenre.Fiction);
        System.out.println(b1);
        Book b2 = new Book("The Fifth Season", "N. K. Jemesin", BookGenre.Fiction, 2015);
        System.out.println(b2);
        Book b3 = new Book("Perdido Street Station", "China Mieville",
            BookGenre.Fiction, 2000, 2020, BookMedium.EBook, BookRating.Rating5);
        System.out.println(b3);
        //System.out.println(b3.rating);
    }
}
