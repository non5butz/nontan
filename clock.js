// HTML内のcanvas要素を取得
const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
let radius = canvas.height / 2;

// 初期設定
ctx.translate(radius, radius);
radius = radius * 0.90;

// ローマ数字
const romanNumerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// 画像をロード
const backgroundImage = new Image();
backgroundImage.src = 'image.jpg';  // ここに画像のパスを指定してください

backgroundImage.onload = function() {
    setInterval(updateClock, 1000);
    drawClock();
};

// 時計の描画を更新する関数
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

// 時計の盤面を描画
function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.clip();  // 円形にクリッピング

    // 背景画像を描画
    ctx.drawImage(backgroundImage, -radius, -radius, radius * 2, radius * 2);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';  // 背景色を透明に設定
    ctx.fill();

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1);
    grad.addColorStop(0, '#A69304');
    grad.addColorStop(0.5, 'rgba(255, 240, 245, 1)');
    grad.addColorStop(1, '#A69304');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#A69304';
    ctx.fill();
}

// 数字を描画
function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.12 + "px serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = '#A69304';
    for (let num = 0; num < 12; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(romanNumerals[num], 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// 針を描画する
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#C1AB05';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// 時間を描画
function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // 短針の描画
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    // 長針の描画
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

    // 秒針の描画
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

// 時計を更新する関数
function updateClock() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawClock();
}

// 初回の描画
drawClock();
setInterval(updateClock, 1000);