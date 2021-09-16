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
                    "file": `${jsonFile.data.children[i].data.url}`,
                    "link": `https://www.reddit.com${jsonFile.data.children[i].data.permalink}`,
                    "isVideo": `${jsonFile.data.children[i].data.is_video}`,
                };
                memeArray.push(memeObj);
            }
            fileWrite(memeArray, location);
        });
}

setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/memes.json",
    `${__dirname}/memes.json`
);
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/dankmemes.json",
    `${__dirname}/dankmemes.json`
);
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/memes/new.json",
    `${__dirname}/newmemes.json`
);
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/holup.json",
    `${__dirname}/holup.json`
);
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/holup/new.json",
    `${__dirname}/holupnew.json`
);
setInterval(
    reddit,
    5000,
    "https://www.reddit.com/r/dankmemes/new.json",
    `${__dirname}/danknew.json`
);

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/" + "memes.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/danknew", (req, res) => {
    fs.readFile(__dirname + "/" + "danknew.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/holupnew", (req, res) => {
    fs.readFile(__dirname + "/" + "holupnew.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/dank", (req, res) => {
    fs.readFile(__dirname + "/" + "dankmemes.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/new", (req, res) => {
    fs.readFile(__dirname + "/" + "newmemes.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.get("/holup", (req, res) => {
    fs.readFile(__dirname + "/" + "holup.json", "utf8", (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
