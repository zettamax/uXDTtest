var context = new window.AudioContext();
var osc = context.createOscillator();
osc.type = 'sine';
osc.frequency.value = 15000;
osc.start();

window.onload = function () {

    document.querySelector('#play').onclick = function () {
        var button = this;
        osc.connect(context.destination);
        button.disabled = true;
        setTimeout(function () {
            osc.disconnect(context.destination);
            button.disabled = false;
        }, 1000);
    };

    document.querySelector('#listen').onclick = function () {
        alert('Not implemented');
    };

};