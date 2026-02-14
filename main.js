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

            // Show share buttons after result
            if (shareButtons) {
                shareButtons.style.display = 'block';
            }
        }, 5000);
    });
}

// SNS Share functions
var siteUrl = 'https://woohyun.work/';
var siteTitle = '오늘 뭐 먹지? - 메뉴 추천 룰렛';
var siteDesc = '매일 고민되는 메뉴 선택! 룰렛으로 오늘의 메뉴를 정해보세요.';

function shareToKakao(text) {
    var msg = text || siteTitle + ' - ' + siteDesc;
    var kakaoUrl = 'https://sharer.kakao.com/talk/friends/picker/link?url=' + encodeURIComponent(siteUrl) + '&text=' + encodeURIComponent(msg);
    window.open(kakaoUrl, '_blank', 'width=600,height=400');
}

function shareToTwitter(text) {
    var msg = text || siteTitle + '\n' + siteDesc;
    var twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(msg) + '&url=' + encodeURIComponent(siteUrl);
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareToFacebook() {
    var fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(siteUrl);
    window.open(fbUrl, '_blank', 'width=600,height=400');
}

function shareToLine(text) {
    var msg = text || siteTitle + ' ' + siteUrl;
    var lineUrl = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(siteUrl) + '&text=' + encodeURIComponent(msg);
    window.open(lineUrl, '_blank', 'width=600,height=400');
}

function copyUrlToClipboard(text) {
    var copyText = text || siteUrl;
    navigator.clipboard.writeText(copyText).then(function() {
        alert('URL이 복사되었습니다!');
    }).catch(function() {
        // fallback
        var textarea = document.createElement('textarea');
        textarea.value = copyText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('URL이 복사되었습니다!');
    });
}

// Roulette result share buttons
var shareButtons = document.getElementById('share-buttons');
if (shareButtons) {
    document.getElementById('share-kakao').addEventListener('click', function() {
        var resultText = document.querySelector('#result p');
        var msg = resultText ? resultText.textContent + ' - 오늘 뭐 먹지?' : siteTitle;
        shareToKakao(msg);
    });
    document.getElementById('share-twitter').addEventListener('click', function() {
        var resultText = document.querySelector('#result p');
        var msg = resultText ? resultText.textContent + '\n오늘 뭐 먹지? 룰렛으로 정했어요!' : siteTitle;
        shareToTwitter(msg);
    });
    document.getElementById('share-facebook').addEventListener('click', function() {
        shareToFacebook();
    });
    document.getElementById('share-line').addEventListener('click', function() {
        var resultText = document.querySelector('#result p');
        var msg = resultText ? resultText.textContent + ' - 오늘 뭐 먹지?' : siteTitle;
        shareToLine(msg);
    });
    document.getElementById('share-copy').addEventListener('click', function() {
        var resultText = document.querySelector('#result p');
        var msg = resultText ? resultText.textContent + ' ' + siteUrl : siteUrl;
        copyUrlToClipboard(msg);
    });
}

// Page share buttons
var pageShareKakao = document.getElementById('page-share-kakao');
if (pageShareKakao) {
    pageShareKakao.addEventListener('click', function() { shareToKakao(); });
    document.getElementById('page-share-twitter').addEventListener('click', function() { shareToTwitter(); });
    document.getElementById('page-share-facebook').addEventListener('click', function() { shareToFacebook(); });
    document.getElementById('page-share-line').addEventListener('click', function() { shareToLine(); });
    document.getElementById('page-share-copy').addEventListener('click', function() { copyUrlToClipboard(); });
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
