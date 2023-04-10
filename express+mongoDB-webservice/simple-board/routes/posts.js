const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  if (req.query.write) {
    res.render("posts/edit");
    return;
  }
});

module.exports = router;
