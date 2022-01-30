video = "";
objects = [];


function preload()
{
 
}

function setup()
{
 canvas = createCanvas(400, 300);
 canvas.center();
 video = createCapture();
 video.hide()
}
function draw()
{
    image(video, 0 , 0, 400 ,300);
    if (status != "") 
 {
     objectDetector.detect(video, gotResult);    
     for ( i = 0; i < objects.length; i++) 
     {
         document.getElementById("status").innerHTML = "Status : Obejct detected";
         document.getElementById("number_of_object").innerHTML = "Number of objects : " + objects.length;
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         noFill();
         text(objects[i].label + " " + percent + "% " , objects[i].x + 15 , objects[i].y + 15);
         stroke("#000000");
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
     }
     if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
          }     
 }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status detecting objects :"; 
    object_name = document.getElementById("input").value;
    video.stop();
    objectDetector.detect(gotResult);
}
function modelLoaded()
{
    console.log("model is loaded");
    status = true;
}
function gotResult(error, results)
{
    if (error) 
    {
        console.error(error);    
    }
    console.log(results);
    objects = results;
}