const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const company = new Schema(
  {
    _id: {
      type: Number,
      required: true
    },
    name : {
      type: String,
      required: true,
    },
    url : {
      type: String,
      required: true
    },
  },
);

module.exports = mongoose.model("Company",company);
