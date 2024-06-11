const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rainDrops = [];

for (let i = 0; i < 100; i++) {
    rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 0.2 + 0.05 
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for (let i = 0; i < rainDrops.length; i++) {
        const drop = rainDrops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.angle * drop.length, drop.y + drop.length);
        ctx.stroke();
        drop.x += drop.angle * drop.speed;
        drop.y += drop.speed;
        if (drop.y > canvas.height || drop.x > canvas.width) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(drawRain);
}

function drawThunder() {
    if (Math.random() < 0.01) { 
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 70);
    }
    requestAnimationFrame(drawThunder);
}

drawRain();
drawThunder();
