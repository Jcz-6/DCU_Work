// TODO: Add JavaDoc comments
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.CSVFormat;

import java.io.Reader;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Writer;
import java.io.FileWriter;


import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

class StarWarsCharacter {
    String name = "";
    String height = "";
    String mass = "";
    String hairColor = "";
    String skinColor = "";
    String eyeColor = "";
    String birthYear = "";
    String gender = "";
    String homeworld = "";
    String species = "";

    StarWarsCharacter() { }

    // additional constructors go here

    // getters and setters go here

    // toString to print character info.
}

public class JarJarBinks {

    public static void main(String[] args) throws FileNotFoundException, IOException {
        List<StarWarsCharacter> charactersList = new ArrayList<>();
        // File to read data from
        Reader in = new FileReader("characters.csv");
        // CSV parser from Apache Commons CSV
        // Check details of each method here:
        // https://commons.apache.org/proper/commons-csv/apidocs/index.html
        CSVFormat CSVparser = CSVFormat.Builder.create().setHeader().build();
        // We have seen the use of Iterable earlier to iterate through
        // the data stored within a class.
        // In this case, the Apache Commons CSV creates an instance that
        // holds all the CSV rows, and we iterate through them one by one
        Iterable<CSVRecord> records = CSVparser.parse(in);
        for (CSVRecord record : records) {
            StarWarsCharacter character = new StarWarsCharacter();
    
            //System.out.println(record.get("name"));
            character.name = record.get("name");
            character.height = record.get("height");
            character.mass = record.get("mass");
            character.hairColor = record.get("hair_color");
            character.eyeColor = record.get("eye_color");
            character.skinColor = record.get("skin_color");
            character.birthYear = record.get("birth_year");
            character.gender = record.get("gender");
            character.homeworld = record.get("homeworld");
            character.species = record.get("species");
            charactersList.add(character);
            // ...
        }
        //System.out.println(charactersList.size());

        //Gson gson = new Gson();
        //System.out.println(gson.toJson(charactersList.get(0)));
        //System.out.println(gson.toJson(charactersList.get(charactersList.size() - 1)));

        // I have used a FileWriter here, but you can use something else too
        Writer out = new FileWriter("characters.json");
        // For use of GSON, refer to their user guide
        Gson gson2 = new Gson();
        gson2.toJson(charactersList, out);
        out.close();
    }
}
