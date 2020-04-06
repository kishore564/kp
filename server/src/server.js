const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


//start app 
const port = process.env.PORT || 8005;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

// Upload text file
app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            
            let textFile = req.files.textFile;
            //Read text file data
            let data=textFile.data.toString('utf8');
            
            // Number of words in text file.
            let noOfWords=data.split(" ").length;

            // Number of letters in text file.
            let rxLetters = /[a-z]/gi;
            let noOfLetters = data.match(rxLetters) ? data.match(rxLetters).length:0; 
           
            //Number of symbols in text file.
            let rxSymbols = /[^\w\s]/g;
            let noOfSymbols = data.match(rxSymbols) ? data.match(rxSymbols).length:0; 

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: textFile.name,
                    mimetype: textFile.mimetype,
                    size: textFile.size,
                    noOfWords:noOfWords,
                    noOfSymbols:noOfSymbols
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

