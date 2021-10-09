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

    writeNewNote();
    return res.status(200).end();
});

app.delete("/api/notes/:id", function (req, res) {
    const requestID = req.params.id;
    console.log(requestID);

    let note = notes.filter(note => {
        return note.id === requestID;
    })[0];

    console.log(note);
    const index = notes.indexOf(note);

    notesData.splice(index, 1);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf8');
    res.json("Note deleted");
});

app.use(express.static("public"));


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

function writeNewNote() {
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


