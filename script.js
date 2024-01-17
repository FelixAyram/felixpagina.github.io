var prevTotalBid = 0;
var prevTotalAsk = 0;

// Variable para almacenar el estado del sonido
var soundEnabled = true;

function consultarAPI() {
    var apiUrl = 'https://criptoya.com/api/bybitp2p/usdt/ars/2';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var totalBid = data.totalBid;
            var totalAsk = data.totalAsk;

            // Verificar si el sonido está habilitado y si hay un cambio en el precio
            if (soundEnabled && (totalBid !== prevTotalBid || totalAsk !== prevTotalAsk)) {
                reproducirSonido(totalBid, totalAsk);
            }

            mostrarResultados(totalBid, totalAsk);
            calcularYMostrarSpread(totalBid, totalAsk);
        })
        .catch(error => console.error('Error al consultar la API:', error));
}

function mostrarResultados(totalBid, totalAsk) {
    var BUYDiv = document.getElementById('BUY');
    var SELLDiv = document.getElementById('SELL');

    BUYDiv.innerHTML = 'precio para que compres: ' + totalBid;
    SELLDiv.innerHTML = 'precio para que vendas: ' + totalAsk;

    // Comparar con el precio anterior y agregar la clase correspondiente
    if (totalBid > prevTotalBid) {
        BUYDiv.classList.remove('blink-red', 'blink-red-dark');
        BUYDiv.classList.add('blink-green');
    } else if (totalBid < prevTotalBid) {
        BUYDiv.classList.remove('blink-green', 'blink-green-dark');
        BUYDiv.classList.add('blink-red');
    } else {
        BUYDiv.classList.remove('blink-green', 'blink-red', 'blink-green-dark', 'blink-red-dark');
    }

    if (totalAsk > prevTotalAsk) {
        SELLDiv.classList.remove('blink-red', 'blink-red-dark');
        SELLDiv.classList.add('blink-green');
    } else if (totalAsk < prevTotalAsk) {
        SELLDiv.classList.remove('blink-green', 'blink-green-dark');
        SELLDiv.classList.add('blink-red');
    } else {
        SELLDiv.classList.remove('blink-green', 'blink-red', 'blink-green-dark', 'blink-red-dark');
    }

    // Actualizar los valores anteriores
    prevTotalBid = totalBid;
    prevTotalAsk = totalAsk;
}

function calcularYMostrarSpread(totalBid, totalAsk) {
    var spread = totalAsk - totalBid;
    var spreadPercentage = (spread / totalAsk) * 100;

    var spreadDiv = document.getElementById('SPREAD');
    spreadDiv.innerHTML = 'Diferencia: ' + spread.toFixed(2) + ' | Porcentaje: ' + spreadPercentage.toFixed(2) + '%';

}

var conversionInput = document.getElementById('conversionInput');
conversionInput.addEventListener('input', function () {
    convertirYMostrarResultado(conversionInput.value);
});

function convertirYMostrarResultado(cantidadPesos) {
    var TotalBid = prevTotalBid;
    var cantidadCripto = cantidadPesos / TotalBid;
    var cuidadospread = 5;

    var resultadoConversionDiv = document.getElementById('resultadoConversion');
    resultadoConversionDiv.innerHTML = 'Son: ' + cantidadCripto.toFixed(2) + " usdt";
}

// Función para reproducir el sonido
function reproducirSonido(totalBid, totalAsk) {
    var audio = new Audio('sonido.mp3'); // Reemplaza 'ruta_del_sonido.mp3' con la ruta de tu archivo de sonido
    audio.play();
}

// Resto del código...

// Función para habilitar/deshabilitar el sonido
function toggleSound() {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
        // Si el sonido está habilitado, reproduce un sonido para verificar que funcione
        reproducirSonido(0, 0);
    }
}

consultarAPI();
setInterval(consultarAPI, 5000);

function toggleDarkMode() {
    var container = document.getElementById('container');
    container.classList.toggle('dark-mode');
}
