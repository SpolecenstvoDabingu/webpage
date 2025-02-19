function getLatestEpisodes(data, number = 3) {
    const allEpisodes = [];

    data.forEach(series => {
        allEpisodes.push(...series.episodes);
    });

    allEpisodes.sort((a, b) => b.timestamp - a.timestamp);

    return allEpisodes.slice(0, number);
}

function make_carousel(data) {
    const latestEpisodes = getLatestEpisodes(data);

    const carouselContent = document.getElementById("carouselContent");

    carouselContent.innerHTML = latestEpisodes.map((episode, index) => {
    const series = data.find(series => series.episodes.includes(episode));

    return `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <a href="${episode.video}" target="_blank">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px; background: #ddd; border-radius: 10px;">
                    <img src="${episode.thumbnail}" alt="${episode.name}" class="d-block w-100" style="object-fit: cover; height: 100%; border-radius: 10px;">
                    <div class="carousel-caption d-none d-md-block pb-0">
                        <h4>${series.name}</h4>
                        <h6>${episode.name}</h6>
                        <p>Sezóna ${(episode.season).toString().padStart(2, "0")} - Epizoda ${(episode.episode).toString().padStart(2, "0")}</p>
                    </div>
                </div>
            </a>
        </div>
    `
    }).join('');

    new bootstrap.Carousel(document.querySelector("#carouselExample"), {
        interval: 30000,
        wrap: true
    });
}

function make_news(data) {
    const latestEpisodes = getLatestEpisodes(data, 10);
    const newsElement = document.getElementById("news");

    newsElement.innerHTML = latestEpisodes.map((episode, index) => {
        const series = data.find(series => series.episodes.includes(episode));
    
        return `
            <tr>
                <td rowspan="2" class="w-5">
                    <img src="${episode.thumbnail}" alt="${episode.name}" class="d-block mr-2" style="object-fit: cover; max-height: 5em; border-radius: 10px;">
                </td>
                <td class="w-50">
                    <h6>${series.name} - ${episode.name}</h6>
                </td>
                <td rowspan="2" class="w-10 align-text-top">
                    <p class="text-end fs-7 fst-italic text-secondary">${timeConverter(episode.timestamp)}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>${episode.description}</p>
                </td>
            </tr>
        `
        }).join('');
}


document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/SpolecenstvoDabingu/releases/refs/heads/main/data.json') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            make_carousel(data);
            make_news(data);
        });
});