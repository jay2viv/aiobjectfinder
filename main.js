Status = "";
objects = [];
// on = object_name

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    cocossd = ml5.objectDetector("cocossd", modelready);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    on = document.getElementById("object_name").value;

    cocossd.detect(gotresults);
    
}

function draw() {
    image(video, 0, 0, 500, 400);

    if (Status != "") {
        cocossd.detect(video, gotresults);

        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == on) {
                video.stop(); objectDetector.detect(gotResult);
                document.getElementById("result").innerHTML = object_name + " Found";
                synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(on + "Found"); synth.speak(utterThis);
            } else { document.getElementById("result").innerHTML = object_name + " Not Found"; }
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            text(objects[i].label + "     " + (objects[i].confidence).toFixed(3), objects[i].x + 15, objects[i].y + 15);

        }
    }

}

function preload() {

}

function modelready() {
    console.log("(: yay good job!!! :)")
    Status = true;
 }

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}