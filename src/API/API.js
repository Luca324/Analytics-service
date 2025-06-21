const AGGREGATE_URL = `http://localhost:3000/aggregate?rows=1000`;

function aggregatedDataReader(uploadedFile) {

    const formData = new FormData();
    formData.append("file", uploadedFile, "report.csv");
    const decoder = new TextDecoder();

    fetch(AGGREGATE_URL, {
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