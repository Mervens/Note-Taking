const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

currentID = notes.length;


app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote["id"] = currentID +1;
    currentID++;
    console.log(newNote);
    notes.push(newNote);

    rewriteNotes();
    return res.status(200).end();
});

app.delete("/api/notes/:id", (req, res) => {
    let chosenNoteToDelete = req.params.id;
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        try {
            let noteDel = JSON.parse(data);
        } catch(e) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        for (let i = 0; i < nodeDel.length; i++) {
            if (noteDel[i].id === chosenNoteToDelete) {
                noteDel.splice(i, 1);
                return;
            }
        }

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteDel), (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.send("Successfully deleted");
        });
    });
});


app.use(express.static("public"));



app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

function rewriteNotes() {
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log("error")
            return console.log(err);
        }

        console.log("Success!");
    });
}

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


