var express = require("express");
var app = express();
var cors = require("cors");
var { knex } = require("./database/database");

exports.knex = knex;
exports.app = app;

var corsOptions = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/routes");
