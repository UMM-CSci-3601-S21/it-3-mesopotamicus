package umm3601.learner;

import java.util.ArrayList;

import javax.persistence.Id;

import org.mongojack.ObjectId;

public class Learner {

  @Id @ObjectId
  public String _id;

  public String name;
  public ArrayList<String> assignedContextPacks;
}
