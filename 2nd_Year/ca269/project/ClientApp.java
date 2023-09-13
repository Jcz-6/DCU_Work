import java.util.Queue;
import java.util.LinkedList;
import java.util.List;
import java.util.ArrayList;

interface Activity {
    String getURI();
}


/* receives a message and adds it to the Inbox */
interface ReceiveMessage {
    // returns a success / failure message
    boolean receive(Activity activity);
}

/* removes and retrieves the next message from inbox */
interface ReadNextMessage {
    // returns an Activity, or null if there are no messages
    Activity readNext();
}

/* provides inbox functionality */
interface Inbox extends ReceiveMessage, ReadNextMessage {
    // returns count of unread messages in inbox
    int getCount();
}

/* sends a message and adds it to the Outbox */
interface SendMessage {
    boolean send(Activity activity);
}

/* removes and delivers the next message from inbox */
interface DeliverNextMessage {
    // returns an Activity, or null if there are no messages
    Activity deliverNext();
}

/* provides outbox functionality */
interface Outbox extends SendMessage, DeliverNextMessage {
    // returns count of unsent messages in outbox
    int getCount();
}

/* the client App that handles inboxes and outboxes */
interface App {
    Inbox getInbox(); // retrieves the inbox
    Outbox getOutbox(); // retrievs the outbox
    String demo(); // prints a demo of the app in action
}


class myInbox implements Inbox{
    
    final private Queue<Activity> inbox = new LinkedList<Activity>();

    public boolean receive(Activity activity){
        inbox.add(activity);
        return true;
    }

    public Activity readNext(){
        if (!inbox.isEmpty()) {
            return inbox.remove();
        }
        return null;
    }
    
    public int getCount(){
        return inbox.size();
    }



}

class myOutbox implements Outbox{

    final private Queue<Activity> outbox = new LinkedList<Activity>();

    public Activity deliverNext(){
        if (!outbox.isEmpty()) {
            return outbox.remove();
        }
        return null;
    }

    public boolean send(Activity activity){
        outbox.add(activity);
        return true;
    }

    public int getCount(){
        return outbox.size();
    }
}

class Like implements Activity{

    public final String URI; 
    public String summary;
    public Person actor;
    public final StreamObject object;


    Like(Person actor, StreamObject object){
        this.URI = "https://www.java-soc.com/" + actor.name + "/#Like/" + object.getType() + "_" + String.valueOf(Create.objectNumber);
        this.summary = actor.getPreferredUsername() + " Liked " + object.getURI();
        this.actor = actor;
        this.object = object;
    }

    public String getURI(){
        return this.URI;
    }

    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    
    public Person getActor(){
        return this.actor;
    }

    public void setActor(Person actor){
        this.actor = actor;
    }


    public StreamObject getObject(){
        return this.object;
    }

    /*public void setObject(StreamObject object){
        this.object = object;
    }*/

    public String toString(){
        String output = actor.getPreferredUsername() + " Adds a Like activity to Oubox \n";
        output += "=> URI : " + URI + "\n";
        output += "=> Summary : " + summary + "\n";
        output += "=> Actor : " + actor.getURI() + "\n";
        output += "=> StreamObject : " + object.getURI() + "\n";
        return output;
    }

}

class Follow implements Activity{

    public final String URI; 
    public String summary;
    public Person actor;
    public Person person;

    Follow(Person actor, Person person){
        this.URI = "https://www.java-soc.com/" + actor.getPreferredUsername() + "/#Follows/" + person.getPreferredUsername();
        this.summary = actor.getPreferredUsername() + " Followed " + person.getPreferredUsername();
        this.actor = actor;
        this.person = person;
    }

    public String getURI(){
        return this.URI;
    }

    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    
    public Person getActor(){
        return this.actor;
    }

    public void setActor(Person actor){
        this.actor = actor;
    }

    public Person getPerson(){
        return this.person;
    }


    public Person getObject(){
        return this.person;
    }

    public void setObject(Person person){
        this.person = person;
    }

    public String toString(){
        String output = actor.getPreferredUsername() + " Adds a Follow activity to Oubox \n";
        output += "=> URI : " + URI + "\n";
        output += "=> Summary : " + summary + "\n";
        output += "=> Actor : " + actor.getURI() + "\n";
        output += "=> Person : " + person.getURI() + "\n";
        return output;
    }
}

class Unfollow implements Activity{

    public final String URI; 
    public String summary;
    public Person actor;
    public Person person;

    Unfollow(Follow follow){
        this.actor = follow.getActor();
        this.person = follow.getPerson();
        this.URI = "https://www.java-soc.com/" + actor.getPreferredUsername() + "/#Unfollows/" + person.getPreferredUsername();
        this.summary = actor.getPreferredUsername() + " Unfollowed " + person.getPreferredUsername();

        person.getFollowers().remove(follow);
        actor.getFollowing().remove(follow);

    }

    public String getURI(){
        return this.URI;
    }

    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    
    public Person getActor(){
        return this.actor;
    }

    public void setActor(Person actor){
        this.actor = actor;
    }

    public Person getPerson(){
        return this.person;
    }


    public Person getObject(){
        return this.person;
    }

    public void setObject(Person person){
        this.person = person;
    }

    public String toString(){
        String output = actor.getPreferredUsername() + " Adds a Unfollow activity to Oubox \n";
        output += "=> URI : " + URI + "\n";
        output += "=> Summary : " + summary + "\n";
        output += "=> Actor : " + actor.getURI() + "\n";
        output += "=> Person : " + person.getURI() + "\n";
        return output;
    }

}

class Create implements Activity{

    public static int objectNumber = 0;
    public final String URI; 
    public String summary;
    public Person actor;
    public StreamObject object;

    Create(Person actor, StreamObject object){
        objectNumber += 1;
        this.URI = "https://www.java-soc.com/" + actor.name + "/#Create/" + object.getType() + String.valueOf(objectNumber);
        this.summary = actor.getPreferredUsername() + " Created " + object.getName();
        this.actor = actor;
        this.object = object;
    }

    public String getURI(){
        return this.URI;
    }

    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    
    public Person getActor(){
        return this.actor;
    }

    public void setActor(Person actor){
        this.actor = actor;
    }


    public StreamObject getObject(){
        return this.object;
    }

    public void setObject(StreamObject object){
        this.object = object;
    }

    public String toString(){
        String output = actor.getPreferredUsername() + " Adds Create activity to Oubox:\n";
        output += "=> URI: " + getURI() + "\n";
        output += "=> Type: " + object.getType()+ "\n";
        output += "=> Audience: " + object.getAudience() + "\n";
        output += "=> Amount of Likes: " + object.getLikes().size() + "\n";
        output += "=> Amount of Shares: " + object.getShares().size() + "\n";
        output += "=> Content: " + object.getContent() + "\n";
        output += "=> Name: " + object.getName() + "\n";
        output += "=> Published: " + object.getPublished() + "\n";
        output += "=> Deleted: " + String.valueOf(object.getDeleted()) + "\n";
        return output;
    }

}

class Delete implements Activity{

    public final String URI;
    public String summary;
    private final Create deleted;

    Delete(Create deleted){
        this.URI = "https://www.java-soc.com/" + deleted.getActor().getPreferredUsername() + "/#Delete/" + deleted.getObject().getType() + String.valueOf(Create.objectNumber);
        this.summary = deleted.getActor().getPreferredUsername() + " Deleted " + deleted.getURI();
        this.deleted = deleted;
        deleted.getObject().setDeletedTrue();
        deleted.getActor().getPosted().remove(deleted);
        deleted.getActor().getDeleted().add(deleted);

    }

    Delete(Create deleted, Like like){
        this.URI = "https://www.java-soc.com/" + deleted.getActor().getPreferredUsername() + "/#Delete/" + deleted.getObject().getType() + String.valueOf(Create.objectNumber);
        this.summary = deleted.getActor().getPreferredUsername() + " Deleted " + deleted.getURI();
        this.deleted = deleted;
        deleted.getObject().setDeletedTrue();
        deleted.getActor().getPosted().remove(deleted);
        deleted.getActor().getDeleted().add(deleted);
        like.getActor().getLiked().remove(like);
    }

    public String getURI(){
        return this.URI;
    }


    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }


    public Create getObject(){
        return this.deleted;
    }

    public String toString(){
        String output = deleted.getActor().getPreferredUsername() + " Adds a Delete activity to Outbox \n";
        output += "=> URI : " + URI + "\n";
        output += "=> Summary : " + summary + "\n";
        output += "=> Actor : " + deleted.getActor().getURI() + "\n";
        output += "=> Person : " + deleted.getURI() + "\n";
        return output;
    }

}


class Person{

    public final String URI;
    protected String name;
    public String preferredUsername;
    public String summary;
    private final myInbox inbox;
    private final myOutbox outbox;
    public final List<Activity> followers;
    public final List<Activity> following;
    public final List<Activity> liked;
    public final List<Activity> posted;
    private final List<Activity> deleted; //To DO make sure it can only hold 10

    Person(String name, String preferredUsername, String summary,
    myInbox inbox, myOutbox outbox){
        this.URI = "https://www.java-soc.com/" + preferredUsername + "/";
        this.name = name;
        this.preferredUsername = preferredUsername;
        this.summary = summary;
        this.inbox = inbox;
        this.outbox = outbox;
        this.followers = new ArrayList<Activity>();
        this.following = new ArrayList<Activity>();
        this.liked = new ArrayList<Activity>();
        this.posted = new ArrayList<Activity>();
        this.deleted = new ArrayList<Activity>();
    }

    public myInbox getInbox(){
        return this.inbox;
    }


    public myOutbox getOutbox(){
        return this.outbox;
    }


    public List<Activity> getFollowers(){
        return this.followers;
    }


    public List<Activity> getFollowing(){
        return this.following;
    }


    public List<Activity> getLiked(){
        return this.liked;
    }


    public List<Activity> getPosted(){
        return this.posted;
    }


    public List<Activity> getDeleted(){
        return this.deleted;
    }


    public String getPreferredUsername(){
        return this.preferredUsername;
    }


    public void setPreferredUsername(String preferredUsername){
        this.preferredUsername = preferredUsername;
    }


    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }


    public String getSummary(){
        return this.summary;
    }

    public void setSummary(String sumarry){
        this.summary = sumarry;
    }

    public String getURI(){
        return this.URI;
    }


    public String toString(){
        String output = "New Person Added: \n";
        output += "=> URI: " + getURI() + "\n";
        output += "=> Name: " + getName() + "\n";
        return output;
    }
}

class StreamObject {

    public static int index = 0;
    public final String URI;
    public final String type;
    public final Person author;
    public final List<StreamObject> attachment;
    public final List<Person> attributedTo;
    public String audience;
    public final List<Person> likes;
    public final List<Person> shares;
    public String content;
    public String name;
    public final String published;
    private boolean deleted = false;

    StreamObject(String type, String audience, String content, String name, String published, Person author){
        index += 1;
        this.author = author;
        this.URI = "https://www.java-soc.com/" + author.getPreferredUsername()  + "/#Create/" + type + "_" + String.valueOf(StreamObject.index);
        this.type = type;
        this.audience = audience;
        this.content = content;
        this.name = name;
        this.published = published;
        this.attachment = new ArrayList<StreamObject>();
        this.attributedTo = new ArrayList<Person>();
        this.likes = new ArrayList<Person>();
        this.shares = new ArrayList<Person>();
    }

    public String getURI(){
        return this.URI;
    }


    public String getType(){
        return this.type;
    }

    
    public List<StreamObject> getAttachment(){
        return this.attachment;
    }


    public List<Person> getAttributedTo(){
        return this.attributedTo;
    }


    public List<Person> getLikes(){
        return this.likes;
    }


    public List<Person> getShares(){
        return this.shares;
    }


    public boolean getDeleted(){
        return this.deleted;
    }

    public void setDeletedTrue(){
        this.deleted = true;
    }


    public String getAudience(){
        return this.audience;
    }

    public void setAudience(String audience){
        this.audience = audience;
    }


    public String getContent(){
        return this.content;
    }

    public void setContent(String content){
        this.content = content;
    }


    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }


    public String getPublished(){
        return this.published;
    }


    public Person getAuthor(){
        return this.author;
    }
}

public class ClientApp implements App {

    
    myInbox inboxOne = new myInbox();
    myOutbox outboxOne = new myOutbox();


    myInbox inboxTwo = new myInbox();
    myOutbox outboxTwo = new myOutbox();

        
    Person kuba = new Person("Jakub", "dn", "A comsci student", inboxOne, outboxOne);
    Person josh = new Person("Josh", "funnyman", "Yet another comsci student", inboxTwo, outboxTwo);
    //StreamObject like_1 = new StreamObject("shitpost", "GLOBAL", "Yet another unfunny post", );



    public Inbox getInbox(){
        return kuba.getInbox();
    } // retrieves the inbox
    public Outbox getOutbox(){
        return kuba.getOutbox();
    }
    // retrievs the outbox 
    public String demo(){

        System.out.println(kuba);
        System.out.println(josh);

        Create test = new Create(kuba, new StreamObject("FunnyPost", "GLOBAL", "Yet another unfunny post online", "Deez Nuts Joke" , "06/04/2023", kuba));
        System.out.println(test);

        getOutbox().send(test);
        kuba.getPosted().add(getOutbox().deliverNext());

        //kuba.getPosted().add(test);

        Follow follow_1 = new Follow(josh, kuba);

        System.out.println(follow_1);

        josh.getOutbox().send(follow_1);
        josh.getFollowing().add(josh.getOutbox().deliverNext());

        getInbox().receive(josh.getOutbox().deliverNext());
        kuba.getFollowers().add(kuba.getInbox().readNext());
        System.out.println(follow_1.getPerson().getPreferredUsername() + " received " + follow_1.getClass() + " to Inbox \n" + "=> URI: " + follow_1.getURI() + "\n");


        Like like = new Like(josh, test.getObject());

        System.out.println(like);

        josh.getOutbox().send(like);
        josh.getLiked().add(josh.getOutbox().deliverNext());

        //System.out.println(josh.getLiked().size());

        like.getObject().getAuthor().getInbox().receive(like);
        System.out.println(like.getActor().getPreferredUsername() + " received " + like.getClass() + " to Inbox \n" + "=> URI: " + like.getObject().getAuthor().getInbox().readNext().getURI() + "\n");
        //like.getObject().getAuthor().getLiked().add(like.getObject().getAuthor().getInbox().readNext());

        //System.out.println(kuba.getPosted().size());

        Delete testing = new Delete(test, like);
        System.out.println(testing);


        //System.out.println(testing.getObject().getActor().getPreferredUsername() + " received " + testing.getClass() + " to Inbox \n" + "=> URI: " + testing.getURI() + "\n");

        //System.out.println(josh.getLiked().size());

        //System.out.println(josh.getFollowing().size());
        Unfollow unfollow = new Unfollow(follow_1);
        System.out.println(unfollow);

        System.out.println(unfollow.getPerson().getPreferredUsername() + " received " + unfollow.getClass() + " to Inbox \n" + "=> URI: " + unfollow.getURI() + "\n");


        //System.out.println(josh.getFollowing().size());

        //System.out.println(kuba.getPosted().size());

        kuba.getOutbox().send(testing);
        kuba.getOutbox().deliverNext();
        

        return "";
    }

    public static void main(String[] args) {
        
        ClientApp testing = new ClientApp();
        System.out.println(testing.demo());

    }
    
}


