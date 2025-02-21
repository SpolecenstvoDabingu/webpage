function generateEpisodes(data) {
    const seriesKey = parseURL()["series"];
    const series = getSeries(data, seriesKey);
    if(!series) return;

    const episodesElement = document.getElementById("episodes");

    episodesElement.innerHTML = series.episodes.map((episode, index) => {
        if (index % 2 === 0) {
            return `
                ${index > 0 ? "</div>" : ""}
                <div class="row py-2">
                    <div class="col-md-6 d-flex align-items-center">
                        <a href="${getBaseURL()}/episode.html?series=${seriesKey}&season=${episode.season}&episode=${episode.episode}" class="d-flex w-100 text-decoration-none">
                            <div class="position-relative flex-shrink-0" style="width: 35%;">
                                <img src="${episode.thumbnail}" alt="${episode.name}" class="img-fluid rounded-start" 
                                    style="object-fit: cover; width: 100%; height: auto;">
                                <div class="fade-overlay"></div>
                            </div>
                            <div class="flex-grow-1 text-end px-3">
                                <h4 class="fw-bold text-spolecenstvo mb-0">${episode.name}</h4>
                                <h7 class="fw-italic text-spolecenstvo">S${leadingChar(episode.season)}E${leadingChar(episode.episode)}</h7>
                                <p class="text-muted mb-0 description text-spolecenstvo">${episode.description}</p>
                            </div>
                        </a>
                    </div>
            `;
        }
    
        return `
            <div class="col-md-6 d-flex align-items-center">
                <a href="${getBaseURL()}/serial.html?series=${seriesKey}&season=${episode.season}&episode=${episode.episode}" class="d-flex w-100 text-decoration-none">
                    <div class="position-relative flex-shrink-0" style="width: 35%;">
                        <img src="${series.thumbnail}" alt="${series.name}" class="img-fluid rounded-start" 
                            style="object-fit: cover; width: 100%; height: auto;">
                        <div class="fade-overlay"></div>
                    </div>
                    <div class="flex-grow-1 text-end px-3">
                        <h4 class="fw-bold text-spolecenstvo">${series.name}</h4>
                        <p class="text-muted mb-0 description text-spolecenstvo">${series.description}</p>
                    </div>
                </a>
            </div>
        `;
    }).join('') + (data.length % 2 !== 0 ? "</div>" : "");
}



function runMakers(data) {
    generateEpisodes(data);
}