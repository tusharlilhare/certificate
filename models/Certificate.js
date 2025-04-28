// const mongoose = require('mongoose');

// const certificateSchema = new mongoose.Schema({
//   name: String,
//   course: String,
//   issueDate: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Certificate', certificateSchema);



// // models/Certificate.js
// const mongoose = require('mongoose');

// const certificateSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   course: String,
//   branch: String,
//   year: Number
// });

// module.exports = mongoose.model('Certificate', certificateSchema);














// const mongoose = require('mongoose');

// const certificateSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   course: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Certificate = mongoose.model('Certificate', certificateSchema);

// module.exports = Certificate;




const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
