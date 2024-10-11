const express = require("express");
const app = express();
const multer = require('multer');
const cors = require("cors");
const bodyparser = require('body-parser');
const csvtojson = require("csvtojson");
const { Buffer } = require('node:buffer');
const mongoose = require('mongoose')
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use('/upload', express.raw({ type: 'text/csv', limit: '10mb' }));
const port = 8000;
const db = require('./db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const csvSchema = new mongoose.Schema({}, { strict: false });
const CSVRecord = mongoose.model('CSVRecord', csvSchema);


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  console.log(req.body);
  
  csvtojson()
      .fromString(req.file.buffer.toString('utf-8'))
      .then(async(jsonData) => {
        console.log("data is here", jsonData);
        
        await CSVRecord.insertMany(jsonData);

          res.json(jsonData);
      })
      .catch((err) => {
          res.status(500).send('Error converting CSV to JSON: ' + err.message);
      });
});

app.get('/data', async (req, res) => {
  try {
     const records = await CSVRecord.find({});
     console.log(records);
    //  res.status(200).json(newResult);
     

     const unifiedColumns = new Set();
     const unifiedData = records.map(record => {
      console.log("*********####", record._doc);

        // Object.keys(record).forEach(col => unifiedColumns.add(col));
        // return record;
      
        Object.keys(record._doc).forEach(col => unifiedColumns.add(col));
        return record._doc;
     });

     const result = unifiedData.map(record => {
        const unifiedRecord = {};
        unifiedColumns.forEach(col => {
           unifiedRecord[col] = record[col] || '';
        });
        return unifiedRecord;
     });

     const newResult = result.map((data)=> {
      delete data._id;
      delete data.__v;
      return data;
     })

     res.status(200).json(newResult);
  } catch (error) {
     res.status(500).json({ error: 'Error fetching data from DB' });
  }
});

app.get("/", (req, res)=> {
  res.json({ok: "yes"});
})


app.listen(port, ()=> {
  console.log("server running at port", port);
})






