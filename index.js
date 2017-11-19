const express = require("express");
const axios = require("axios"); 
const app = express();

app.route("/book/:isbn/info").get((req,resp) => {
    axios.get("http://isbndb.com/api/v2/json/9932UQTT/book/" + req.params.isbn)
      .then((response) => {
        let bookData = response.data.data[0];
        let output = "<table>";
        Object.keys(bookData).forEach((element) => {
            output += "<tr><td>" + element + "</td><td>" + bookData[element] + "</td></tr>";
        })
        output += "</table>";
        resp.send(output);
      })
      .catch((err) => {
          resp.send("The ISBN, " + req.params.isbn + " was not found.");
      });
});

const server = app.listen(3000, () => {
    console.info("Server started on port 3000");
})