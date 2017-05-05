var context = new window.AudioContext();
var osc = context.createOscillator();

window.onload = function () {

    document.querySelector('#play').onclick = function () {
        osc.type = 'sine';
        osc.frequency.value = 15000;
        osc.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + 2);
    };

    document.querySelector('#listen').onclick = function () {
        alert('Not implemented');
    };

};