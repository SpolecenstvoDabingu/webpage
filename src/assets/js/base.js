function timeConverter(timestamp) {
    var t = new Date(timestamp * 1000);
    return [t.getDate(), t.getMonth() + 1, t.getFullYear()].join(".")
}