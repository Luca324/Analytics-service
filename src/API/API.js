const AGGREGATE_URL = `http://localhost:3000/aggregate?rows=1000`;

function aggregatedDataReader(uploadedFile) {

    const formData = new FormData();
    formData.append("file", uploadedFile, "report.csv");

    return fetch(AGGREGATE_URL, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.body)
        .then((rb) => {
            const reader = rb.getReader();
            return reader

        })
        .catch((e) => {
            console.log("error", e);
        });
}

function reportDataReader(params) {
    const url = `http://localhost:3000/report?${params.toString()}`;
    
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.body)
      .then(async (rb) => {
        const reader = rb.getReader();
        return reader})
}

export {aggregatedDataReader, reportDataReader}