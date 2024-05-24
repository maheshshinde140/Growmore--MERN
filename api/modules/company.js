const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  invest: { type: Number, required: true },
  cmpprofit: { type: Number, required: true }
});

module.exports = mongoose.model('Company', CompanySchema);
