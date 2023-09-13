package wk10;
public class PublishedBook extends Book{

    public int publishedDate = 0;
    public BookMedium medium;

    PublishedBook(String title, String author, BookGenre genre, int publishedDate, BookMedium medium){
        super(title, author, genre);
        this.publishedDate = publishedDate;
        this.medium = medium;
    }

    public BookMedium getMedium() {
        return this.medium;
    }

    public void setMedium(BookMedium medium) {
        this.medium = medium;
    }

    public int getPublishedDate() {
        return this.publishedDate;
    }

    public void setPublishedDate(int publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String toString(){
        String output = super.toString();
        output +=" (" + this.publishedDate + ")";
        return output;
    }
}