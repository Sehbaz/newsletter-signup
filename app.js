const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var option = {
    url: "https://us20.api.mailchimp.com/3.0/lists/22b5e9238c",
    method: "POST",
    headers: {
      Authorization: "Basic 23d7bbc205943549ca43cf7361bedea7-us20"
    },
    body: jsonData
  };
  request(option, (error, response, body) => {
    if (error) {
      res.sendfile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendfile(__dirname + "/success.html");
      } else {
        res.sendfile(__dirname + "/failure.html");
      }
    }
  });
});
app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on PORT : 3000");
});
