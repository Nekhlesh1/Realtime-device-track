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

const markers = {}  
socket.on("recieve-location", (data) =>
{
    const {id, latitude, longitude} = data
    map.setView([latitude, longitude], 16)
    if(markers[id])
    {
        markers[id].setLatLng([latitude, longitude])
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
})
socket.on("user-disconnected", (id ) =>{
    if(markers[id]){
        map.removeLayer(markers[id] )
        delete markers[id]  
    }

})