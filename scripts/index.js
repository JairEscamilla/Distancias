(() => {
    const directionsService = new google.maps.DirectionsService();

    const reader = new FileReader();
    const calculateButton = document.getElementById("calculateButton");
    const inputElement = document.getElementById("fileInput");
    const results = document.getElementsByClassName("results")[0]
   
    calculateButton.onclick = () => {
        reader.readAsText(inputElement.files[0])
    }

    reader.onloadend = () => {
        const csvRows = reader.result.split("\n").slice(1)
        csvRows.forEach((row, i) => {
            const [origin, destination] = row.split('","').map(element => element.replaceAll('"', "").replaceAll(" ", ""))

            directionsService.route({
                origin,
                destination,
                travelMode: "DRIVING"
            }, (response, status) => {
                const leg = response.routes[0].legs[0]
                const distance = leg.distance.text;
                const duration = leg.duration.text

                const newDiv = document.createElement("div")

                newDiv.innerHTML = `
                        <b>Origen: </b> ${origin}
                        <b>Destino: </b> ${destination}
                        <b>Distancia: </b> ${distance}
                        <b>Tiempo: </b> ${duration}
                `
                results.appendChild(newDiv)
            })
        });
    }
})();