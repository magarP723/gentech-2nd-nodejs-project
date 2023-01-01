var mp3Duration = require("mp3-duration");
const { failure, success } = require("../../utils/responseMessage");

const getDuration = async (req, res, next) => {
  const songname = req.songname;
  await mp3Duration(
    __basedir + "/public/songs/" + songname,
    (err, duration) => {
      if (!err) {
        req.duration = Math.trunc(duration);
        return next();
      }
      return res.status(500).json(failure("Upload Error"));
    }
  );
};
module.exports = { getDuration };
