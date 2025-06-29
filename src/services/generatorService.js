import { reportDataReader } from "../API/API.js";
const decoder = new TextDecoder();


async function fetchReportData(params) {
  const reader = await reportDataReader(params);
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }
  return result;
}

function downloadTextAsScvFile(text) {
  const blob = new Blob([text], { type: "text/csv" });
  const a = document.createElement("a");
  a.download = "input.csv";
  a.href = URL.createObjectURL(blob);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export {fetchReportData, downloadTextAsScvFile}