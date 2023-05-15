function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobileNet' , modelLoaded);
}

function modelLoaded()
{
  console.log('Model Loaded!');
}

function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video , gotResult);
}

let previous_result = '';

function gotResult(error , results)
{
  if(error)
  {
    console.error(error);
  }
  else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].lable)){
      console.log(results);
      previous_result = results[0].lable;
      var synth = window.speechSynthesis;
      speak_data = 'Object detected Is - ' + results[0].lable;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    document.getElementById("result_object_name").innerHTML = results[0].lable;
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
  }

}




