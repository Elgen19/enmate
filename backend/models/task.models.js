const mongoose = require('mongoose');

const inmateDutiesTransactionSchema = new mongoose.Schema({
  inmate_ID: { type: Number, required: true,  unique: true},
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  sex: { type: String },
  age: { type: Number },
  cell: { type: String },
  task_start_date: { type: Date },
  task_end_date: { type: Date },
  task_assigned: { type: String },
  task_area: { type: String },
  time_start: { type: String },
  time_end: { type: String },
  supervising_officer: { type: String },
});

const InmateDutiesTransaction = mongoose.model('task', inmateDutiesTransactionSchema);

module.exports = InmateDutiesTransaction;
