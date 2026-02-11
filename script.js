
function generate() {
    const topic = document.getElementById('topic').value;
    const format = document.getElementById('format').value;

    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    alert("AI is generating your " + format.toUpperCase() + " for topic: " + topic + 
    "\n\n(Note: Backend integration required for full AI functionality)");
}
