Status = "";
objects = [];
song = "";
img = "";

function preload()
{
  song = loadSound("alarm.mp3");
  img = loadImage("alarm_2.gif");
}

function setup()
{
    canvas = createCanvas(800, 800);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(800,800);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
  console.log("Model Loaded!");
  Status = true;
}

function gotResult(error, results)
{
  if (error) 
  {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw()
{
  image(video, 0, 0, 800, 800);
  if (Status != "")
  {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);

    for (i = 0; i< objects.length; i++) 
    {
      document.getElementById("status").innerHTML = "Status : Object Dectected";
      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if (objects[i].label == "person") 
      {
        document.getElementById("number_of_objects").innerHTML = "Baby Found";
        song.stop();  
      }
      else
      {
        document.getElementById("number_of_objects").innerHTML = "Baby Missing!";
        song.play();
        document.body.style.backgroundImage = url(img);
        
      }
    }
  }

}