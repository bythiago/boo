var { app } = require("../index");
const { body, validationResult } = require("express-validator");
const {
  all,
  find,
  store,
  del,
  update,
} = require("../repositories/mountainsRepository");

app.get("/", function (req, res) {
  all(req, res);
});

app.get("/:slug", function (req, res) {
  find(req, res);
});

app.post(
  "/",
  body("title").not().isEmpty().trim().escape(),
  body("description").isLength({ min: 5 }),
  body("height").isLength({ min: 5 }),
  body("countries").isLength({ min: 5 }),
  body("continent").isLength({ min: 5 }),
  body("image").isLength({ min: 5 }),
  body("dir").isLength({ min: 5 }),
  body("path").isLength({ min: 5 }),
  body("slug").isLength({ min: 5 }),
  body("updatedAt").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    store(req, res);
  }
);

app.delete("/:slug", function (req, res) {
  del(req, res);
});

app.put("/:slug", function (req, res) {
  update(req, res);
});

app.listen(3000, function () {
  console.log("listening on port http://localhost:3000");
});
