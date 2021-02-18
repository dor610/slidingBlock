const about = document.getElementById('about');
const aboutSBPContainer = document.getElementById('about-sbp-container');
const aboutSBPTitle = document.getElementById('about-sbp-title');
const aboutSBPContent = document.getElementById('about-sbb-content');
const aboutTGContainer = document.getElementById('about-tg-container');
const aboutTGTitle = document.getElementById('about-tg-title');
const aboutTGContent = document.getElementById('about-tg-content');

let aboutPage = 'first';
let touchStart = null;
let touchEnd = null;

const openAboutSection = () =>{

    document.addEventListener('wheel', aboutScrollHandle);
    window.addEventListener('touchstart', touchStartTracking);
    window.addEventListener('touchend', touchEndTracking);

    showLoading();
    welcomeSection.classList.add('hide-d');
    setTimeout(() => {
       about.classList.remove('hide-d');
       hideLoading(true);
       logo.addEventListener('click', backToHomeFromAbout);
       logo.style.cursor = 'pointer';

       let p = true;
        setTimeout(() =>{
            aboutSBPAnimation.playSegments([0, 1770],true);
            let play = setInterval(() => {
                if(p){
                    p = false;
                    aboutSBPAnimation.playSegments([1770,316], true);
                }
                else {
                    p = true;
                    aboutSBPAnimation.playSegments([316, 1770],true);
                }
            }, 59000);
        }, 2000);
    }, 1000);
}

const showAboutSBP = () =>{
    about.classList.remove('show-tg');
    logo.classList.add('scale-ani');
    setTimeout(() =>{
        logo.classList.remove('about-logo');
    }, 1000);
    setTimeout(() => {
        logo.classList.remove('scale-ani');
    }, 2000);
}

const showAboutTG = () =>{
    about.classList.add('show-tg');
    logo.classList.add('scale-ani');
    setTimeout(() =>{
        logo.classList.add('about-logo');
    }, 1000);
    setTimeout(() => {
        logo.classList.remove('scale-ani');
    }, 2000);
}

const aboutScrollHandle = (event) =>{
    document.removeEventListener('wheel', aboutScrollHandle);
    switch (aboutPage) {
        case 'first':
            aboutPage = 'second';
            if(event.deltaY > 0)
                showAboutTG();
            break;
        default:
            aboutPage = 'first';
            if(event.deltaY < 0)
                showAboutSBP();
            break;
    }
    
    setTimeout(() =>{
        document.addEventListener('wheel', aboutScrollHandle);
    }, 500);
}



const touchStartTracking = () =>{
    touchStart = event.changedTouches[0];
}

const touchEndTracking = (event) =>{
    switch (aboutPage) {
        case 'first':
            aboutPage = 'second';
          touchEnd = event.changedTouches[0];
          if(touchEnd.screenY - touchStart.screenY < 0)
          {
              console.log('scrolling down');
              showAboutTG();
          }
          break;
        default:
            aboutPage = 'first';
          touchEnd = event.changedTouches[0];
          if(touchEnd.screenY - touchStart.screenY > 0)
          {
              console.log('scrolling up');
              showAboutSBP();
          }
      }
}

  const backToHomeFromAbout = () =>{
      if(logo.classList.contains('about-logo'))
        logo.classList.remove('about-logo');
      logo.removeEventListener('click', backToHomeFromAbout);
      document.removeEventListener('wheel', aboutScrollHandle);
      window.removeEventListener('touchstart', touchStartTracking);
      window.removeEventListener('touchend', touchEndTracking);
      logo.style.cursor = 'default';
      showLoading();
      about.classList.remove('show-tg');
      about.classList.add('hide-d');
      touchEnd = null;
      touchStart = null;
      aboutPage = 'first';
      setTimeout(() => {
          welcomeSection.classList.remove('hide-d');
          hideLoading();
      }, 1000);
  }
  

