function getSeason(data, s) {
    var output = [];
    for(var season of data) {
        if(season.season == s) {
            output.push(season);
        }
    }
    
    return output;
}

function getEpisode(data, e) {
    for(var episode of data) {
        if(episode.episode == e) return episode;
    }
    
    return null;
}

function getNextEpisode(data, e) {
    return (getEpisode(data, (e - 1) + 2))
}

function getPrevEpisode(data, e) {
    return (getEpisode(data, e - 1))
}


function generateVideo(data) {
    const parsedData = parseURL();
    const seriesKey = parsedData["series"];
    const seasonNumber = parsedData["season"];
    const episodeNumber = parsedData["episode"];
    const series = getSeries(data, seriesKey);
    if(!series) return;
    const season = getSeason(series.episodes, seasonNumber);
    if(season.length == 0) return;
    const episode = getEpisode(season, episodeNumber);
    if(!episode) return;

    const episodeElement = document.getElementById("episode");
    const titleElement = document.getElementById("title");

    episodeElement.src = episode.video;
    titleElement.innerText = `${series.name} - S${leadingChar(episode.season)}E${leadingChar(episode.episode)} - ${episode.name}`;

    const nextElement = document.getElementById("next");
    const nextEpisode = getNextEpisode(season, episodeNumber);
    if(!nextEpisode) {
        nextElement.style.display = "none";
    } else {
        nextElement.style.display= "initial";
        nextElement.href = `${getBaseURL()}/serial.html?series=${seriesKey}&season=${nextEpisode.season}&episode=${nextEpisode.episode}`
    }

    
    const prevElement = document.getElementById("prev");
    const prevEpisode = getPrevEpisode(season, episodeNumber);
    if(!prevEpisode) {
        prevElement.style.display = "none";
    } else {
        prevElement.style.display= "initial";
        prevElement.href = `${getBaseURL()}/serial.html?series=${seriesKey}&season=${prevEpisode.season}&episode=${prevEpisode.episode}`
    }
}



function runMakers(data) {
    generateVideo(data);
}