const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  //console.log(req.body.crypto);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

  // var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  // var finalURL = baseURL + crypto + fiat;
    
  var options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs:{
      from: crypto,
      to:fiat,
      amount: amount
    }
  };

  request(/*finalURL*/ options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price/*last*/;
    var currentDate = data.time;

    console.log(price);

    res.write("<p>The current date is " + currentDate + "</p>");

    res.write(
      "<h1>" + amount + crypto + " is worth " + price + fiat + "</h1>"
    );

    res.send();

    //   console.log(body);
    //   console.log(response);
    //   console.log(response.statusCode);
    //   console.log(error);
  });
});

app.listen(5000, function() {
  console.log("Server is running on port 5000.");
});