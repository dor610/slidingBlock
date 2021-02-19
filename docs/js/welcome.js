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
const gameSection = document.getElementById('game');
const loadingBackground = document.getElementById('loading-background');
const changeUserNameBtn = document.getElementById('change-user-name');

function getUserName(){
    user.userNameValue = userName.value;
    if(user.userNameValue){
        document.cookie = 'userName='+user.userNameValue+'; max-age=84000';
        showLoading();
        playBtn.classList.remove('hide-d');
        scorebtn.classList.remove('hide-d');
        aboutBtn.classList.remove('hide-d');
        setTimeout(() =>{
            gettingUserName.classList.add('hide-d');
            welcomeLabel.innerHTML = welcomeLabel.innerHTML + ', '+user.userNameValue;
        },1000);
        setTimeout(() =>{
            hideLoading();
            changeUserNameBtn.classList.remove('hide-d');
        },1500);
    }
}

function changeUserName() {
        playBtn.classList.add('hide-d');
        scorebtn.classList.add('hide-d');
        aboutBtn.classList.add('hide-d');
        gettingUserName.classList.remove('hide-d');
        welcomeLabel.innerHTML = 'Welcome';
        changeUserNameBtn.classList.add('hide-d');
}

function mouseoverHandle(){
    let rand = Math.floor(Math.random() * 3);
    this.classList.remove('gray-color');
    if(themeCode === 'dark'){
        switch (rand) {
            case 0:
                this.classList.add('pink-color-dark-theme');
                break;
            case 1:
                this.classList.add('orange-color-dark-theme');
                break;
            default:
                this.classList.add('blue-color-dark-theme');
                break;
        }
    }else{
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
}

function mouseleaveHandle(){
    if(themeCode === 'dark'){
    this.classList.contains('pink-color-dark-theme')? this.classList.remove('pink-color-dark-theme'):
    this.classList.contains('orange-color-dark-theme')? this.classList.remove('orange-color-dark-theme'):
    this.classList.contains('blue-color-dark-theme')? this.classList.remove('blue-color-dark-theme'): this.classList.add('gray-color');
    } else{
        this.classList.contains('pink-color')? this.classList.remove('pink-color'):
        this.classList.contains('orange-color')? this.classList.remove('orange-color'):
        this.classList.contains('blue-color')? this.classList.remove('blue-color'): this.classList.add('gray-color');
        }  
}

changeUserNameBtn.addEventListener('click', changeUserName);

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
    gameSection.classList.remove('hide-d');
    create();
}

const replayGame = () =>{
    showLoading();
    resetGame();
    create();
}

replayBtn.addEventListener('click', () =>{
    replayGame();
});

const replayBtnHoverHandle = () =>{
    if(themeCode === 'dark'){
        replayBtnAni.playSegments([45, 85], true);
    }else replayBtnAni.playSegments([0,40], true);
}

replayBtn.addEventListener('mouseover', replayBtnHoverHandle);

const resetGame = () =>{
    clearInterval(game.timeCounting);
    logo.title = '';
    logo.style.cursor = 'default';
    user.move = 0;
    user.time = 0;
    game.timeCounting = '';
    clock.innerHTML = '00:00';
    moves.innerHTML = '0';
    game.blocks = [];
    clock.classList.add('hide-o', 'hide-v');
    moves.classList.add('hide-o', 'hide-v');
    replayBtn.classList.add('hide-o', 'hide-v', 'scale-ani');
    hideWinBanner();
    setTimeout(() => {
        clock.classList.remove('win-clock');
        moves.classList.remove('win-moves');
        container.classList.remove('hide-o');
    }, 500);
}

const backToHomeFromGame = () =>{
    logo.removeEventListener('click', backToHomeFromGame);
    gameSection.classList.add('hide-d');
    resetGame();
    showLoading();
    setTimeout(() => {
        welcomeSection.classList.remove('hide-d');
    }, 1000);

    setTimeout(() => {
        hideLoading(false);
    }, 2000);
}

playBtn.addEventListener('click', () =>{
    playGame();
    welcomeSection.classList.add('hide-d');
});
