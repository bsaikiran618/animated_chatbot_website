const message = require("../models/message");
const user = require("../models/user");

const expiryChecker = (req, res, next) => {
  const { userID } = req.body;

  user
    .findById(userID)
    .then((doc) => {
      const expiryDate = new Date(doc.validTill);
      const currentDate = new Date();

      if (currentDate <= expiryDate) {
        next();
      } else {
        //delete the user and their messages.
        user
          .findByIdAndDelete(userID)
          .then((ok) => {
            console.log("deleted user.");
            message
              .deleteMany({ userID: userID })
              .then((ok) => {
                res.json({ errorMessage: "session expired" });
                console.log("deleted user ", userID, " messages");
              })
              .catch((err) => {
                console.log("error deleting user ", userID, " messages");
              });
          })
          .catch((err) => {
            console.log("error deleting user ", userID);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ errorMessage: "User not found!" });
    });
};

module.exports = expiryChecker;
