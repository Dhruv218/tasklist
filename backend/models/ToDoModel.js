const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
  },
  Priority: {
    type: String,
  },
});

module.exports = mongoose.model("ToDo", toDoSchema);
