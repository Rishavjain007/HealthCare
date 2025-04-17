// Function to fetch and display doctor data
async function fetchDoctorData() {
  try {
      const response = await fetch('../assets/data/doctor.json');
      const jsonData = await response.json();
      console.log("Doctors:", jsonData);

      displayDoctorData(jsonData.Doctors);
  } catch (error) {
      console.error('Error fetching doctor JSON data:', error);
  }
}

// Function to render doctor data into the DOM
function displayDoctorData(doctors) {
  const container = document.querySelector('.page-grid');

  if (!container || !doctors) return;

  doctors.forEach(doctor => {
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

// Function to fetch and display story data
async function fetchStoryData() {
  try {
      const response = await fetch('../assets/data/story.json');
      const jsonData = await response.json();
      console.log("Stories:", jsonData);

      displayStoryData(jsonData.Stories);
  } catch (error) {
      console.error('Error fetching story JSON data:', error);
  }
}

// Function to render story data into the DOM
function displayStoryData(stories) {
  const container = document.querySelector('.stories-grid');

  if (!container || !stories) return;

  stories.forEach(story => {
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

// Call both fetch functions
fetchDoctorData();
fetchStoryData();
