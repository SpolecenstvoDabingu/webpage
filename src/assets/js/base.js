function timeConverter(timestamp) {
    var t = new Date(timestamp * 1000);
    return [t.getDate(), t.getMonth() + 1, t.getFullYear()].join(".")
}


document.addEventListener("DOMContentLoaded", function() {
    // https://raw.githubusercontent.com/SpolecenstvoDabingu/releases/refs/heads/main/data.json
    fetch('https://raw.githubusercontent.com/SpolecenstvoDabingu/releases/refs/heads/main/data.json')
        .then(response => response.json())
        .then(data => {
            runMakers(data)
        });
});