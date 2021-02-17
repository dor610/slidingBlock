const logoContainer = document.getElementById('logo');
let logoAnimation = lottie.loadAnimation({
    container: logoContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js/animatedLogo.json'
});

const winAnimationContainer = document.getElementById('win-animation');

let winAnimation = lottie.loadAnimation({
    container: winAnimationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'js/winAnimation.json'
});

const aboutSBPAni = document.getElementById('about-sbp-ani');

let aboutSBPAnimation = lottie.loadAnimation({
    container: aboutSBPAni,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'js/aboutSBP.json'
});

const themeBtn = document.getElementById('theme-btn');

let themeBtnAni = lottie.loadAnimation({
    container: themeBtn,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'js/themeBtn.json'
});
