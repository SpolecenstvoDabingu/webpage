function get_series_with_serials(data) {
    var result = [];


    data.forEach(series => {
        if(series.episodes.length > 0) {
            result.push(series);
        }
    });


    return result;
}


function make_serials(data) {
    const serialsElement = document.getElementById("serials");

    serialsElement.innerHTML = get_series_with_serials(data).map((series, index) => {
        if (index % 2 === 0) {
            return `
                ${index > 0 ? "</div>" : ""}
                <div class="row py-2">
                    <div class="col-md-6 d-flex align-items-center">
                        <a href="#" class="d-flex w-100 text-decoration-none">
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
        }
    
        return `
            <div class="col-md-6 d-flex align-items-center">
                <a href="#" class="d-flex w-100 text-decoration-none">
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
    make_serials(data);
}