function getLatestEpisodes(data, number = 3) {
    const allEpisodes = [];

    data.forEach(series => {
        var episodes = series.episodes;
        episodes.map(e => e.series = series);
        var scenes = series.scenes;
        scenes.map(e => e.series = series);
        var movies = series.movies;
        movies.map(e => e.series = series);
        allEpisodes.push(...episodes);
        allEpisodes.push(...scenes);
        allEpisodes.push(...movies);
    });
    
    allEpisodes.sort((a, b) => b.timestamp - a.timestamp);

    return allEpisodes.slice(0, number);
}

function getSeriesWithLatestEpisodes(data, number = 3) {
    allSeries = []

    data.forEach(series => {
        var latestItem = null;
        series.episodes.forEach(episode => {
            if(latestItem == null || latestItem.timestamp < episode.timestamp) {
                latestItem = episode;
            }
        })
        series.scenes.forEach(scene => {
            if(latestItem == null || latestItem.timestamp < scene.timestamp) {
                latestItem = scene;
            }
        })
        series.movies.forEach(movie => {
            if(latestItem == null || latestItem.timestamp < movie.timestamp) {
                latestItem = movie;
            }
        })
        if(latestItem != null) {
            allSeries.push({"serie": series, "episode": latestItem});
        }
    })

    return allSeries.slice(0, number)
}

function make_carousel(data) {
    const latestSeasons = getSeriesWithLatestEpisodes(data);
    const carouselContent = document.getElementById("carouselContent");

    carouselContent.innerHTML = latestSeasons.map((data, index) => {
    const serie = data.serie;

    return `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <a href="#">
                <div class="d-flex justify-content-center align-items-center spolecenstvo-carousel">
                    <img src="${serie.banner}" alt="${serie.name}" class="d-block w-100" style="object-fit: cover; height: 100%; border-radius: 10px;">
                    <div class="carousel-caption d-none d-md-block pb-0">
                        <p class="fs-4 m-0">${serie.name}</p>
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
        return `
            <tr>
                <td rowspan="2" class="w-5">
                    <img src="${episode.thumbnail}" alt="${episode.name}" class="d-block mr-2 news-image pr-2 my-1" style="">
                </td>
                <td class="w-50">
                    <h6>${episode.series.name} - ${episode.name}</h6>
                </td>
                <td rowspan="2" class="w-10 align-text-top">
                    <p class="text-end fs-7 fst-italic text-secondary">${timeConverter(episode.timestamp)}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p class="description">${episode.description}</p>
                </td>
            </tr>
        `
        }).join('');
}


function runMakers(data) {
    make_carousel(data);
    make_news(data);
}