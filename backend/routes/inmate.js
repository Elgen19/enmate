const router = require('express').Router();
const InmateRec = require('../models/inmates.models');

router.route('/').get((req, res) => {
  InmateRec.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create-inmate-record').post((req, res) => {
  const {
    inmate_ID,
    firstname,
    middlename,
    lastname,
    sex,
    nationality,
    marital_status,
    age,
    street,
    baranggay,
    city,
    province,
    height,
    weight,
    eye_color,
    hair_color,
    distinctive_features,
    arrest_date,
    arresting_officer,
    location_arrested,
    reason_arrested,
    incident_details,
    holding_unit,
    cell,
    detention_status,
    bail_amount
  } = req.body;

  const newInmateRecord = new InmateRec({
    inmate_ID,
    firstname,
    middlename,
    lastname,
    sex,
    nationality,
    marital_status,
    age,
    street,
    baranggay,
    city,
    province,
    height,
    weight,
    eye_color,
    hair_color,
    distinctive_features,
    arrest_date,
    arresting_officer,
    location_arrested,
    reason_arrested,
    incident_details,
    holding_unit,
    cell,
    detention_status,
    bail_amount
  });

  newInmateRecord.save()
    .then(() => res.json('Inmate record added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search').get((req, res) => {
  const inmateID = req.query.inmateID;

  InmateRec.findOne({ inmate_ID: inmateID })
    .then(entry => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).json('No matching inmate found.');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// PUT /inmates/update-inmate-record
// PUT /inmates/update-inmate-record
router.route('/update-inmate-record').put((req, res) => {
  const {
    inmate_ID,
    firstname,
    middlename,
    lastname,
    sex,
    nationality,
    marital_status,
    age,
    street,
    baranggay,
    city,
    province,
    height,
    weight,
    eye_color,
    hair_color,
    distinctive_features,
    arrest_date,
    arresting_officer,
    location_arrested,
    reason_arrested,
    incident_details,
    holding_unit,
    cell,
    detention_status,
    bail_amount
  } = req.body;

  // Find the inmate record to update by the booking number
  InmateRec.findOne({ inmate_ID })
    .then(inmateRecord => {
      if (!inmateRecord) {
        return res.status(404).json('Inmate record not found');
      }

      // Update the inmate record with the new form data
      inmateRecord.firstname = firstname;
      inmateRecord.middlename = middlename;
      inmateRecord.lastname = lastname;
      inmateRecord.sex = sex;
      inmateRecord.nationality = nationality;
      inmateRecord.marital_status = marital_status;
      inmateRecord.age = age;
      inmateRecord.street = street;
      inmateRecord.baranggay = baranggay;
      inmateRecord.city = city;
      inmateRecord.province = province;
      inmateRecord.height = height;
      inmateRecord.weight = weight;
      inmateRecord.eye_color = eye_color;
      inmateRecord.hair_color = hair_color;
      inmateRecord.distinctive_features = distinctive_features;
      inmateRecord.arrest_date = arrest_date;
      inmateRecord.arresting_officer = arresting_officer;
      inmateRecord.location_arrested = location_arrested;
      inmateRecord.reason_arrested = reason_arrested;
      inmateRecord.incident_details = incident_details;
      inmateRecord.holding_unit = holding_unit;
      inmateRecord.cell = cell;
      inmateRecord.detention_status = detention_status;
      inmateRecord.bail_amount = bail_amount;

      // Save the updated inmate record
      inmateRecord.save()
        .then(() => res.json('Inmate record updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
  const inmateID = req.query.inmateID;


  InmateRec.findOneAndDelete({  inmate_ID: inmateID  })
    .then(inmateRecord => {
      if (!inmateRecord) {
        return res.status(404).json('Inmate record not found');
      }

      res.json('Inmate record deleted!');
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
