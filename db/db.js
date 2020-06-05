const moongose = require("mongoose");

require("dotenv").config();

const db_url = `${process.env.MONGODB_URI}`;

moongose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useFindAndModify: false,
  })
  .then((res) => {
    console.log("You are connected to db Successfully");
  })
  .catch((err) => {
    console.log("Not Connected to DB : " + err);
  });
