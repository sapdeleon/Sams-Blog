const express = require("express");

const blogController = require("../controllers/blogController");

const router = express.Router();

// blog routes
router.get("/create", blogController.blog_create_get);
router
  .get("/", blogController.blog_index)
  .post("/", blogController.blog_create_post);
router
  .get("/:id", blogController.blog_details)
  .delete("/:id", blogController.blog_delete);

module.exports = router;
