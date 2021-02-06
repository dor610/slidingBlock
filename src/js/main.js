let blocks = [];
let move = 0;
let secs = 0;
let count = '';
let userNameValue = '';
let mainColor = '';
let winBanner = document.getElementById('win-banner');
const container = document.getElementById('container');
const clock = document.getElementById('clock');
const moves = document.getElementById('moves');

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function create(){
    let numString = '';
    container.innerHTML = '';
    container.classList.add('preparing');
    let maxIndex = 16;
    let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    for (let index = 1; index < maxIndex; index++) {
        let randNum = Math.floor(Math.random() * arr.length);
        //console.log(arr[randNum]);
        if(!numString.includes('-'+arr[randNum]+'-')){
            numString = numString+'-'+arr[randNum]+'-';
            //console.log(numString);
            blocks.push(arr[randNum]);

            let block = document.createElement('div');
            block.classList.add('block');
            block.classList.add('block-'+index);
            block.classList.add('number-block');
            block.id = 'block-'+arr[randNum];
            block.innerHTML = arr[randNum]+1;

            block.addEventListener('click', clickHandle);

            container.appendChild(block);

            arr.splice(randNum, 1);
        }
        
    }
    blocks.push(15);
    moves.innerHTML = move;
    setTimeout(() =>{
        hideLoading(true);
        logo.addEventListener('click', backToHomeFromGame);
        logo.title = 'Home';
        logo.style.cursor = 'pointer';
    }, 1000)
    setTimeout(() =>{
        let index = 0;
        let a = setInterval(() => {
            if(index !== 15){
                let block = document.getElementById('block-'+index);
                index++;
                block.classList.add('display-block');
            }else{
                clearInterval(a);
                container.classList.remove('preparing');
            }
        }, 200);
    },3000);
    setTimeout(() =>{
        timeCount();
        moves.classList.remove('hide-o');
        moves.classList.remove('hide-v');
        clock.classList.remove('hide-v');
        clock.classList.remove('hide-o');
        check();
    }, 6300);


    let rand = Math.floor(Math.random() * 3);
    switch (rand) {
        case 1:
                mainColor = 'pink';
            break;
        case 0:
                mainColor = 'blue';
            break;
        default:
                mainColor = 'orange';
            break;
    }
}

function showWinBanner(){
    winBanner.classList.remove('hide-v');
    winBanner.classList.remove('hide-o');
    winAnimation.playSegments([0, 120],true);
}

function hideWinBanner() {
    winBanner.classList.add('hide-v');
    winBanner.classList.add('hide-o');
}

function clickHandle(){
    let value = parseInt(this.innerHTML) - 1;
    //console.log('------------------------------------------------------------');
    //console.log('value: '+value+' type: '+typeof value);

    let index = blocks.indexOf(value);
    let emptyBlock = blocks.indexOf(15);
    //console.log('index: '+index +' type: '+typeof index);
    //console.log('emptyBlock: '+emptyBlock +' type: '+typeof emptyBlock);

    if(index - 1 === emptyBlock){
        switchBlock(this, index, emptyBlock);
    }else if(index + 1 === emptyBlock){
        switchBlock(this, index, emptyBlock);
    }else if(index - 4 === emptyBlock){
        switchBlock(this, index, emptyBlock);
    }else if(index + 4 === emptyBlock){
        switchBlock(this, index, emptyBlock);
    }else {
        console.log('cannot switch');
    }
    
    let isWin = check();
    if(isWin){
        container.classList.add('preparing');
        clearInterval(count);
        showWinBanner();
        setLeaderboard();
        setTimeout(() =>{
            logo.classList.add('scale-ani');
            clock.classList.add('scale-ani');
            moves.classList.add('scale-ani');
            container.classList.add('hide-o');
        }, 500);
        setTimeout(() => {
            logo.classList.add('win-logo');
            clock.classList.add('win-clock');
            moves.classList.add('win-moves');
        }, 2000);
        setTimeout(()=>{
            logo.classList.remove('scale-ani');
            clock.classList.remove('scale-ani');
            moves.classList.remove('scale-ani');
        }, 3000)
    }
}

function switchBlock(blockA, aIndex, bIndex){
   // console.log('can switch');
    blockA.classList.remove('block-'+(aIndex+1));
    blockA.classList.add('block-'+(bIndex+1));
    let c = blocks[aIndex];
    blocks[aIndex] = blocks[bIndex];
    blocks[bIndex] = c;

    move++;
    moves.innerHTML = move;
}

function timeCount(){
    count = setInterval(() => {
        let min = 0;
        let sec = 0;
        let time = '';
        secs++;
        min = Math.floor(secs/60);
        sec = secs - min*60;
        if(min < 10) time += '0'+min+':';
        else time += min+':';
        if(sec < 10) time += '0'+sec;
        else time += sec;
        clock.innerHTML = time;
    }, 1000);
}

function check(){
    let isWin = 'true';
    for (let index = 0; index < blocks.length-1; index++) {
        let element = document.getElementById('block-'+index);
        
        if(blocks[index] === index)
            element.classList.add(mainColor+'-color-block');
        else{
            element.classList.contains(mainColor+'-color-block')? element.classList.remove(mainColor+'-color-block'): console.log();
        }
        if(blocks[index] > blocks[index + 1]) isWin = false;
    }

    return isWin;
}

document.onreadystatechange = () =>{
    if(document.readyState === "complete"){
        hideLoading();
        getLeaderboard();
    }
  }
