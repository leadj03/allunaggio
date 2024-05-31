document.getElementById('startButton').addEventListener('click', function() {
    let massa = parseFloat(document.getElementById('massa').value);
    let velocita = parseFloat(document.getElementById('velocita').value);
    let gL = 1.66;
    let h = 100;  // Altezza iniziale fittizia per semplicità

    if (isNaN(massa) || isNaN(velocita) || massa < 100 || massa > 10000 || velocita < 0 || velocita > 500) {
        alert('Inserisci valori validi per massa e velocità.');
        return;
    }

    let discriminant = velocita * velocita + 2 * gL * h;
    if (discriminant < 0) {
        alert('Impossibile calcolare il tempo di allunaggio con i valori inseriti.');
        return;
    }

    let t1 = (-velocita + Math.sqrt(discriminant)) / gL;
    let t2 = (-velocita - Math.sqrt(discriminant)) / gL;

    let t = Math.max(t1, t2); // Consideriamo il tempo positivo

    document.getElementById('tempo').textContent = `Tempo di allunaggio: ${t.toFixed(2)} secondi`;

    // Simulazione animazione con immagine della navicella
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let y = 0;
    let animationTime = t * 1000; // in millisecondi
    let startTime = null;

    let shipImage = new Image();
    shipImage.src = 'ship.png'; // Immagine della navicella

    shipImage.onload = function() {
        function draw(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            y = (progress / animationTime) * canvas.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(shipImage, canvas.width / 2 - shipImage.width / 2, y);

            if (progress < animationTime) {
                requestAnimationFrame(draw);
            }
        }

        canvas.width = 400;
        canvas.height = 400;
        requestAnimationFrame(draw);
    };
});

