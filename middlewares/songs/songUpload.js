const { uploadFileMiddleware } = require("../../config/uploadConfig");
const { success } = require("../../utils/responseMessage");
const { insertSong } = require("../../controllers/songController");

const upload = async (req, res, next) => {
  try {
    await uploadFileMiddleware(req, res);
    if (req.file == undefined) {
      return res.status(400).json(failure("Please upload a file."));
    }
    const file_format = req.file.originalname.split(".")[1];
    if (file_format != "mp3") {
      return res.status(500).json(failure("only mp3 format"));
    }
    req.songname = req.file.originalname;
    next();
    // res.status(200).json(success(req.songname));
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(500).json(success("file cant be larger than 2MB!"));
    }
    return res.status(500).json(failure(`Cannot upload this file`));
  }
};

const addSong = async (req, res, next) => {
  const songPath = __basedir + "/public/songs/" + `${req.songname}`;
  const songDuration = req.duration;
  const songName = req.songname;
  const data = { songName, songPath, songDuration };
  try {
    const result = await insertSong({ data });
    return res.status(200).json(success(result));
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
module.exports = { upload, addSong };
