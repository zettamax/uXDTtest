var context = new window.AudioContext();
var osc = context.createOscillator();
osc.type = 'sine';
osc.frequency.value = 15000;
osc.start();

window.onload = function () {

    document.querySelector('#play').onclick = function () {
        osc.connect(context.destination);
        setTimeout(function () {
            osc.disconnect(context.destination);
        }, 1000);
    };

    document.querySelector('#listen').onclick = function () {
        alert('Not implemented');
    };

};