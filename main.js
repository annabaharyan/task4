import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.redirect("./index.html");
});
app.get("/answer", async (request, response) => {
  const question = request.query.question;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    response.send(completion.data.choices[0].message.content);
  } catch (error) {
    response.send(error.message);
  }
});

app.listen(port);
