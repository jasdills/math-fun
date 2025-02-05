// Phaser.js Math Adventure Game for Grade 2 Addition & Subtraction with Interactive Workspace

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
let num1Text, num2Text, operatorText, equalsText;
let draggableNumbers = [];
let dropZones = [];

function preload() {
    this.load.image('background', 'assets/background.png'); // Change to your asset path
    this.load.image('box', 'assets/box.png');
}

function create() {
    this.add.image(400, 300, 'background');
    
    questionText = this.add.text(100, 50, 'Solve the equation:', { fontSize: '24px', fill: '#ffffff' });
    feedbackText = this.add.text(100, 550, '', { fontSize: '20px', fill: '#ff0000' });
    scoreText = this.add.text(600, 50, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    
    num1Text = this.add.text(200, 200, '', { fontSize: '40px', fill: '#ffffff' });
    operatorText = this.add.text(300, 200, '', { fontSize: '40px', fill: '#ffffff' });
    num2Text = this.add.text(400, 200, '', { fontSize: '40px', fill: '#ffffff' });
    equalsText = this.add.text(500, 200, '=', { fontSize: '40px', fill: '#ffffff' });
    
    generateQuestion();
}

function generateQuestion() {
    let num1 = Phaser.Math.Between(10, 90);
    let num2 = Phaser.Math.Between(10, 90);
    let operation = Phaser.Math.Between(0, 1) ? '+' : '-';
    
    if (operation === '-' && num2 > num1) {
        [num1, num2] = [num2, num1]; // Ensure no negative results for grade 2 level
    }
    
    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    num1Text.setText(num1);
    operatorText.setText(operation);
    num2Text.setText(num2);
    
    setupDraggableNumbers(correctAnswer);
}

function setupDraggableNumbers(correctAnswer) {
    // Clear previous numbers
    draggableNumbers.forEach(num => num.destroy());
    dropZones.forEach(zone => zone.destroy());
    draggableNumbers = [];
    dropZones = [];
    
    let possibleAnswers = [correctAnswer, correctAnswer + Phaser.Math.Between(1, 10), correctAnswer - Phaser.Math.Between(1, 10)];
    Phaser.Utils.Array.Shuffle(possibleAnswers);
    
    possibleAnswers.forEach((value, index) => {
        let num = this.add.text(150 + index * 200, 400, value, { fontSize: '40px', fill: '#ffffff' })
            .setInteractive()
            .setData('value', value);
        
        this.input.setDraggable(num);
        draggableNumbers.push(num);
    });
    
    let dropZone = this.add.image(600, 200, 'box').setScale(0.5);
    dropZones.push(dropZone);
    
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    
    this.input.on('dragend', function (pointer, gameObject) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), dropZone.getBounds())) {
            checkAnswer(gameObject.getData('value'));
        } else {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });
}

function checkAnswer(selectedValue) {
    if (selectedValue === correctAnswer) {
        feedbackText.setText('Correct! 🎉');
        score += 10;
        scoreText.setText('Score: ' + score);
        setTimeout(generateQuestion, 1500);
    } else {
        feedbackText.setText('Try again! ❌');
    }
}

function update() {
    // No need for updates unless animations are added
}
