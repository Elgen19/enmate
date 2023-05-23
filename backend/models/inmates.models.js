const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inmateSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  marital_status: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
    street:{
      type: String,
      required: true
    },
    baranggay:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    province:{
      type: String,
      required: true
    },
  
  height:{
    type: Number,
    required: true
  },
  weight:{
    type: Number,
    required: true
  },
  eye_color:{
    type: String,
    required: true
  },
  hair_color:{
    type: String,
    required: true
  },
  distinctive_features:{
    type: String,
    required: false
  },
  booking_number:{
    type: Number,
    required: true,
    unique: true
  },
  arrest_date:{
    type: Date,
    required: true
  },
  arresting_officer:{
    type: String,
    required: true
  },
  location_arrested:{
    type: String,
    required: true
  },
  reason_arrested:{
    type: String,
    required: true
  },
  incident_details:{
    type: String,
    required: true
  },
  holding_unit:{
    type: String,
    required: true
  },
  cell:{
    type: String,
    required: true
  },
  detention_status:{
    type: String,
    required: true
  },
  bail_amount:{
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

const InmateRec = mongoose.model('inmate', inmateSchema);

module.exports = InmateRec;
