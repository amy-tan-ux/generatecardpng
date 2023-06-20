var cardsGenerated = 0; // counts the number of cards being generated

function GenerateCards(){
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
        console.log(text);
        console.log(inputValues);
        // Draw individual Cards using CreatePNG
        let header = 1; // header == 1 means the first row is the header
        for (entry of inputValues){
            generateCards(entry);
        }
        // Create download button to download all the images
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
   var canvas = []; // array of all canvas
   var cardCanvas = []; // array of all created canvas

    function drawCard(cardNumber, cardName, cardColour, cardText1, cardText2){

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
        // rows of 5 
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
        cardCanvas.reset();

    }

    let details = cardDetails.split(",");
    let qnty = details[5];
    // cardValue = details[0]; cardName = details[1]; cardColour = details[2]; cardText1 = details[3]; cardText2 = details[4]; qnty = details[5];

    if (qnty){
        for (let i=0; i < qnty; i++){
            drawCard(details[0], details[1], details[2], details[3], details[4]);               
            cardsGenerated +=1;
    
        }
    }
    else{
        drawCard(details[0], details[1], details[2], details[3], details[4]);               
        cardsGenerated +=1;

    }}

// Save all canvas