import {readFileSync, writeFileSync} from "fs";
import {join} from "path";

export const readFile = (fileName) => {
  try {
    const data = JSON.parse(readFileSync(join(process.cwd(), "src", "models", fileName)));
    return data;
  } catch (err) {
    console.log(`Error while reading a file: ${err.message}`)
  }
}

export const writeFile = (fileName, payload) => {
  try {
    writeFileSync(join(process.cwd(), "src", "models", fileName), JSON.stringify(payload, null, 4))
  } catch (err) {
    console.log(`Error while writing a file: ${err.message}`)
  }
}