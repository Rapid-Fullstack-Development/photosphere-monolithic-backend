const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.post("/asset", (req, res) => {
    
    const fileName = req.headers["file-name"];
    const localFileName = path.join(__dirname, "../uploads", fileName);
    const fileWriteStream = fs.createWriteStream(localFileName);
    req.pipe(fileWriteStream)
        .on("error", err => {
            console.error(`Error writing ${localFileName}`);
            console.error(err);
            res.sendStatus(500);
        })
        .on("finish", () => {
            console.log(`Done writing ${localFileName}`);
            res.sendStatus(200);
        });    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});