describe('Testing the Upload POST API', function () {
     
  it('Receives valid FormData and processes the information correctly', function () {

      //Declarations
      const fileName = 'textFile.txt';
      const method = 'POST';
      const fileType = 'text/plain';
      const url = 'http://localhost:8005/upload';      
      const expectedAnswer = '{"status":true,"message":"File is uploaded","data":{"name":"textFile.txt","noOfWords":34,"noOfLetters":158,"noOfSymbols":2,"topWords":"pickled,Peter,Piper","topLetters":"e,p,r"}}';

      // Get file from fixtures as binary
      cy.fixture(fileName, 'binary').then( (txtFile) => {

          // File in binary format gets converted to blob so it can be sent as Form data
          Cypress.Blob.binaryStringToBlob(txtFile, fileType).then((blob) => {

              // Build up the form
              const formData = new FormData();
              formData.set('textFile', blob, fileName); //adding a file to the form             
              
              // Perform the request
              cy.form_request(method, url, formData, function (response) {
                  expect(response.status).to.eq(200);
                  expect(expectedAnswer).to.eq(response.response);
              });
              
          })
          
      })
      
  })

  it('Receives error for invalid FormData', function () {

    //Declarations
    const fileName = 'textFile.txt';
    const method = 'POST';
    const fileType = 'text/plain';
    const url = 'http://localhost:8005/upload';      
    const expectedAnswer = '{"status":true,"message":"File is uploaded","data":{"name":"textFile.txt","noOfWords":31,"noOfLetters":158,"noOfSymbols":2,"topWords":"pickled,Peter,Piper","topLetters":"e,p,r"}}';

    // Get file from fixtures as binary
    cy.fixture(fileName, 'binary').then( (txtFile) => {

        // File in binary format gets converted to blob so it can be sent as Form data
        Cypress.Blob.binaryStringToBlob(txtFile, fileType).then((blob) => {

            // Build up the form
            const formData = new FormData();
            formData.set('File', blob, fileName); //adding a file to the form             
            
            // Perform the request
            cy.form_request(method, url, formData, function (response) {
                expect(response.status).to.eq(500);
            });
            
        })
        
    })
    
})


})

