package wk10;

public class ReadBook extends PublishedBook{

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