import express from "express";
import bodyParser from "body-parser";
import {
  filterImageFromURL,
  isValidUrl,
} from "./util/util.js";

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8080;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

app.get("/filteredimage", async (req, res) => {
  const { image_url } = req.query;

  if (!image_url || !isValidUrl(image_url))
    return res
      .status(400)
      .json({errors: ["Image url is invalid, please check again!."]});

  const filePath = await filterImageFromURL(image_url);

  return res.status(200).sendFile(filePath);
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
