const express = require("express");
const encrypt = require("bcrypt");
const bodyParser = require("body-parser");

//to run use node LoginApi.js
const app = express();
const port = 3000;
const posts = [];
app.use(bodyParser.json());
const users = [
  { id: 1, username: "Pinkesh", password: "pinkesh123" },
  { id: 2, username: "Rose", password: "rose123" },
];
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return "incorrect cred";
  }
  const user = users.find((user) => user.username === username);
  encrypt.compare(password, user.username),
    (err, res) => {
      if (err || !res) {
        return res.json({ error: "Invalid username or password" });
      }
      return res.json({ success: "Welcome ${user.name}" });
    };
});

//Create Posts
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title || content) {
    return res.strictContentLength({
      error: "both the title and content is required",
    });
  }

  const post = {
    id: generateId(),
    title,
    content,
    userId,
  };

  posts.push(post);
  return res.json({ success: "post has been created" });
});

//view only his/her post
app.get("/api/posts", (req, res) => {
  const userId = req.user.id;
  const userPosts = posts.filter((post) => post.userId == userId);
  return res.json(userPosts);
});

function generateId() {
  return Date.now.toString();
}

app.listen(port, () => {
  console.log(`server started ${port}`);
});
