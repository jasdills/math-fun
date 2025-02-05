const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

let questionText;
let correctAnswer;
let answerBoxes = [];
let feedbackText;

function preload() {
    this.load.image('box', 'https://via.placeholder.com/100'); // Placeholder for answer boxes
}

function create() {
    // Generate a multiplication question
    let num1 = Phaser.Math.Between(2, 9);
    let num2 = Phaser.Math.Between(2, 9);
    correctAnswer = num1 * num2;

    // Display the question
    questionText = this.add.text(300, 100, `${num1} × ${num2} = ?`, {
        fontSize: '32px',
        fill: '#fff'
    });

    // Generate answer choices
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let wrongAnswer = Phaser.Math.Between(4, 81);
        if (!answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }

    // Shuffle answer choices
    Phaser.Utils.Array.Shuffle(answers);

    // Display answer options
    for (let i = 0; i < answers.length; i++) {
        let xPos = 200 + i * 150;
        let answerBox = this.add.image(xPos, 300, 'box').setInteractive();
        let answerText = this.add.text(xPos - 20, 290, answers[i], {
            fontSize: '24px',
            fill: '#000'
        });

        answerBox.answerValue = answers[i];

        answerBox.on('pointerdown', function () {
            checkAnswer(this.answerValue, answerBox);
        });

        answerBoxes.push({ box: answerBox, text: answerText });
    }

    // Feedback text
    feedbackText = this.add.text(300, 450, '', {
        fontSize: '28px',
        fill: '#fff'
    });
}

function checkAnswer(selectedValue, box) {
    if (selectedValue === correctAnswer) {
        feedbackText.setText('Correct!');
        box.setTint(0x00ff00);
        setTimeout(() => restartGame(), 1000);
    } else {
        feedbackText.setText('Try Again!');
        box.setTint(0xff0000);
    }
}

function restartGame() {
    game.scene.restart();
}
