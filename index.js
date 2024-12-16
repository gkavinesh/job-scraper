const searchButton = document.getElementById("search-btn");
const resultsDiv = document.getElementById("results");

const API_KEY = "2584577010msh77a82e7bba98997p12d905jsn5157fdba8a09";
const API_HOST = "jobs-api14.p.rapidapi.com";

async function searchJobs() {
  const jobTitle = document.getElementById("search-input").value;
  const location = document.getElementById("location-input").value;
  const employmentType = document.getElementById("employment-type").value;

  if (!jobTitle || !location) {
    alert("Please fill in both the job title and location!");
    return;
  }

  const url = `https://${API_HOST}/v2/list?query=${jobTitle}&location=${location}&employmentTypes=${employmentType}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    resultsDiv.innerHTML = `<p>Error fetching jobs. Please try again later.</p>`;
  }
}

function displayResults(data) {
  resultsDiv.innerHTML = ""; // Clear previous results

  if (!data || !data.jobs || data.jobs.length === 0) {
    resultsDiv.innerHTML = `<p>No jobs found for your search.</p>`;
    return;
  }

  data.jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Type:</strong> ${job.employmentType}</p>
      <p><strong>Company:</strong> ${job.companyName}</p>
      <a href="${job.url}" target="_blank">View Job</a>
    `;
    resultsDiv.appendChild(jobCard);
  });
}

searchButton.addEventListener("click", searchJobs);
