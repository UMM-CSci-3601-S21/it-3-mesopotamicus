package umm3601.learner;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.types.ObjectId;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import umm3601.contextpack.ContextPackControllerSpec;

public class LearnerControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private LearnerController learnerController;

  private ObjectId testID;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(MongoClientSettings.builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    MongoCollection<Document> learnerDocuments = db.getCollection("learners");
    learnerDocuments.drop();
    testID = new ObjectId();
    Document testLearnerID = new Document()
    .append("_id", testID)
    .append("name", "John")
    .append("assignedContextPacks", Arrays.asList("dogId", "catID", "horseID"));

    learnerDocuments.insertOne(testLearnerID);

    learnerController = new LearnerController(db);

  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void getAllLearners() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/learners");
    learnerController.getLearners(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertTrue(JavalinJson.fromJson(result, Learner[].class).length >= 1);

  }

  @Test
  public void addNewLearner(){

    String test = "{"
    + "\"name\": \"Test\","
    + "\"assignedContextPacks\":"
      + "["
      + "]}"
    ;


      mockReq.setBodyContent(test);
      mockReq.setMethod("POST");

      Context ctx = ContextUtil.init(mockReq, mockRes, "api/learners/add");

      learnerController.addNewLearner(ctx);

      assertEquals(201, mockRes.getStatus());

      String result = ctx.resultString();

      System.out.println(result);

    }

  @Test
  public void addNewContextPackID(){

    String newID = "\"newID1234\"";

    String IdTest = testID.toHexString();

    mockReq.setBodyContent(newID);
    mockReq.setMethod("POST");

    System.err.println(IdTest);

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/learners/:id", ImmutableMap.of("id", IdTest));

    learnerController.addContextPackToLearner(ctx);

    assertEquals(201, mockRes.getStatus());




  }

}
