//https://teachablemachine.withgoogle.com/models/yOvfOa-35/model.json

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'" id="captured_image">';
});
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yOvfOa-35/model.json', modelLoaded);
function modelLoaded()
{
    console.log("model is loaded");
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
    if(error)
        {
            console.error(error);
        }
        else
        {
            console.log(results);
            document.getElementById('result_gesture_name').innerHTML = results[0].label;
            document.getElementById('result_gesture_name2').innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
            if(results[0].label == "Thumbs Up")
                {
                    document.getElementById("update_gesture").innerHTML = "&#128077;";
                }
                if(results[0].label == "Peace")
                    {
                        document.getElementById("update_gesture").innerHTML = "&#9996;";
                    }
                    if(results[0].label == "Wave")
                        {
                            document.getElementById("update_gesture").innerHTML = "&#128075;";
                        }
                        if(results[0].label == "Fist Bump")
                            {
                                document.getElementById("update_gesture").innerHTML = "&#128074;";
                            }
                            if(results[1].label == "Thumbs Up")
                                {
                                    document.getElementById("update_gesture2").innerHTML = "&#128077;";
                                }
                                if(results[1].label == "Peace")
                                    {
                                        document.getElementById("update_gesture2").innerHTML = "&#9996;";
                                    }
                                    if(results[1].label == "Wave")
                                        {
                                            document.getElementById("update_gesture2").innerHTML = "&#128075;";
                                        }
                                        if(results[1].label == "Fist Bump")
                                            {
                                                document.getElementById("update_gesture2").innerHTML = "&#128074;";
                                            }
        }
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is " + prediction_1;
    speak_data_2 = "The Second Prediction Is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}