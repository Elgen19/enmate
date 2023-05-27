const router = require('express').Router();
const InmateDutiesTransaction = require('../models/task.models');
const InmateRec = require('../models/inmates.models');

// Create a new Inmate Duties Transaction
router.post('/inmate-duties/create-duty', async (req, res) => {
  try {
    const inmateDutiesTransaction = new InmateDutiesTransaction(req.body);
    const savedTransaction = await inmateDutiesTransaction.save();
    res.status(201).json(savedTransaction);
    console.log('task assigment successful')
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.route('/search').get((req, res) => {
  const inmateID = req.query.inmateID;

  InmateRec.findOne({ inmate_ID: inmateID })
    .select('inmate_ID firstname middlename lastname sex cell age')
    .then(entry => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).json('No matching inmate found.');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  InmateDutiesTransaction.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
