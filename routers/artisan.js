const express = require("express");
const { getAllArtisan } = require("../controllers/artisan");
const router = express.Router();

router.get("/", getAllArtisan);

module.exports = router;
