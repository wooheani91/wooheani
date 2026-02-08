const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');
const resultDiv = document.getElementById('result');

// Define the values for each 45-degree segment of the wheel
const segmentValues = [
    { value: 'Prize 1', color: '#ffeb3b' }, // 0-45
    { value: 'Prize 2', color: '#ff9800' }, // 45-90
    { value: 'Prize 3', color: '#f44336' }, // 90-135
    { value: 'Try Again', color: '#e91e63' }, // 135-180
    { value: 'Prize 4', color: '#9c27b0' }, // 180-225
    { value: 'Prize 5', color: '#3f51b5' }, // 225-270
    { value: 'Jackpot!', color: '#2196f3' }, // 270-315
    { value: 'Bonus', color: '#4caf50' }    // 315-360
];

let isSpinning = false;
let currentRotation = 0;

// Simulate calling an AI service
function getAIResponse(prize) {
    const messages = {
        'Prize 1': 'A small token for a great player! Keep going!',
        'Prize 2': 'Not bad! This could be the start of a winning streak.',
        'Prize 3': 'A fine prize indeed. Fortune favors you today.',
        'Try Again': 'Don\'t be discouraged! The wheel will turn in your favor soon.',
        'Prize 4': 'A wonderful prize! You have a knack for this.',
        'Prize 5': 'An excellent win! Your luck is shining bright.',
        'Jackpot!': 'INCREDIBLE! You\'ve hit the jackpot! The stars have aligned for you!',
        'Bonus': 'A little extra something for you. Enjoy!'
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(messages[prize] || 'The wheel has spoken!');
        }, 1000); // Simulate network delay
    });
}


spinBtn.addEventListener('click', async () => {
    if (isSpinning) return;

    isSpinning = true;
    resultDiv.innerHTML = ''; // Clear previous result using innerHTML
    const spinMessage = document.createElement('p');
    spinMessage.textContent = 'Spinning...';
    spinMessage.style.color = '#fff';
    resultDiv.appendChild(spinMessage);

    // Calculate a new random rotation
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalRotation = currentRotation + (5 * 360) + randomDegrees;
    
    // Update the current rotation state (modulo 360 to keep it within a circle)
    currentRotation = totalRotation % 360;

    // Apply the rotation to the wheel
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    // Wait for the transition to end
    setTimeout(async () => {
        isSpinning = false;

        // Calculate the winning segment
        const finalAngle = 360 - currentRotation;
        const segmentIndex = Math.floor(finalAngle / 45);
        const winningSegment = segmentValues[segmentIndex];

        // Display the result
        resultDiv.innerHTML = ''; // Clear the 'Spinning...' message
        const winMessage = document.createElement('p');
        winMessage.textContent = `You won: ${winningSegment.value}`;
        winMessage.style.color = winningSegment.color;
        resultDiv.appendChild(winMessage);

        // Get and display the AI message
        const aiMessage = await getAIResponse(winningSegment.value);
        const aiMessageDiv = document.createElement('p');
        aiMessageDiv.textContent = `AI says: "${aiMessage}"`;
        aiMessageDiv.style.marginTop = '10px';
        aiMessageDiv.style.color = '#fff'; // Set AI message color
        resultDiv.appendChild(aiMessageDiv);


    }, 5000); // Must match the transition duration in CSS
});