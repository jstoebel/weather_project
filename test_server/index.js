const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

// middleware
app.use(morgan('dev'))
app.use(fileUpload());

app.get('/', function(req, res) {
  res.send('hello from root!')
})

app.post('/upload', function(req, res) {

  console.log(req.params);

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  Object.keys(req.files).forEach(function(key) {
    var file = req.files[key]

    file.mv(`./uploads/${file.name}`, function(err){
      if (err) {
        console.warn("PROBLEM WITH UPLOAD");
        console.warn(err);
      }
    })
  })

  res.json({status: "files uploaded!"})
  // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // let sampleFile = req.files.sampleFile;
  // 
  // // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv('./uploads/from_phone.jpg', function(err) {
  //   if (err)
  //     return res.status(500).send(err);
  // 
  //   res.send('File uploaded!');
  // });
});


app.listen(3000, function () {
  console.log('test server listening on port 3000...')
})
