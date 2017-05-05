var context = new window.AudioContext();
var osc = context.createOscillator();
var playing = false;
osc.type = 'sine';
osc.frequency.value = 15000;
osc.start();

window.onload = function () {

    document.querySelector('#play').onclick = function () {
        if (!playing) {
            osc.connect(context.destination);
            playing = true;
            setTimeout(function () {
                osc.disconnect(context.destination);
                playing = false;
            }, 1000);
        }
    };

    document.querySelector('#listen').onclick = function () {
        alert('Not implemented');
    };

};