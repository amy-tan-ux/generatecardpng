var cardsGenerated = 1; // counts the number of cards being generated
var generatedCards = []; // stores the images generated [[name, png]]
var zip;

function GenerateCards(){
    // Clear and Initialize
    cardsGenerated = 1;
    generatedCards = [];
    document.getElementById("cardsShowcase").innerHTML ="";
    document.getElementById("sideButtons").style.display = "block";
    zip = new JSZip();
    // Generate all the Cards onto Webpage using HTML Canvas
    var inputFile = document.getElementById("fileInput");
    var processedInput = inputFile.files[0];
    var inputValues; // the entries from the csv file, assumed to not contain commas (,)
                            // assume first row is the header
                            // TODO: Create a checkbox to ask user if they included the header or not
                            // var cardLocation = {0:} // Map column to the right row
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        inputValues = text.toString().split("\r\n");
        for (entry of inputValues){
            generateCards(entry);
        }
     };
    reader.readAsText(processedInput);
                            // Default Values
                            /*  Generate Number Visuals == True
                                Qnty == 1 */
                            // TODO: Create a checkbox to ask for user input on Generating Number Visuals 

}

//Generate individual HTML Canvas
function generateCards(cardDetails){
    // cardDetails is one row of entry where columns the individual details separated by commas
    /* Example cardDetails :
        1) Card Number
        2) Card Name
        3) Card Colour
        4) Text Blob 1
        5) Text Blob 2
        6) Qnty (Maybe)
    */
    function drawCard(cardNumber, cardName, cardColour, cardText1, cardText2, cardsGenerationCount){

        var canvas = document.getElementById("canvasID");
        var cardCanvas = canvas.getContext("2d");
        // initialized canvas by canvasID
        cardCanvas.font = "20px Arial";
        cardCanvas.fillText(cardNumber.toString(), 25, 40);
        cardCanvas.fillText(cardNumber.toString(), 100, 150);
        cardCanvas.font ="10px Arial";
        cardCanvas.fillText(cardName, 45, 40);
        cardCanvas.fillText(cardText1, 25, 180);
        cardCanvas.fillText(cardText2, 25, 210);
        // generate number visualization (rows of 5 )
                            // TO-DO: Update UI
                            // TO-DO: generate in recognizable formats (like dice)
                            // TO-DO: limit value to under 10
        for (let i=0; i < cardNumber; i++){
            cardCanvas.beginPath();
            cardCanvas.arc(30 + (30 * (i%5)),
                            60 + (30 * Math.floor(i/5)),
                            10,0,2*Math.PI);
            cardCanvas.fillStyle = cardColour;
            cardCanvas.fill();
            cardCanvas.stroke();
            cardCanvas.closePath();
        }
        cardCanvas.strokeStyle= cardColour;
        cardCanvas.lineWidth = 8;
        cardCanvas.beginPath();
        cardCanvas.roundRect(10, 10, 195, 315, [20]);
        cardCanvas.stroke();
        cardCanvas.closePath();
        // generate png and add to html page
        var dataURL = canvas.toDataURL("image/png");
        document.getElementById("cardsShowcase").innerHTML += "<img src='" + dataURL + "'  width='216' height='336' alt='from canvas'/>";
        canvas.toBlob(function (blob) {
            zip.file(cardsGenerationCount.toString() + "_" + cardColour + "_" + cardName + ".png", blob);
          });
        cardCanvas.reset();

    }

    let details = cardDetails.split(",");
    let qnty = details[5];
    // cardValue = details[0]; cardName = details[1]; cardColour = details[2]; cardText1 = details[3]; cardText2 = details[4]; qnty = details[5];

    if (qnty){
        for (let i=0; i < qnty; i++){
            drawCard(details[0], details[1], details[2], details[3], details[4], cardsGenerated);               
            cardsGenerated +=1;
        }
    }
    else{
        drawCard(details[0], details[1], details[2], details[3], details[4], cardsGenerated);               
        cardsGenerated +=1;
    }}

function DownloadGeneratedCards(){
    // Download Zip File of Cards
    zip.generateAsync({type:"blob"})
    .then(function(zip) {
    saveAs(zip, "CreatedCardsDownload.zip");
  });
    

}