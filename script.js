// Problemas por nivel
const problems = [
    { a: 3, b: 4, c: 5 },       // Nivel 1
    { a: 5, b: 12, c: 13 },     // Nivel 2
    { a: 6, b: 8, c: 10 },      // Nivel 3
    { a: 7, b: 24, c: 25 },     // Nivel 4
    { a: 8, b: 15, c: 17 },     // Nivel 5
    { a: 9, b: 40, c: 41 },     // Nivel 6
    { a: 10, b: 24, c: 26 },    // Nivel 7
    { a: 11, b: 60, c: 61 },    // Nivel 8
    { a: 12, b: 16, c: 20 },    // Nivel 9
    { a: 12, b: 35, c: 37 },    // Nivel 10
    { a: 13, b: 84, c: 85 },    // Nivel 11
    { a: 14, b: 48, c: 50 },    // Nivel 12
    { a: 15, b: 20, c: 25 },    // Nivel 13
    { a: 15, b: 36, c: 39 },    // Nivel 14
    { a: 16, b: 30, c: 34 },    // Nivel 15
    { a: 18, b: 24, c: 30 },    // Nivel 16
    { a: 20, b: 21, c: 29 },    // Nivel 17
    { a: 21, b: 28, c: 35 },    // Nivel 18
    { a: 24, b: 32, c: 40 },    // Nivel 19
    { a: 9, b: 12, c: 15 }      // Nivel 20
];

let catetoA, catetoB, hipotenusa;
let score = 0;
let lives = 3;
let currentLevel = 1;
let timeLeft = 120; // Tiempo límite por cada ecuación en segundos
let timer;

const canvas = document.getElementById('triangleCanvas');
const ctx = canvas.getContext('2d');

const generateQuestion = () => {
    // Seleccionar el problema según el nivel actual
    const problem = problems[currentLevel - 1];
    catetoA = problem.a;
    catetoB = problem.b;
    hipotenusa = problem.c;

    document.getElementById('catetoA').textContent = catetoA;
    document.getElementById('catetoB').textContent = catetoB;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';

    drawTriangle();

    // Iniciar el temporizador
    timeLeft = 120; // Reiniciar tiempo para cada problema
    clearInterval(timer);
    updateTimer();
    timer = setInterval(updateTimer, 1000);
};

const drawTriangle = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja el triángulo
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(30 + catetoA * 10, canvas.height - 30);
    ctx.lineTo(30, canvas.height - 30 - catetoB * 10);
    ctx.closePath();

    // Rellena el triángulo
    ctx.fillStyle = '#ffcc00';
    ctx.fill();

    // Dibuja los lados y la incógnita (?)
    ctx.font = 'bold 16px Arial';
    ctx.strokeStyle = '#000';
    ctx.strokeText(catetoA, 30 + (catetoA * 10) / 2, canvas.height - 15); // Lado adyacente
    ctx.strokeText(catetoB, 10, canvas.height - 30 - (catetoB * 10) / 2); // Lado opuesto
    ctx.strokeText(hipotenusa, 30 + (catetoA * 10) / 2, canvas.height - 30 - (catetoB * 10) / 2); // Hipotenusa
};

const checkAnswer = () => {
    const answer = parseInt(document.getElementById('answer').value);

    if (answer === hipotenusa) {
        score += 10;
        document.getElementById('result').textContent = `¡Correcto! La hipotenusa es ${hipotenusa}.`;
        document.getElementById('result').style.color = 'green';
    } else {
        lives--;
        document.getElementById('result').textContent = `Respuesta incorrecta. La respuesta correcta es ${hipotenusa}.`;
        document.getElementById('result').style.color = 'red';
    }

    updateScoreAndLives();

    if (lives === 0) {
        gameOver();
    } else {
        // Ir al siguiente nivel
        currentLevel++;
        if (currentLevel > problems.length) {
            // Si se completaron todos los niveles
            gameCompleted();
        } else {
            generateQuestion();
        }
    }
};

const updateScoreAndLives = () => {
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('livesValue').textContent = lives;
};

const updateTimer = () => {
    document.getElementById('timeLeftValue').textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timer);
        lives--;
        updateScoreAndLives();
        document.getElementById('result').textContent = `Se acabó el tiempo. La respuesta correcta era ${hipotenusa}.`;
        document.getElementById('result').style.color = 'red';
        if (lives === 0) {
            gameOver();
        } else {
            setTimeout(() => {
                currentLevel++;
                if (currentLevel > problems.length) {
                    gameCompleted();
                } else {
                    generateQuestion();
                }
            }, 2000); // Esperar 2 segundos antes de ir al siguiente problema
        }
    }
};

const gameOver = () => {
    clearInterval(timer);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('playAgainBtn').style.display = 'block';
    document.getElementById('playAgainBtn').textContent = 'Volver a jugar';
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        score = 0;
        lives = 3;
        currentLevel = 1;
        generateQuestion();
        document.getElementById('gameArea').style.display = 'flex';
        document.getElementById('playAgainBtn').style.display = 'none';
    });
};

const gameCompleted = () => {
    clearInterval(timer);
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('playAgainBtn').style.display = 'block';
    document.getElementById('playAgainBtn').textContent = 'Juego completado. Volver a jugar';
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        score = 0;
        lives = 3;
        currentLevel = 1;
        generateQuestion();
        document.getElementById('gameArea').style.display = 'flex';
        document.getElementById('playAgainBtn').style.display = 'none';
    });
};

// Event listener para el botón Comprobar
document.getElementById('checkBtn').addEventListener('click', checkAnswer);

// Comenzar el juego al cargar la página
generateQuestion();
