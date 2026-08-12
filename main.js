// browser loads html > browser loads js > open dialog > user closes dialog > audio system loads > user clicks sound button
// find our dialog
const introDialog = document.getElementById("intro-dialog");
// find the close button
const introDialogCloseButton = document.getElementById("intro-dialog-close");
// show the found element in our browser console
// console.log(introDialog); [comment them out because they use lots of processing power so // to make it a comment and remove when needed]
// find our test button
const testButton = document.getElementById('test-button');
// init our synth
const synth = new Tone.Synth();

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
