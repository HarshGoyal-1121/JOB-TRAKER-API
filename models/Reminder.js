const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  remindAt: { type: Date, required: true },
  message: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Reminder', reminderSchema);
