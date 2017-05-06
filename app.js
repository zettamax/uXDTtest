var context = new window.AudioContext();
var osc = context.createOscillator();
var canvas, canvasCtx, drawVisual;

osc.type = 'sine';
osc.frequency.value = 15000;
osc.start();

window.onload = function () {

    canvas = document.querySelector('#graph');
    canvasCtx = canvas.getContext("2d");

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
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true},
                function (stream) {
                    analyzeStream(stream);
                },
                function () {
                    alert('Error capturing audio.');
                }
            );
        } else {
            alert('Not supported browser.');
        }
    };

};

function analyzeStream(stream) {
    var micSource = context.createMediaStreamSource(stream);
    var analyser = context.createAnalyser();
    var filter = createFilter();

    micSource.connect(filter);

    analyser.fftSize = 32;
    filter.connect(analyser);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH - bufferLength + 1) / bufferLength;
        var barHeight;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

            x += barWidth + 1;
        }
    }

    draw();

}

function createFilter() {
    var filter = context.createBiquadFilter();
    filter.frequency.value = 14900;
    filter.type = 'highpass';
    filter.Q.value = 0;

    return filter;
}