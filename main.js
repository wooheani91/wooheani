// Menu data for the roulette wheel
const menuItems = [
    { name: '비빔밥', color: '#e65100', desc: '다양한 나물과 고추장의 조화' },
    { name: '김치찌개', color: '#ff8f00', desc: '얼큰하고 깊은 맛의 국물' },
    { name: '불고기', color: '#f44336', desc: '달콤짭조름한 소고기 요리' },
    { name: '냉면', color: '#2196f3', desc: '시원하고 쫄깃한 면 요리' },
    { name: '삼겹살', color: '#e91e63', desc: '구워 먹는 한국의 대표 고기' },
    { name: '떡볶이', color: '#9c27b0', desc: '매콤달콤 쫄깃한 국민 간식' },
    { name: '칼국수', color: '#00897b', desc: '따뜻한 국물의 손칼국수' },
    { name: '제육볶음', color: '#43a047', desc: '매콤한 돼지고기 볶음' }
];

const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');
const resultDiv = document.getElementById('result');

if (wheel && spinBtn) {
    // Build conic-gradient from menu items
    const segmentAngle = 360 / menuItems.length;
    const gradientStops = menuItems.map((item, i) => {
        const start = segmentAngle * i;
        const end = segmentAngle * (i + 1);
        return `${item.color} ${start}deg ${end}deg`;
    }).join(', ');

    wheel.style.backgroundImage = `conic-gradient(${gradientStops})`;

    // Draw labels using canvas overlay
    const canvas = document.createElement('canvas');
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    wheel.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 16;

    menuItems.forEach((item, i) => {
        const angle = (segmentAngle * i + segmentAngle / 2) * (Math.PI / 180) - Math.PI / 2;
        const textRadius = radius * 0.62;
        const x = centerX + textRadius * Math.cos(angle);
        const y = centerY + textRadius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 15px "Noto Sans KR", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(item.name, 0, 0);
        ctx.restore();
    });

    let isSpinning = false;
    let currentRotation = 0;

    spinBtn.addEventListener('click', function () {
        if (isSpinning) return;

        isSpinning = true;
        resultDiv.innerHTML = '';
        var spinMsg = document.createElement('p');
        spinMsg.textContent = '돌리는 중...';
        spinMsg.style.color = '#e65100';
        resultDiv.appendChild(spinMsg);

        const randomDegrees = Math.floor(Math.random() * 360);
        const totalRotation = currentRotation + (5 * 360) + randomDegrees;
        currentRotation = totalRotation % 360;

        wheel.style.transform = 'rotate(' + totalRotation + 'deg)';

        setTimeout(function () {
            isSpinning = false;

            const finalAngle = (360 - currentRotation + 360) % 360;
            const segmentIndex = Math.floor(finalAngle / segmentAngle) % menuItems.length;
            const selected = menuItems[segmentIndex];

            resultDiv.innerHTML = '';

            var resultName = document.createElement('p');
            resultName.textContent = '오늘의 메뉴: ' + selected.name;
            resultName.style.color = selected.color;
            resultDiv.appendChild(resultName);

            var resultDesc = document.createElement('p');
            resultDesc.className = 'result-sub';
            resultDesc.textContent = selected.desc;
            resultDiv.appendChild(resultDesc);
        }, 5000);
    });
}

// Mobile navigation toggle
var navToggle = document.querySelector('.nav-toggle');
var mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
        mainNav.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked
    var navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            mainNav.classList.remove('nav-open');
        });
    });
}
