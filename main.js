// browser loads html > browser loads js > open dialog > user closes dialog > audio system loads > user clicks sound button
// find our dialog
const introDialog = document.getElementById("intro-dialog");
// find the close button
const introDialogCloseButton = document.getElementById("intro-dialog-close");
// show the found element in our browser console
// console.log(introDialog); [comment them out because they use lots of processing power so // to make it a comment and remove when needed]
// find our test button
const testButton = document.getElementById('test-button');
// find my key button for testing
const key = document.getElementById("key-test");
// init our synth
// change key to poly synth
const synth = new Tone.PolySynth();
// is the user currently holding down the key
let mouseButtonHeld = false;
// if user holds down key, set to true then if they let it up set to false
window.addEventListener("mousedown", function() {
    mousedButtonHeld = true;

});
window.addEventListener("mouseup", function(){
    mouseButtonHeld = false;
});

//// dialog
// show dialog on page load
introDialog.showModal();
// close dialog when user clicks
introDialogCloseButton.addEventListener("click", function closeIntroDialog(){
    introDialog.close();
});
// whenever dialog closes, intialise the audio system
introDialog.addEventListener("close", toneInit);


//// tone
// run to setup our audio system
function toneInit(){
    synth.connect(Tone.Destination);
}

// do something when this button is clicked 
testButton.addEventListener("click", playNote);

// function that runs when button is clicked
function playNote(){
    // play a note for duration
    synth.triggerAttackRelease("c4", "8n");
}

function playDataNote(e){
    let buttonClicked = e.target;
    // console.log(buttonClicked);
    let note = buttonClicked.dataset.note;
    // console.log(note);
    synth.triggerAttackRelease(note, "8n");
}

function startNote(e){
    // find key that was pressed
    let keyPressed = e.target;
    // find the note associated with the key
    let note = keyPressed.dataset.note;
    synth.triggerAttack(note);
}

function endNote(e){
    let keyPressed = e.target;
    let note = keyPressed.dataset.note;
    synth.triggerRelease(note);

}

key.addEventListener("mousedown", startNote);
key.addEventListener("mouseup", endNote);
key.addEventListener("mouseleave", endNote);
// if user is holding mouse button down when entering the key, play note
key.addEventListener("mouseenter", function(e){
    if (mouseButtonHeld === true){
        startNote(e);
    }
});


// key.addEventListener("click", playDataNote);
// testButton.addEventListener("click", playDataNote);