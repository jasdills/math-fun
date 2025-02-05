// Phaser.js Math Adventure Game for Grade 2 Addition & Subtraction

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let questionText, feedbackText, scoreText;
let currentQuestion, correctAnswer, score = 0;
let answerInput, submitButton;

function preload() {
    this.load.image('background', 'assets/background.png'); // Change to your asset path
}

function create() {
    this.add.image(400, 300, 'background');
    
    questionText = this.add.text(100, 100, '', { fontSize: '24px', fill: '#ffffff' });
    feedbackText = this.add.text(100, 200, '', { fontSize: '20px', fill: '#ff0000' });
    scoreText = this.add.text(600, 50, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    
    // Ensure Phaser parent container exists
    let gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        gameContainer = document.createElement('div');
        gameContainer.id = 'game-container';
        document.body.appendChild(gameContainer);
    }
    
    // Create a DOM container
    let domContainer = document.createElement('div');
    domContainer.style.position = 'absolute';
    domContainer.style.top = '50%';
    domContainer.style.left = '50%';
    domContainer.style.transform = 'translate(-50%, -50%)';
    domContainer.style.display = 'flex';
    domContainer.style.flexDirection = 'column';
    domContainer.style.alignItems = 'center';
    domContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    domContainer.style.padding = '10px';
    domContainer.style.borderRadius = '10px';
    
    // Create input field
    answerInput = document.createElement('input');
    answerInput.type = 'number';
    answerInput.style.fontSize = '20px';
    answerInput.style.marginBottom = '10px';
    domContainer.appendChild(answerInput);
    
    // Create submit button
    submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.style.fontSize = '22px';
    submitButton.onclick = checkAnswer;
    domContainer.appendChild(submitButton);
    
    document.body.appendChild(domContainer);
    
    generateQuestion();
}

function generateQuestion() {
    let num1 = Phaser.Math.Between(10, 90);
    let num2 = Phaser.Math.Between(10, 90);
    let operation = Phaser.Math.Between(0, 1) ? '+' : '-';
    
    if (operation === '-' && num2 > num1) {
        [num1, num2] = [num2, num1]; // Ensure no negative results for grade 2 level
    }
    
    currentQuestion = `${num1} ${operation} ${num2} = ?`;
    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    questionText.setText(currentQuestion);
    feedbackText.setText('');
    answerInput.value = '';
}

function checkAnswer() {
    let userAnswer = parseInt(answerInput.value);
    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
        feedbackText.setText('Correct! 🎉');
        score += 10;
        scoreText.setText('Score: ' + score);
    } else {
        feedbackText.setText('Try again! ❌');
    }
    
    setTimeout(generateQuestion, 1000);
}

function update() {
    // No need for updates unless animations are added
}
