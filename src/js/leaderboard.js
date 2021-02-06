let url = 'https://slidingblock.herokuapp.com';
let minRank = '';
const leaderboard = document.getElementById('leaderboard');
const lbTitle = document.getElementById('lb-title');
const lbContent = document.getElementById('lb-content');

const timeFormat = (time) =>{
    let min = Math.floor(time/60);
    let second = time - min*60;
    let timeString = '';
    (min < 10)? timeString += '0'+min: timeString += min;
    (second < 10)? timeString += ':0'+second: timeString += ':'+second;
    return timeString; 
}

const setLeaderboardContent = (data) =>{
    lbContent.innerHTML = '';
    minRank = data.length;
    if(minRank === 0){
        let p = document.createElement('p');
        p.innerHTML = "Uh-oh! You are probably the first one here.";
        lbContent.appendChild(p);
    }else{
        for (let index = 0; index < data.length; index++) {
            let divParent = document.createElement('div');
            let firstChild = document.createElement('div');
            let secondChild = document.createElement('div');
            let thirdChild = document.createElement('div');
    
            divParent.classList.add('lb-content-hide');
            divParent.id = 'rank-'+index;
            firstChild.innerHTML = data[index].name;
            secondChild.innerHTML = data[index].moves;
            thirdChild.innerHTML = timeFormat(data[index].time);
    
            divParent.appendChild(firstChild);
            divParent.appendChild(secondChild);
            divParent.appendChild(thirdChild);
            lbContent.appendChild(divParent);
        }
    }
}

const showLeaderboardContent = () =>{
    let index = 0;
    if(minRank !== 0){
        let show = setInterval(() => {
            let element = document.getElementById('rank-'+index);
            element.classList.remove('lb-content-hide');
            index++;
            if(index === minRank)
                clearInterval(show);
        }, 200);
    }
}
const hideLeaderboardContent = () =>{
   if(minRank !== 0){
    let index = minRank -1;
    let hide = setInterval(() => {
        let element = document.getElementById('rank-'+index);
        element.classList.add('lb-content-hide');
        index--;
        if(index < 0)
            clearInterval(hide);
    }, 50);
   }
}

const getLeaderboard = () =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url+'/leaderboard', true);
    xhttp.onreadystatechange = () =>{
        if(xhttp.readyState === 4 && xhttp.status === 200){
            let data = xhttp.response;
            if(data){
                data = JSON.parse(data);
                setLeaderboardContent(data.users);
            }
            else setLeaderboardContent([]);
        }
    }
    xhttp.send();
}

const setLeaderboard = () =>{
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', url+'/leaderboard', true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.onreadystatechange = () =>{
        if(xhttp.readyState === 4 && xhttp.status === 200)
            getLeaderboard();
    }
    xhttp.send('userName='+userNameValue+'&time='+secs+'&moves='+move);
}

const showLeaderboard = () =>{
    leaderboard.classList.remove('hide-v');
    leaderboard.classList.remove('hide-o');

    setTimeout(() =>{
        showLeaderboardContent();
    }, 2000);
}

const hideLeaderboard = () =>{
    leaderboard.classList.add('hide-o');
    leaderboard.classList.add('hide-v');
    hideLeaderboardContent();
}

const backToHomeFromLeaderboard = () =>{
    logo.removeEventListener('click',backToHomeFromLeaderboard);
    showLoading();
    setTimeout(() => {
        hideLeaderboardContent();
        hideLeaderboard();
    }, 1000);
    setTimeout(() => {
        hideLoading();
        logo.style.cursor = 'default';
        logo.title = '';
    }, 2000);
}

scorebtn.addEventListener('click', () =>{
    showLoading();
    setTimeout(() => {
        hideLoading(true);
    }, 1000);

    setTimeout(() => {
        logo.addEventListener('click', backToHomeFromLeaderboard);
        logo.style.cursor = 'pointer';
        logo.title = 'Home';
        showLeaderboard();
    }, 2000);
});