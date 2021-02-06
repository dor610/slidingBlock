const logoContainer = document.getElementById('logo');
let logoAnimation = lottie.loadAnimation({
    container: logoContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/animatedLogo.json'
});

const winAnimationContainer = document.getElementById('win-animation');

let winAnimation = lottie.loadAnimation({
    container: winAnimationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../js/winAnimation.json'
});

const aboutSBPAni = document.getElementById('about-sbp-ani');

let aboutSBPAnimation = lottie.loadAnimation({
    container: aboutSBPAni,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../js/aboutSBP.json'
});

let p = true;
setTimeout(() =>{
    aboutSBPAnimation.playSegments([0, 1770],true);
    let play = setInterval(() => {
        if(p){
            console.log("1");
            p = false;
            aboutSBPAnimation.playSegments([1770,0], true);
        }
        else {
            console.log('2');
            p = true;
            aboutSBPAnimation.playSegments([0, 1770],true);
        }
    }, 59000);
}, 2000);

