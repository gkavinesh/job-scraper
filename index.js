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
    displayResults(data.jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    resultsDiv.innerHTML = `<p>Error fetching jobs. Please try again later.</p>`;
  }
}

function displayResults(jobs) {
    resultsDiv.innerHTML = ""; // Clear previous results
  
    if (!jobs || jobs.length === 0) {
      resultsDiv.innerHTML = `<p>No jobs found for your search.</p>`;
      return;
    }
  
    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company || "Not specified"}</p>
        <p><strong>Location:</strong> ${job.location || "Not specified"}</p>
        <p><strong>Type:</strong> ${job.employmentType || "Not specified"}</p>
        <p><strong>Description:</strong> ${job.description || "No description provided"}</p>
        <p><strong>Posted:</strong> ${job.timeAgoPosted || "Not available"}</p>
        <div>
          <strong>Links:</strong>
          ${job.jobProviders
            .map(
              (provider) =>
                `<a href="${provider.url}" target="_blank">${provider.jobProvider}</a>`
            )
            .join(", ")}
        </div>
      `;
      resultsDiv.appendChild(jobCard);
    });
  }

searchButton.addEventListener("click", searchJobs);
