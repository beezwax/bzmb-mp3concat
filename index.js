const concat = require("./concat.js");

const concatSchema = {
  body: {
    type: "object",
    required: ["files"],
    properties: {
      files: { type: "array", minLength: 1 }
    },
  },
};

async function bzmbmp3concat(fastify, options) {
  fastify.post("/bzmb-mp3concat", { schema: concatSchema }, async (req, res) => {
    const { files } = req.body;
    try {
      const base64Mp3 = await concat(files);
      res
        .code(200)
        .send(base64Mp3);
    } catch (error) {
      res
        .code(500)
        .send(error);
    }
  });
};

module.exports = { microbond: bzmbmp3concat };