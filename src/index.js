import express from "express";
const app = express();
const port = 3001;
import fs from "fs";
import fetch from "node-fetch";

// importing paths
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let i = 0;

const fileWrite = (obj, location) => {
    fs.writeFile(location, JSON.stringify(obj, null, 2), (err) => {
        if (err) {
            console.log(err);
        } else {
            i++;
            console.log(i + ", ");
        }
    });
};

function reddit(url, location) {
    fetch(url)
        .then((res) => res.json())
        .then((jsonData) => {
            const jsonFile = jsonData;
            let memeArray = [];
            for (let i = 0; i < jsonFile.data.children.length; i++) {
                let memeObj = {
                    "title": `${jsonFile.data.children[i].data.title}`,
                    "link": `${jsonFile.data.children[i].data.url_overridden_by_dest}`,
                };
                memeArray.push(memeObj);
            }
            fileWrite(memeArray, location);
        });
}

setInterval(reddit, 5000, "https://www.reddit.com/r/memes.json", "memes.json");
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/dankmemes.json",
    "dankmemes.json"
);

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/" + "memes.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/dank", (req, res) => {
    fs.readFile(__dirname + "/" + "dankmemes.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
