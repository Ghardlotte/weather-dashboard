var apiKey = "399ffc0135a7930784214e0e0d74572d";



function getSearchVal() {
    var searchValue = document.querySelector("#search-value").value;
    searchWeather(searchValue);
    makeRow(searchValue);
    
    }

function makeRow(searchValue) {
    var liEl = document.createElement("li")
    liEl.classList.add("list-group-item", "list-group-item-action");
    var text = searchValue;
    liEl.textContent = text;
    var historyEl = document.querySelector(".history");
    historyEl.onclick = function() {
        if(EventTarget.tagName == "LI") {
            searchWeather(target.textContent)
        }
    }
    historyEl.appendChild(liEl);
}


function searchWeather(searchValue) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=399ffc0135a7930784214e0e0d74572d")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
    
        todayEl = document.querySelector("#today");
        todayEl.textContent = "";


        var titleEl = document.createElement("h3")
        titleEl.classList.add("card-title");
        titleEl.textContent = data.name + "(" + new Date().toLocaleDateString() + ")";
        var cardEl = document.createElement("div");
        cardEl.classList.add("card");
        var windEl = document.createElement("p");
        windEl.classList.add("card-text");
        var humidEl = document.createElement("p");
        humidEl.classList.add("card-text");
        humidEl.textContent = "Humidity: " + data.main.humidity + " %";
        var tempEl = document.createElement("p");
        tempEl.classList.add("card-text");
        tempEl.textContent = "Temperature: " + data.main.temp + "°F";
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList.add("card-body");
       

        cardBodyEl.appendChild(titleEl);
        cardBodyEl.appendChild(tempEl);
        cardBodyEl.appendChild(humidEl);
        cardBodyEl.appendChild(windEl);
        cardEl.appendChild(cardBodyEl);
        todayEl.appendChild(cardEl);
        
        getForecast(searchValue);
        getUvIndex(data.coord.lat, data.coord.lon);  
    }
)}
   

   

    function getForecast(searchValue) {
        fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=399ffc0135a7930784214e0e0d74572d&units=metric")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var forecastEl = document.querySelector("#forecast");
            
            forecastRowEl = document.createElement("div");
            forecastRowEl.className = "\"row\""

            for (var i=0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !==-1) {

                    var colEl = document.createElement("div");
                    colEl.classList.add("col-md-2");
                    var cardEl = document.createElement("div");
                    cardEl.classList.add("card", "bg-secondary", "text-white");
                    var windEl = document.createElement("p");
                    windEl.classList.add("card-text");
                    windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + "MPH";
                    var humidityEl = document.createElement("p");
                    humidityEl.classList.add("card-text");
                    humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                    var bodyEl = document.createElement("div");
                    bodyEl.classList.add("card-body", "p-2");
                    var titleEl = document.createElement("h5");
                    titleEl.classList.add("card-title");
                    titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
                    var imgEl = document.createElement("img");
                    imgEl.setAttribute("src", "http//openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" );
                    var t1El = document.createElement("p");
                    t1El.classList.add("card-text");
                    t1El.textContent = "Temp" + data.list[i].main.temp_max + "°F";
                    var h1El = document.createElement('p');
                    h1El.classList.add("card-text");
                    h1El.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                    colEl.appendChild(cardEl);
                    bodyEl.appendChild(titleEl);
                    bodyEl.appendChild(imgEl);
                    bodyEl.appendChild(windEl);
                    bodyEl.appendChild(humidityEl);
                    bodyEl.appendChild(t1El);
                    bodyEl.appendChild(h1El);
                    cardEl.appendChild(bodyEl);
                    forecastEl.appendChild(colEl);
                }
            }
        });
    }

    
   

    function getUvIndex(lat, lon) {
        fetch("http://api.openweathermap.org/data/2.5/uvi?appid=399ffc0135a7930784214e0e0d74572d&lat=" + lat + "&lon=" + lon)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var bodyEl = document.querySelector(".card-body");
            var uvEl = document.createElement("p");
            uvEl.textContent =  "UV Index: ";
            var buttonEl = document.createElement("span");
            buttonEl.classList.add("btn", "btn-sm");
            buttonEl.innerHTML = data.value;

            if(data.value < 3){
                buttonEl.classList.add("btn-success");
            }
            else if (data.value < 7){
                buttonEl.classList.add("btn-warning")
            }
            else {
                buttonEl.classList.add("btn-danger");
            }

            bodyEl.appendChild(uvEl);
            uvEl.appendChild(buttonEl);
        })
    }
    

    document.querySelector("#search-button").addEventListener("click", getSearchVal);



