// Phaser.js Math Adventure Game for Grade 2 Addition & Subtraction

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
let questionText, answerInput, submitButton, feedbackText, scoreText;
let currentQuestion, correctAnswer, score = 0;

function preload() {
    this.load.image('background', 'assets/background.png'); // Change to your asset path
}

function create() {
    this.add.image(400, 300, 'background');
    
    questionText = this.add.text(100, 100, '', { fontSize: '24px', fill: '#ffffff' });
    feedbackText = this.add.text(100, 200, '', { fontSize: '20px', fill: '#ff0000' });
    scoreText = this.add.text(600, 50, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    
    answerInput = this.add.dom(400, 300, 'input', 'font-size: 20px; width: 100px;');
    submitButton = this.add.text(400, 350, 'Submit', { fontSize: '22px', fill: '#00ff00' })
        .setInteractive()
        .on('pointerdown', checkAnswer);
    
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
}

function checkAnswer() {
    let userAnswer = parseInt(answerInput.node.value);
    if (userAnswer === correctAnswer) {
        feedbackText.setText('Correct! 🎉');
        score += 10;
        scoreText.setText('Score: ' + score);
    } else {
        feedbackText.setText('Try again! ❌');
    }
    
    answerInput.node.value = '';
    setTimeout(generateQuestion, 1000);
}

function update() {
    // No need for updates unless animations are added
}
