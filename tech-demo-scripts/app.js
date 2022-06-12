const express = require('express');
const app = express();
require("dotenv").config({ path: ".env" });
const Storage = require('web3.storage');
const { Web3Storage, getFilesFromPath, File } = Storage;
const ffmpeg = require('ffmpeg');
const video = require('ffmpeg/lib/video');
const port = 8080
const path = './output.mp4'

const getFiles = async (path) => {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}

const getAccessToken = () => {
  return process.env.WEB3STORAGE_TOKEN
}

const makeStorageClient = () => {
  return new Web3Storage({ token: getAccessToken() })
}

const storeFiles = async (files) => {
  const client = await makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

app.get('/', async (req, res) => {
  let tOld = new Date().getTime();
  try {
    let process = new ffmpeg('./302.mp4');
    process.then(async (video) => {
      let watermarkPath = './DeSchool.png';
      let settings = {
        position: "SE" // Position: NE NC NW SE SC SW C CE CW 
        , margin_nord: null // Margin nord 
        , margin_sud: null // Margin sud 
        , margin_east: null // Margin east 
        , margin_west: null // Margin west 
      };
      let callback = function (error, files) {
        if (error) {
          console.log('ERROR: ', error);
        }
        else {
          console.log('TERMINOU', files);
        }
      }
      //add watermark 
      await video.fnAddWatermark(watermarkPath, path, settings, callback)
    });
  } catch (e) {
    console.log("e", JSON.stringify(e));
    res.send({
      "success": false,
      "message": e
    })
  }
  try {
    let files = await getFiles(path);
    console.log("files", JSON.stringify(files));
    let cid = await storeFiles(files);
    let time = new Date().getTime() - tOld;
    res.send({
      "success": true,
      "cid": cid,
      "time": time
    })
  } catch (e) {
    console.log("e", JSON.stringify(e));
    res.send({
      "success": false,
      "message": e
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})