const socket = io();

// check if the browser supports geo location

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        socket.emit("send-location", {latitude, longitude});
    },(err) => {
        console.error(err)
    },
{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0

})
} 

// asking for location

const map = L.map("map").setView([0,0], 10)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution : "RealtimeWebApp"
}).addTo(map)