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

function parseURL() {
    var queryString = window.location.search;
    queryString = queryString.length > 0 ? queryString.slice(1, queryString.length) : queryString;
    var out = {};
    for(const item of queryString.split("&")) {
        var [key, value] = item.split("=");
        out[key] = value;
    }
    return out;
}

function getSeries(data, key) {
    if(!key) return null;

    for(var series of data) {
        if(series.nameShort == key) return series;
    };

    return null;
}

function leadingChar(input, ch = "0", number = 2) {
    return input.toString().padStart(number, ch);
}