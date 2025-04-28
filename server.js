// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Certificate = require('./models/Certificate');
// const path = require('path');
// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     const MONG_URL = "mongodb://localhost:27017/certifiket";  // Ensure MongoDB is running
//     const conn = await mongoose.connect(MONG_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);  // Exit with error if connection fails
//   }
// };

// // Connect to MongoDB
// connectDB();

// // Serve static files from 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Set up EJS as the view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // POST route to generate the certificate
// app.post('/generate', async (req, res) => {
//   const { name, course } = req.body;  // Extract name and course from the form

//   try {
//     const newCert = new Certificate({ name, course });
//     await newCert.save();  // Save the certificate in MongoDB
//     res.render('certificate', { data: newCert });  // Render certificate view with data
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating certificate' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });










// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const bodyParser = require('body-parser');
// const Certificate = require('./models/Certificate');

// const app = express();
// const PORT = 3000;

// // ✅ MongoDB connection
// mongoose.connect('mongodb://localhost:27017/certificatesDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('✅ Connected to MongoDB');
// }).catch((err) => {
//   console.error('❌ MongoDB connection failed:', err);
// });

// // ✅ Middleware
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, '..', 'public')));
// // app.set('view engine', 'ejs');



// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// // ✅ Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

// app.post('/submit', async (req, res) => {
//   const { name, course } = req.body;

//   try {
//     const newCertificate = new Certificate({ name, course });
//     await newCertificate.save();
//     res.send('✅ Certificate saved successfully!');
//   } catch (err) {
//     console.error('❌ Error saving certificate:', err);
//     res.status(500).send('🚨 Server Error');
//   }
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });








const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Certificate = require('./models/Certificate');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    const MONG_URL = 'mongodb://localhost:27017/certifiket';
    const conn = await mongoose.connect(MONG_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ ONLY ONE /generate route — case-insensitive & trimmed match
app.post('/generate', async (req, res) => {
  const { name, course } = req.body;

  try {
    const nameTrimmed = name.trim();
    const courseTrimmed = course.trim();

    const user = await Certificate.findOne({
      name: { $regex: new RegExp("^" + nameTrimmed + "$", "i") },
      course: { $regex: new RegExp("^" + courseTrimmed + "$", "i") }
    });

    if (!user) {
      return res.status(404).render('notfound', { name, course });
    }

    res.render('certificate', { data: user });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
