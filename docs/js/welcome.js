const playBtn = document.getElementById('play-btn');
const aboutBtn = document.getElementById('about-btn');
const scorebtn = document.getElementById('score-btn');
const gettingUserName = document.getElementById('getting-user-name');
const userNameBtn = document.getElementById('user-name-btn');
const userName = document.getElementById('user-name');
const userNameLabel = document.getElementById('user-name-label');
const welcomeSection = document.getElementById('welcome');
const welcomeLabel = document.getElementById('welcome-label');
const logo = document.getElementById('logo');
const loadingBackground = document.getElementById('loading-background');

function getUserName(){
    userNameValue = userName.value;
    if(userNameValue){
        showLoading();
        playBtn.classList.remove('hide-o', 'hide-v', 'hide-d');
        scorebtn.classList.remove('hide-o', 'hide-v', 'hide-d');
        aboutBtn.classList.remove('hide-o', 'hide-v', 'hide-d');
        setTimeout(() =>{
            gettingUserName.classList.add('hide-o', 'hide-v');
            welcomeLabel.innerHTML = welcomeLabel.innerHTML + ', '+userNameValue;
        },1000);
        setTimeout(() =>{
            hideLoading();
        },1500);
    }
}

function mouseoverHandle(){
    let rand = Math.floor(Math.random() * 3);
    this.classList.remove('gray-color');
    this.style.cursor = 'pointer';
    switch (rand) {
        case 0:
            this.classList.add('pink-color');
            break;
        case 1:
            this.classList.add('orange-color');
            break;
        default:
            this.classList.add('blue-color');
            break;
    }
}

function mouseleaveHandle(){
    this.classList.contains('pink-color')? this.classList.remove('pink-color'):
    this.classList.contains('orange-color')? this.classList.remove('orange-color'):
    this.classList.contains('blue-color')? this.classList.remove('blue-color'): this.classList.add('gray-color');    
}

playBtn.addEventListener('mouseover', mouseoverHandle);
playBtn.addEventListener('mouseleave', mouseleaveHandle);

scorebtn.addEventListener('mouseover', mouseoverHandle);
scorebtn.addEventListener('mouseleave', mouseleaveHandle);

aboutBtn.addEventListener('mouseover', mouseoverHandle);
aboutBtn.addEventListener('mouseleave', mouseleaveHandle);
aboutBtn.addEventListener('click', openAboutSection);


userNameBtn.addEventListener('mouseover', mouseoverHandle);
userNameBtn.addEventListener('mouseleave', mouseleaveHandle);
userNameBtn.addEventListener('click', getUserName);

userName.addEventListener('keypress', (e) =>{
    if(e.key === "Enter"){
        getUserName();
    }
})

userName.addEventListener('focusin', () =>{
    userNameLabel.classList.add('move-top');
});
userName.addEventListener('focusout', () =>{
    if(!userName.value)
        userNameLabel.classList.remove('move-top');
})

const hideLoading = (b) =>{
    setTimeout(() => {
        loadingBackground.classList.add('hide-v', 'hide-o');
    }, 2000);
    setTimeout(() => {
        logo.classList.remove('loading-logo');
        if(b)
            logo.classList.add('small-logo');
    }, 1000);
}

const showLoading = () =>{
    loadingBackground.classList.remove('hide-o', 'hide-v');
    logo.classList.add('loading-logo');
    logo.classList.remove('small-logo', 'win-logo');  
}

const playGame = () =>{
    showLoading();
    create();
}

const backToHomeFromGame = () =>{
    logo.removeEventListener('click', backToHomeFromGame);
    logo.title = '';
    logo.style.cursor = 'default';
    move = 0;
    secs = 0;
    count = '';
    clock.innerHTML = '00:00';
    moves.innerHTML = '0';
    blocks = [];
    clock.classList.add('hide-o', 'hide-v');
    moves.classList.add('hide-o', 'hide-v');
    hideWinBanner();
    setTimeout(() => {
        clock.classList.remove('win-clock');
        moves.classList.remove('win-moves');
    }, 500);


    showLoading();
    setTimeout(() => {
        welcomeSection.classList.remove('hide-o', 'hide-v');
        container.classList.remove('hide-o');
    }, 1000);

    setTimeout(() => {
        hideLoading(false);
    }, 2000);
}

playBtn.addEventListener('click', () =>{
    playGame();
    welcomeSection.classList.add('hide-o', 'hide-v');
});
