const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "e085a61092484106380f5fc7d024b33d"
}

const input = document.querySelector("#input")
input.addEventListener("keydown", enter)

function enter(e) {
    if (e.keyCode===13) {
        getInfo (input.value);
        }
}

async function getInfo(data) {
    const loading = document.querySelector("#loading");
    const error = document.querySelector("#error");

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {
        const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`);
        const result = await res.json();

        if (result.cod !== 200) {
            throw new Error("City not found");
        }

        displayResult(result);
    } catch (err) {
        error.textContent = "City not found. Please try again.";
        error.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function displayResult(result) {
    document.querySelector("#city").textContent =
        `${result.name}, ${result.sys.country}`;

    getOurDate();

    document.querySelector("#temperature").innerHTML =
        `${Math.round(result.main.temp)}<span>°</span>`;

    document.querySelector("#feelsLike").innerHTML =
        `Feels like ${Math.round(result.main.feels_like)}<span>°</span>`;

    document.querySelector("#conditions").textContent =
        result.weather[0].main;

    document.querySelector("#variation").innerHTML =
        `Min: ${Math.round(result.main.temp_min)}<span>°</span> 
         Max: ${Math.round(result.main.temp_max)}<span>°</span>`;

    document.querySelector("#humidity").textContent =
        `Humidity: ${result.main.humidity}%`;

    document.querySelector("#wind").textContent =
        `Wind: ${Math.round(result.wind.speed)} m/s`;

    setBackground(result.weather[0].main);
}


function getOurDate () {
    const myDate = new Date;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()]

    let todayDate = myDate.getDate();

    
    let month =months[myDate.getMonth()];

    let year = myDate.getFullYear();

    let showDate = document.querySelector("#date");
    showDate.textContent = ` ${day} ` + ` ${todayDate} ` + ` ${month} ` + ` ${year} `


}

function setBackground(weather) {
    let body = document.body;

    if (weather === "Clear") {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    } else if (weather === "Clouds") {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1603437873662-dc1f44901825?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    } else if (weather === "Rain" || weather === "Drizzle") {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1511634829096-045a111727eb?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    } else if (weather === "Snow") {
        body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }
}

