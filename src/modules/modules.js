export default function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const p = position.coords;
        return {
            longitude: p.longitude,
            latitude: p.latitude
        }
    })
}