const Application = require('../models/Application');
const fetchCompany = require('../utils/fetchCompany');

const createApplication = async (req, res) => {
  try {
    const { position, company, jobLink, appliedDate, notes, resumeLink } = req.body;
    const data = { user: req.user._id, position, company, jobLink, appliedDate, notes, resumeLink };
    try {
      const details = await fetchCompany(company, jobLink);
      if (details) data.companyDetails = details;
    } catch (err) {
      console.warn('Company fetch failed', err.message);
    }
    const app = await Application.create(data);
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user._id }).sort('-createdAt');
    res.json(apps);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getApplication = async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, user: req.user._id });
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateApplication = async (req, res) => {
  try {
    const app = await Application.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json(app);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createApplication, getApplications, getApplication, updateApplication, deleteApplication };
