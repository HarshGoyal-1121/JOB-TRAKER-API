const Reminder = require('../models/Reminder');

const createReminder = async (req, res) => {
  try {
    const { applicationId, remindAt, message } = req.body;
    const rem = await Reminder.create({ user: req.user._id, application: applicationId, remindAt, message });
    res.status(201).json(rem);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getReminders = async (req, res) => {
  try {
    const rems = await Reminder.find({ user: req.user._id }).populate('application').sort('remindAt');
    res.json(rems);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createReminder, getReminders };
