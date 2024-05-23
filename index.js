// Importing the Express module
import express from "express";

// Importing the filesystem module
import fs from "fs";

// Importing functions to handle file and directory paths
import { fileURLToPath } from "url";
import path from "path";

// Creating an instance of an Express application
const app = express();

// Defining the port number on which the server will listen
const port = 3000;

// Determining the filename and directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting up middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Setting up middleware to parse JSON request bodies
app.use(express.json());

// Middleware function to check working hours
function checkWorkingHours(req, res, next) {
  const currentDateTime = new Date();
  const day = currentDateTime.getDay();
  const hour = currentDateTime.getHours();

  // Check if it's Monday to Friday
  if (day >= 1 && day <= 5) {
    // Check if it's between 9 AM and 5 PM
    if (hour >= 9 && hour < 17) {
      return next(); // Continue to the next middleware or route handler
    }
  }
  // Reading the workinghours.html file from the "public" directory synchronously
  const workingHours = fs.readFileSync("./public/workinghours.html");

  // Setting the response status to 200 (OK)
  res.status(200);

  // Sending the content of the homePage.html file as the response
  res.send(`${workingHours}`);
}

// Apply the middleware to all routes
app.use(checkWorkingHours);

// Handling GET requests to the root URL "/"
app.get("/", (req, res) => {
  // Reading the homePage.html file from the "public" directory synchronously
  const homePage = fs.readFileSync("./public/homePage.html");

  // Setting the response status to 200 (OK)
  res.status(200);

  // Sending the content of the homePage.html file as the response
  res.send(`${homePage}`);
});

// Handling GET requests to the "/services" URL
app.get("/services", (req, res) => {
  // Reading the ourServices.html file from the "public" directory synchronously
  const services = fs.readFileSync("./public/ourServices.html");

  // Setting the response status to 200 (OK)
  res.status(200);

  // Sending the content of the ourServices.html file as the response
  res.send(`${services}`);
});

// Handling GET requests to the "/contact" URL
app.get("/contact", (req, res) => {
  // Reading the contactUs.html file from the "public" directory synchronously
  const homePage = fs.readFileSync("./public/contactUs.html");

  // Setting the response status to 200 (OK)
  res.status(200);

  // Sending the content of the contactUs.html file as the response
  res.send(`${homePage}`);
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
