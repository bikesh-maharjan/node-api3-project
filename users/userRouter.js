const express = require("express");
Users = require("./userDb");
Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.status(201).json(req.body);
});

router.post("/:id/posts", validatePost, (req, res) => {
  // do your magic!
  res.status(201).json(req.body);
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(404).json({ message: "users not found" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then((postData) => {
      res.status(200).json(postData);
    })
    .catch((err) => {
      res.status(404).json({ message: "The user id does not exist" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Users.remove(id)
    .then((deletedUser) => {
      res.status(200).json({ message: "the post is deleted" });
    })
    .catch((err) => {
      res.status(404).json({ message: "The user could not be found" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const editedUser = req.body;
  const id = req.params;
  Users.update(id, editedUser)
    .then((es) => {
      res.status(200).json(editedUser);
    })
    .catch((err) => {
      res.status(404).json({ message: "The user by that ID doesn't exist" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  console.log(id);
  let user = {};
  Users.getById(id).then((userData) => {
    user = userData;
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "User id is invalid" });
    }
  });
}

function validateUser(req, res, next) {
  const { id } = req.params.id;
  // do your magic!
  if (req.body === {}) {
    res.status(400).json({ message: "the user data is missing " });
  } else if (!req.body.name) {
    res.status(400).json({ message: "The name field is missiing" });
  } else {
    Users.insert(req.body);
    next();
  }
}

function validatePost(req, res, next) {
  const { id } = req.params;
  // do your magic!
  if (req.body === {}) {
    res.status.json({ message: " The post data is  missing" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "The required text field is missing " });
  } else {
    req.body.user_id = id;
    Posts.insert(req.body);
    next();
  }
}

module.exports = router;
