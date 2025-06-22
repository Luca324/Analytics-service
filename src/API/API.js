const AGGREGATE_URL = `http://localhost:3000/aggregate?rows=10000`;

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
        .catch(e => e)
}

function reportDataReader(params) {
    const url = `http://localhost:3000/report?${params.toString()}`;

    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.body)
        .then(async (rb) => {
            const reader = rb.getReader();
            return reader
        }).catch(e => e)
}

function saveStatistics(status = "fail", fileName = "NoName", stats = {}) {
    const id = Date.now()

    let history = getHistory()

    if (status === "success") {
        history[id] = { fileName, status, stats }
    } else {
        history[id] = { fileName, status }
    }
    localStorage.setItem('history', JSON.stringify(history))
    console.log(localStorage.getItem('history'))

}

function getHistory() {
    let history = localStorage.getItem('history')
    if (!history) history = {}
    else history = JSON.parse(history)
    return history
}

function clearHistory() {
    console.log('clearing history')
    localStorage.setItem('history', '{}')
}

export { aggregatedDataReader, reportDataReader, saveStatistics, getHistory, clearHistory }