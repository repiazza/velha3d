var inputumElement = document.getElementById("rotateX");
var inputdoisElement = document.getElementById("rotateY");
var inputtresElement = document.getElementById("rotateZ");

inputumElement.addEventListener("input", function () {
    inputum();
});

inputdoisElement.addEventListener("input", function () {
    inputdois();
});

inputtresElement.addEventListener("input", function () {
    inputtres();
});

function inputum() {
    var inputValue = inputumElement.value;
    document.documentElement.style.setProperty('--inputum', inputValue + "%");
}

function inputdois() {
    var inputValue = inputdoisElement.value;
    document.documentElement.style.setProperty('--inputdois', inputValue + "%");
}

function inputtres() {
    var inputValue = inputtresElement.value;
    document.documentElement.style.setProperty('--inputtres', inputValue + "%");
}

// Chame inputum() inicialmente para definir o valor inicial
window.addEventListener("load", () => {

    setTimeout(iniciar, 300)

    function iniciar() {
        inputum();
        inputdois();
        inputtres();
    }

})


