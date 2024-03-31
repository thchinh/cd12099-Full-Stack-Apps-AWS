import axios from "axios";
import fs from "fs";
import Jimp from "jimp";
import { URL } from "url";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function filterImageFromURL(inputURL) {
  const outPath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
  return new Promise(async (resolve, reject) => {
    try {
      const { data: imageBuffer } = await axios({
        method: "get",
        url: inputURL,
        responseType: "arraybuffer",
      });

      const photo = await Jimp.read(imageBuffer);
      photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outPath, (img) => {
          resolve(__dirname + outPath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

export const isValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};
