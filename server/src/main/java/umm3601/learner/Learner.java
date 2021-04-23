package umm3601.learner;

import java.util.ArrayList;

import javax.persistence.Id;

import org.mongojack.ObjectId;

import umm3601.contextpack.ContextPack;

public class Learner {

  @Id @ObjectId
  public String _id;

  public String name;
  public ArrayList<ContextPack> assignedContextPacks;
}
