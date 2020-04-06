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


function getTopWords(data, cutOff) {
    // Replace . with empty String
    let cleanData = data.replace(/[\.]/gm,""),        
     words = cleanData.split(' '),
     frequencies = {},
     word, i;
    // Build map with words and their frequencies 
    for( i=0; i<words.length; i++ ) {
      word = words[i];
      frequencies[word] = frequencies[word] || 0;
      frequencies[word]++;
    }
    words = Object.keys( frequencies );
    // Return top cutOff=3 common words 
    return words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,cutOff).toString();
  }
  

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
            let rxLetters = /[a-z]/gmi;
            let noOfLetters = data.match(rxLetters) ? data.match(rxLetters).length:0; 
           
            //Number of symbols in text file.
            let rxSymbols = /[^\w\s]/gm;
            let noOfSymbols = data.match(rxSymbols) ? data.match(rxSymbols).length:0; 

            //Top three most common words             
            let topWords = getTopWords( data, 3);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: textFile.name,                    
                    noOfWords:noOfWords,
                    noOfSymbols:noOfSymbols,
                    topWords:topWords
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

