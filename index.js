var express = require('express');
var app = express();
app.use(express.static('public'));  //tell Express that we'll keep files in the /public directory
app.set('view engine', 'ejs');

var questions = {
  'coronado-bridge':{
    question: "Who was the first person to ever drive over the Coronado bridge?",
    image: "http://media.salon.com/2015/12/ronald_reagan6-620x412.jpg",
    answer: "Ronald Reagan",
    next: "/trivia/answer/hotel-del"
  },
  'hotel-del':{
    question: "What is the largest wooden structure in the United States?  (Hint, its located in San Diego)",
    image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1470000220/hotel-del-coronado-san-diego-sd0716.jpg?itok=Hw8-LHy7",
    answer: "Hotel Del Coronado",
    next: "/trivia/answer/san-diego-county-fair"
  },
  'san-diego-county-fair':{
    question: "What was the original name of the San Diego County Fair?",
    image: "https://photos.smugmug.com/Del-Mar-Landscape-Photography/i-9xRfW6h/0/9d1ac48f/L/FairAerialSunset20x40-L.jpg",
    answer: "Del Mar Fair",
    next: "/trivia/answer/mission-bay"
  },
  'mission-bay':{
    question: "How many visitors come to Mission Bay Park every year?",
    image: "https://thumbs.gfycat.com/CandidAngelicHarrier-poster.jpg",
    answer: "More than 5 million",
    next: "/trivia/answer/la-jolla-playhouse"
  },
  'la-jolla-playhouse':{
    question: "What famous actor founded the La Jolla Playhouse?",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Gregory_Peck_1948.jpg",
    answer: "Gregory Peck",
  }
};

//tell Express that well keep files in the /public directory
//recognize this is a middleware function - as are all things in express
app.use(express.static('public'));

// see ejs templating site http://www.embeddedjs.com
// ejs uses erb-like <%= %> tags to execute js code
app.set('view engine', 'ejs');

// just like yesterday, our router at work taking in a requested address and mapping it to the appropriate response
// ... but in this case the respose is a page, not simple text
//notice the change from "send" to "render"
// app.get('/', function (request, response) {
//     response.render('index');
// });

app.get('/', function (request, response) {
  response.render('index', {'questions': questions});
});

// app.get('/hello/:text', function (request, response) {
//     var text = request.params['text'];
//     response.send('Hello ' + text);
// });

app.get('/trivia/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  response.render('trivia-question', {'question': triviaQuestion.question, 'answerkey': questionKey});
});

app.get('/trivia/answer/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  var image = request.params.image;
  var next = request.params.next;
  response.render('trivia-answer', {'question': triviaQuestion.question, 'image': triviaQuestion.image, 'answer': triviaQuestion.answer, 'next': triviaQuestion.next});
});




// extra notes: Express knew to automatically look in the /views directory for our template. Notice that we left off the file extension. Express knows what type of file we are looking for because we declared EJS as our template engine above.

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
