// Global doctor pagination
let allDoctorData = [];
let currentPage = 1;
const itemsPerPage = 9;

// Global story pagination
let allStoryData = [];
let currentStoryPage = 1;
const storyItemsPerPage = 9; // Adjust as needed

// Fetch and render doctor data
async function fetchDoctorData() {
  try {
    const response = await fetch('../assets/data/doctor.json');
    const jsonData = await response.json();
    allDoctorData = jsonData.Doctors || [];

    displayDoctorData(currentPage);
    setupDoctorPagination();
  } catch (error) {
    console.error('Error fetching doctor JSON data:', error);
  }
}

function displayDoctorData(page) {
  const container = document.querySelector('.page-grid');
  if (!container || !allDoctorData.length) return;

  container.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const doctorsToShow = allDoctorData.slice(start, start + itemsPerPage);

  doctorsToShow.forEach(doctor => {
    const card = `
      <div class="page-card">
        <img src="${doctor.image}" alt="Doctor image" class="page-img">
        <div class="page-info">
          <h3 class="page-name">${doctor.name}</h3>
          <p class="page-experience"><strong>Experience:</strong> ${doctor.experience}</p>
          <p class="page-specialty"><strong>Specialty:</strong> ${doctor.specialty}</p>
          <a href="#" class="know-more">Know More</a>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function setupDoctorPagination() {
  const paginationContainer = document.querySelector(".doctor-pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(allDoctorData.length / itemsPerPage);
  paginationContainer.innerHTML = "";

  if (currentPage > 1) {
    const prev = document.createElement("a");
    prev.textContent = "« Previous";
    prev.href = "#";
    prev.onclick = (e) => {
      e.preventDefault();
      currentPage--;
      displayDoctorData(currentPage);
      setupDoctorPagination();
    };
    paginationContainer.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement("a");
    link.textContent = i;
    link.href = "#";
    if (i === currentPage) link.classList.add("active");
    link.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      displayDoctorData(currentPage);
      setupDoctorPagination();
    };
    paginationContainer.appendChild(link);
  }

  if (currentPage < totalPages) {
    const next = document.createElement("a");
    next.textContent = "Next »";
    next.href = "#";
    next.onclick = (e) => {
      e.preventDefault();
      currentPage++;
      displayDoctorData(currentPage);
      setupDoctorPagination();
    };
    paginationContainer.appendChild(next);
  }
}

// Fetch and render story data
async function fetchStoryData() {
  try {
    const response = await fetch('../assets/data/story.json');
    const jsonData = await response.json();
    allStoryData = jsonData.Stories || [];

    displayStoryData(currentStoryPage);
    setupStoryPagination();
  } catch (error) {
    console.error('Error fetching story JSON data:', error);
  }
}

function displayStoryData(page) {
  const container = document.querySelector('.stories-grid');
  if (!container || !allStoryData.length) return;

  container.innerHTML = "";
  const start = (page - 1) * storyItemsPerPage;
  const storiesToShow = allStoryData.slice(start, start + storyItemsPerPage);

  storiesToShow.forEach(story => {
    const card = `
      <div class="story-card">
        <h3 class="story-title">${story.title}</h3>
        <p class="story-description">${story.description}</p>
        <p class="story-date">${story.publishing_Date}</p>
        <a href="#" class="read-more">Read More</a>
      </div>
    `;
    container.innerHTML += card;
  });
}

function setupStoryPagination() {
  const paginationContainer = document.querySelector(".story-pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(allStoryData.length / storyItemsPerPage);
  paginationContainer.innerHTML = "";

  if (currentStoryPage > 1) {
    const prev = document.createElement("a");
    prev.textContent = "« Previous";
    prev.href = "#";
    prev.onclick = (e) => {
      e.preventDefault();
      currentStoryPage--;
      displayStoryData(currentStoryPage);
      setupStoryPagination();
    };
    paginationContainer.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement("a");
    link.textContent = i;
    link.href = "#";
    if (i === currentStoryPage) link.classList.add("active");
    link.onclick = (e) => {
      e.preventDefault();
      currentStoryPage = i;
      displayStoryData(currentStoryPage);
      setupStoryPagination();
    };
    paginationContainer.appendChild(link);
  }

  if (currentStoryPage < totalPages) {
    const next = document.createElement("a");
    next.textContent = "Next »";
    next.href = "#";
    next.onclick = (e) => {
      e.preventDefault();
      currentStoryPage++;
      displayStoryData(currentStoryPage);
      setupStoryPagination();
    };
    paginationContainer.appendChild(next);
  }
}

// Call both fetchers
fetchDoctorData();
fetchStoryData();
