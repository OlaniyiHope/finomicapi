// const pdfParse = require("pdf-parse");
// const https = require("https");
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// async function extractTextFromPDF(file) {
//   const url = file.location;

//   return new Promise((resolve, reject) => {
//     https
//       .get(url, (res) => {
//         const chunks = [];
//         res.on("data", (chunk) => chunks.push(chunk));
//         res.on("end", async () => {
//           try {
//             const buffer = Buffer.concat(chunks);
//             const data = await pdfParse(buffer);
//             resolve(data.text.slice(0, 3000)); // Limit content sent to OpenAI
//           } catch (err) {
//             reject(err);
//           }
//         });
//       })
//       .on("error", reject);
//   });
// }

// module.exports = { extractTextFromPDF };
const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text.slice(0, 3000); // limit for OpenAI
  } catch (err) {
    console.error("PDF parsing error:", err);
    throw err;
  }
}

module.exports = { extractTextFromPDF };
