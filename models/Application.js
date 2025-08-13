const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  jobLink: { type: String },
  appliedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['applied','interviewed','rejected','offer'], default: 'applied' },
  notes: { type: String },
  resumeLink: { type: String },
  companyDetails: { type: Object }
}, { timestamps: true });
module.exports = mongoose.model('Application', applicationSchema);
