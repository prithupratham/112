prediction1 = ""
prediction2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("Camera");

Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_img" src = "'+data_uri+'">';
    });
}
console.log('ml5 version :', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QiKW2fJuv/model.json',modelLoaded);

function modelLoaded(){
    console.log('model Loaded!');
}

function speak(){
   var synth = window.speechSynthesis;
   speak_data_1 = "The first prediction is" + prediction1;
   speak_data_2 = "And the second prediction is" + prediction2;
   var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
   synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion1").innerHTML = results[0].label;
    document.getElementById("result_emotion2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();

if(results[0].label == "happy"){
    document.getElementById("result_emoji1").innerHTML = "&#128522;";
}
if(results[0].label == "sad"){
    document.getElementById("result_emoji1").innerHTML = "&#128532;";
}
if(results[0].label == "angry"){
    document.getElementById("result_emoji1").innerHTML = "&#128548;";
}

if(results[1].label == "angry"){
    document.getElementById("result_emoji2").innerHTML = "&#128548;";
}
if(results[1].label == "sad"){
    document.getElementById("result_emoji2").innerHTML = "&#128532;";
}
if(results[1].label == "happy"){
    document.getElementById("result_emoji2").innerHTML = "&#128522;";
}
}
}