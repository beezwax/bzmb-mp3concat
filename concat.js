const audioconcat = require('audioconcat');
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

process.env.FFMPEG_PATH = "/opt/homebrew/bin/ffmpeg";

const concat = async (files) => {
  // Create temp directory
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mp3s-"));
  console.log(tempDir);

  // write files to temp directory
  const filePaths = files.map(file => {
    const filePath = path.join(tempDir, `${crypto.randomBytes(16).toString("hex")}.mp3`);
    fs.writeFileSync(filePath, file, {encoding: 'base64'});
    return filePath;
  });

  const combinedPath = path.join(tempDir, "combined.mp3");

  const audioPromise = new Promise(async (resolve, error) => {
    audioconcat(filePaths)
      .concat(combinedPath)
      .on('start', function(command) {
        console.log('ffmpeg process started:', command);
      })
      .on('error', function(err, stdout, stderr) {
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
        error(err);
      })
      .on('end', function(output) {
        const base64 = fs.readFileSync(combinedPath, {encoding: 'base64'});
        // fs.rmSync(tempDir, { recursive: true });
        resolve(base64);
      });
  });

  const base64 = await audioPromise;
  if(tempDir) {
    fs.rmSync(tempDir, { recursive: true });
  }
  return base64;
}

module.exports = concat;