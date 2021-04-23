package umm3601.learner;

import java.util.ArrayList;


import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;

import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import umm3601.contextpack.ContextPack;

import static com.mongodb.client.model.Filters.eq;

public class LearnerController {

  private final JacksonMongoCollection<Learner> learnerCollection;
  private final JacksonMongoCollection<ContextPack> contextPackCollection;



  static MongoClient mongoClient;
  static MongoDatabase db;


  public LearnerController(MongoDatabase database){
    learnerCollection = JacksonMongoCollection.builder().build(database, "learners", Learner.class);
    contextPackCollection = JacksonMongoCollection.builder().build(database, "contextpacks", ContextPack.class);
  }

  public void getLearner(Context ctx) {
    String id = ctx.pathParam("id");
    Learner learner;

    try {
      learner = learnerCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested learner id wasn't a legal Mongo Object ID.");
    }
    if (learner == null) {
      throw new NotFoundResponse("The requested learner was not found");
    } else {
      ctx.json(learner);
    }
  }

  public void getLearners(Context ctx){
    ctx.json(learnerCollection.find()
    .into(new ArrayList<>()));
  }

  public void addNewContextPack(Context ctx){
    Learner newLearner = ctx.bodyValidator(Learner.class)
      .check(pack -> pack.name != null )
      .get();

      learnerCollection.insertOne(newLearner);
      ctx.status(201);
      ctx.json(ImmutableMap.of("id", newLearner._id));
  }

  public void addContextPackToLearner(Context ctx){

    String idLearner = ctx.pathParam("id");
    ContextPack ctxPack = ctx.bodyValidator(ContextPack.class).get();

    learnerCollection.updateById(idLearner, Updates.push("assignedContextPacks", ctxPack));

    ctx.status(201);
    ctx.json(ImmutableMap.of("id", learnerCollection.findOneById(idLearner)._id));

  }

}
