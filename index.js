const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const config = require("./config/key");

// 회원가입시 필요한 정보를 담아둔 공간
const { User } = require("./models/User");

//body-parser에 옵션을 주는 코드
//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({ extended: true }));
//application.json 을 분석해서 가져올 수 있도록
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world, Hello React"));

app.post("/register", (req, res) => {
  //회원가입시 필요한 정보들을 client 에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
