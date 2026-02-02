
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.ball = document.createElement('div');
        this.ball.classList.add('ball');

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: var(--ball-color);
                box-shadow: var(--ball-shadow);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--text-color);
            }
        `;

        this.shadow.appendChild(style);
        this.shadow.appendChild(this.ball);
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            this.ball.textContent = newValue;
        }
    }
}

customElements.define('lotto-ball', LottoBall);


const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
    } else {
        localStorage.removeItem('theme');
    }
});

if (localStorage.getItem('theme')) {
    body.classList.add(localStorage.getItem('theme'));
}

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    numbers.forEach((number, index) => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.style.animationDelay = `${index * 0.2}s`;
        lottoNumbersContainer.appendChild(lottoBall);
    });
});
