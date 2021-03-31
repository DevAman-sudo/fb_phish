// Socket Io //
const socket = io();

// function to fetch user public ip //
async function userIp() {
    let apiData = await fetch('https://api.ipify.org?format=json');
    let jsonData = await apiData.json();
    return jsonData.ip;
}
userIp().then(response => {
    socket.emit('user_ip' , response);
});
