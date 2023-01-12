let locational = {
    apiKey1: "b07415a05f19060446ae1095ee37676f",
    fetchLocational: function (city) {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&units=metric&limit=5&appid="
            + this.apiKey1
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => this.displayLocational(data))

            .catch(error => {
                alert("Can't seem to find it.")
            });
    },
    displayLocational: function (data) {
        const { name } = data[0];
        const { lat } = data[0];
        const { lon } = data[0];
        document.querySelector('.city').innerText = "Coordinates: " + name;
        document.querySelector('.GeoLoc').innerText = `${name} sits at ${lon} longitude and ${lat} latitude`;
    },
    search: function () {
        this.fetchLocational(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button")
    .addEventListener("click", function () {
        locational.search();
    });

document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            locational.search();
        }
    });

