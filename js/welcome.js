document.addEventListener('DOMContentLoaded', () => {
    const userName = JSON.parse(localStorage.getItem('current_user')).name;
    document.getElementsByClassName('name')[0].innerHTML = `HI ${userName}`
});

window.addEventListener('click', function(e){
    console.log(e.target);
})

window.history.go(1);

document.getElementById('logout-btn').addEventListener('click', function(e){
    window.location.href = 'index.html';
    localStorage.removeItem('current_user');
})

