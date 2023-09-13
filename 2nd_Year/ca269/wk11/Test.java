import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.CSVFormat;
import java.io.Reader;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import com.google.gson.Gson;

/*public class Test{

    public static void main(String[] args) throws FileNotFoundException, IOException {
        Reader in = new FileReader("test.csv");
        CSVFormat CSVparser = CSVFormat.Builder.create().setHeader().build();
        Iterable<CSVRecord> records = CSVparser.parse(in);
        for (CSVRecord record : records) {
            System.out.println(record.get("id"));
            System.out.println(record.get("name"));
            System.out.println(record.get("comment"));
        }
    }

    how to compile and shit
     javac -cp '.:gson-2.10.1.jar:commons-csv-1.10.0.jar' Test.java                                  at  13:00:57
    java -cp '.:gson-2.10.1.jar:commons-csv-1.10.0.jar:' Test

}*/



class Data {
    int id;
    String name;

    Data() {
        this.id = 0;
        this.name = "Unknown";
    }

    Data(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class Test {
    public static void main(String args[]) throws Exception {
        Data d1 = new Data();
        Gson gson = new Gson();
        String json = gson.toJson(d1);
        System.out.println(json);

        Data d2 = new Data(1, "Jane Doe");
        gson = new Gson();
        json = gson.toJson(d2);
        System.out.println(json);
    }
}

/* OUTPUT
{"id":0,"name":"Unknown"}
{"id":1,"name":"Jane Doe"}
*/