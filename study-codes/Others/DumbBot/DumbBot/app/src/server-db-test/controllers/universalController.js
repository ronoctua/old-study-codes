const express = require('express');

const Universal = require('../models/Universal');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const universal = await Universal.find();

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/first', async (req, res) => {
  try {
    const universal = await Universal.findOne();

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/last', async (req, res) => {
  try {
    const universal = await Universal.findOne().sort({ createdAt: 'desc' });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/true', async (req, res) => {
  try {
    const universal = await Universal.find({
      name: req.params.target,
      boolean: true,
    });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/true/first', async (req, res) => {
  try {
    const universal = await Universal.findOne({
      name: req.params.target,
      boolean: true,
    });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/true/last', async (req, res) => {
  try {
    const universal = await Universal.findOne({
      name: req.params.target,
      boolean: true,
    }).sort({ createdAt: 'desc' });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/false', async (req, res) => {
  try {
    const universal = await Universal.find({
      name: req.params.target,
      boolean: false,
    });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/false/first', async (req, res) => {
  try {
    const universal = await Universal.findOne({
      name: req.params.target,
      boolean: false,
    });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/false/last', async (req, res) => {
  try {
    const universal = await Universal.findOne({
      name: req.params.target,
      boolean: false,
    }).sort({ createdAt: 'desc' });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/first', async (req, res) => {
  try {
    const universal = await Universal.findOne({ name: req.params.target });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target/last', async (req, res) => {
  try {
    const universal = await Universal.findOne({
      name: req.params.target,
    }).sort({ createdAt: 'desc' });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/id/:targetId', async (req, res) => {
  try {
    const universal = await Universal.findById(req.params.targetId);

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.get('/get/:target', async (req, res) => {
  try {
    const universal = await Universal.find({ name: req.params.target });

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not get data from database.' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const universal = await Universal.create(req.body);

    return res.send({ universal });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not add to the database.' });
  }
});

router.post('/update/:targetId', async (req, res) => {
  try {
    let newData = req.body;
    let dateNow = new Date();

    dateNow.toISOString();
    newData.lastActiveAt = dateNow;

    await Universal.findByIdAndUpdate(req.params.targetId, newData);

    return res.send({ updated: true });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not update to the database.' });
  }
});

router.delete('/del/:targetId', async (req, res) => {
  try {
    await Universal.findByIdAndDelete(req.params.targetId);
    return res.send({ deleted: true });
  } catch (err) {
    return res
      .status(400)
      .send({ error: '>>> Could not remove the data from database.' });
  }
});

module.exports = (app) => app.use('/db', router);
