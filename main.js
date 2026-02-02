
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

const menus = [
    "치킨", "피자", "햄버거", "떡볶이", "초밥", "파스타",
    "삼겹살", "된장찌개", "김치찌개", "부대찌개", "곱창", "족발",
    "보쌈", "짜장면", "짬뽕", "탕수육", "돈까스", "냉면"
];

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

recommendBtn.addEventListener('click', () => {
    menuDisplay.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * menus.length);
    const selectedMenu = menus[randomIndex];

    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.textContent = selectedMenu;
    
    menuDisplay.appendChild(menuItem);
});
