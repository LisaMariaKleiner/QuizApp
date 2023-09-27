let questions = [
    {
        "question": "Wie lautet der Lateinische Fachbegriff des heutigen Haushundes?",
        "answer_1": "Canis familis",
        "answer_2": "Canis lupus familiaris",
        "answer_3": "Lupus familius",
        "answer_4": "Canis lupus",
        "right_answer": 2
    },
    {
        "question": "In welchem Alter sind junge Hunde besonders empfänglich für soziale Eindrücke und Umweltreize?",
        "answer_1": "1. bis 2. Lebenswoche",
        "answer_2": "3. Lebenswoche",
        "answer_3": "4. bis 12. Lebenswoche",
        "answer_4": "4. bis 6. Monat",
        "right_answer": 3
    },
    {
        "question": "§11 des Tierschutzgesetzes verbietet das Züchten mit Tieren, deren Nachkommen gefährdet sind, bestimmte Defekte/Krankheiten zu haben. Was gehört nicht dazu?",
        "answer_1": "Magendrehung",
        "answer_2": "Entropium",
        "answer_3": "Hüftgelenksdysplasie",
        "answer_4": "Ektropium",
        "right_answer": 1
    },
    {
        "question": "In welchem Referenzbereich befindet sich die normale Körpertemperatur eines Hundes?",
        "answer_1": "32 - 35 °",
        "answer_2": "38 - 38,5 °",
        "answer_3": "38 - 39,5 °",
        "answer_4": "39,5 - 41 °",
        "right_answer": 2
    },
    {
        "question": "Was ist eine hypertrophe kardiomyopathie?",
        "answer_1": "Die hypertrophe Kardiomyopathie ist eine meist genetisch bedingte Herzerkrankung, bei der sich die Muskelzellen in der Herzwand vergrössern und der Herzmuskel (Myokard) verdickt.",
        "answer_2": "Es handelt sich um ein langsam fortschreitendes Absterben der langen Rückenmarksbahnen bei großen Hunden.",
        "answer_3": "Eine Schilddrüsenerkrankung, bei der es dem Körper an Schilddrüsenhormonen mangelt.",
        "answer_4": "Eine Hüftgelenksluxation, der Hüftgelenkkopf liegt außerhalb der normalen Stellung in der Gelenkpfanne.",
        "right_answer": 1
    },
];

let currentQuestion = 0;

let rightQuestions = 0;

let audio_success = new Audio('sounds/win.mp3');
let audio_fail = new Audio('sounds/fail.mp3');


// Diese Funktion wird mit onload ausgelöst
function init() {
   document.getElementById('complete_container').classList.add('d-none'); // Der kmplette Card-Container wird ausgeblendet
   // jetzt wird der Starttext eingeblendet
   document.getElementById('start').innerHTML = `
   <b>Bist du bereit für das ultimative Hundequiz?</b>
   <button onclick="showQuestion()" class="start_button">Leg los!</button>
   `; // Wenn auf den Button showQuestion() gedrückt wird, wird diese Funktion ausgeführt
}


function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressbar();
        goToNextQuestion();
    }
}


function answer(selection) { // Hier geben wir eine Variable mit
    let question = questions[currentQuestion]; // Die Variable bekommt den Wert questions[0]
    let selectedQuestionNumber = selection.slice(-1); // Die Variable selectedQuestionNumber bekommt den Wert des letzten Zeichens der entsprechenden onclick funktion ( onclick="answer('answer_1')" wäre dann z.B die "1")
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { // Wenn das letzte Zeichen der ausgewählten antwort = das Zeichen vom Objekt "Right_answer" aus dem array questions ist
        document.getElementById(selection).classList.add('bg-success');//Wenn es die richtige Antwort war, färbe den hintergrund Grün
        audio_success.play();
        rightQuestions++;
    } else { //Wenn nicht 
        document.getElementById(selection).classList.add('bg-danger'); // färbe den hintergrund Rot
        document.getElementById(idOfRightAnswer).classList.add('bg-success'); // färbe den hintergrund der richtigen Antwort grün
        audio_fail.play();
    }
    document.getElementById('next_button').disabled = false; // Wenn die Funktion ausgeführt wurde, setz den Button "Nächste frage" auf aktiv. 
}


// Nächste Frage aufrufen
function nextQuestion() {
    currentQuestion++; // Variable wird von 0 auf 1 erhöht
    document.getElementById('next_button').disabled = true;
    resetAnswerButtons(); // Remove
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
}


function restartGame() {
    document.getElementById('start_image').src = "./img/quiz.jpg";
    document.getElementById('endScreen').classList.add('d-none'); 
    
    rightQuestions = 0;
    currentQuestion = 0;

    document.getElementById('end').style = '';
    document.getElementById('questionbody').style = '';
    document.getElementById('start').classList.remove('d-none');	
    init();
}


function showEndscreen() {
    document.getElementById('start_image').src = "./img/18399.jpg";
        document.getElementById('endScreen').style = ''; // Entfernt das Display none von der ID endScreen (Selbe funktion wie classList.add)
        document.getElementById('questionbody').style = 'display: none';  // Fügt das Display None der ID "questionbody" hinzu
        document.getElementById('end').style = 'display: none';  // Fügt das Display None der ID "end" hinzu
        document.getElementById('amount_of_questions').innerHTML = questions.length; 
        document.getElementById('amount_of_right_questions').innerHTML = rightQuestions;
        document.getElementById('endScreen').classList.remove('d-none');
}


function goToNextQuestion() {
    // Show Question
    document.getElementById('start').classList.add('d-none'); // Der Starttext Container wird wieder ausgeblendet
    document.getElementById('complete_container').classList.remove('d-none'); // Der Card-Container wird wieder eingeblendet

    let question = questions[currentQuestion]; // Die Variable questions hat nun den Wert questions[0]
    document.getElementById('all_questions').innerHTML = questions.length; // Unten wird der Wert angegeben, wieviele Fragen es insgesamt gibt
    document.getElementById('question_number').innerHTML = currentQuestion + 1; // Die Frage soll ja bei 1 Anfangen und nicht bei 0 
    document.getElementById('questiontext').innerHTML = question['question']; // in den Container questiontext wird nun das 'Objekt' question aus dem Array 'questions' eingefügt
    document.getElementById('answer_1').innerHTML = question['answer_1']; // Hier werden die Antworten ihren Containern zugewiesen
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


// ====================== Hilfsfunktionen ========================

function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress').innerHTML = `${percent}%`;
    document.getElementById('progress').style = `width:${percent}%`;
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}