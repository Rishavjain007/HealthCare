// ======== User Form Modal ========
function userForm() {
  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const form = document.getElementById("mainForm");
  const title = document.getElementById("formTitle");

  // Only run if elements exist (on pages with the form)
  if (!toggleFormBtn || !form || !title) return;

  let isSignUp = false;

  // Save new user to localStorage
  const saveUser = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === userData.email)) {
      alert("User with this email already exists!");
      return false;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userRegister", JSON.stringify(true));
    return true;
  };

  function ifregister() {
    const isUserRegister = JSON.parse(localStorage.getItem("userRegister"));
    if (isUserRegister) {
      document.getElementById("signupbtn").remove();
    }
  }
  ifregister();

  // Authenticate user on login
  const authenticateUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return (
      users.find(
        (user) => user.email === email && user.password === password
      ) || null
    );
  };

  // Input field generator
  const inputField = (type, id, placeholder, iconClass, spanTwo = false) => {
    return `
      <div class="input-wrapper" style="${
        spanTwo ? "grid-column: span 2;" : ""
      }">
        <i class="${iconClass}"></i>
        <input type="${type}" id="${id}" placeholder="${placeholder}" required>
      </div>
    `;
  };

  // Sign-up form
  const renderSignUpForm = () => {
    title.textContent = "Register as a new user";
    toggleFormBtn.textContent = "Login";

    form.innerHTML = `
      ${inputField("text", "fullName", "Full Name *", "fas fa-user")}
      ${inputField("number", "age", "Age *", "fas fa-birthday-cake")}
      ${inputField("email", "email", "Email Address *", "fas fa-envelope")}
      ${inputField("tel", "phone", "Phone Number *", "fas fa-phone")}
      ${inputField("password", "password", "Password *", "fas fa-lock")}
      ${inputField(
        "password",
        "confirmPassword",
        "Confirm Password *",
        "fas fa-lock"
      )}
      ${inputField(
        "text",
        "address",
        "Address *",
        "fas fa-map-marker-alt",
        true
      )}
      <div class="gender">
        <label><input type="radio" name="gender" value="male" checked> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
        <label><input type="radio" name="gender" value="other"> Other</label>
      </div>
      <button type="submit" class="register-btn">Register</button>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();

      const fullName = form.querySelector("#fullName").value.trim();
      const age = form.querySelector("#age").value.trim();
      const email = form.querySelector("#email").value.trim();
      const phone = form.querySelector("#phone").value.trim();
      const password = form.querySelector("#password").value;
      const confirmPassword = form.querySelector("#confirmPassword").value;
      const address = form.querySelector("#address").value.trim();
      const gender = form.querySelector('input[name="gender"]:checked').value;

      if (
        !fullName ||
        !age ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword ||
        !address
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const userData = {
        fullName,
        age,
        email,
        phone,
        password,
        address,
        gender,
      };
      if (saveUser(userData)) {
        alert("Registration successful! You can now login.");
        isSignUp = true;
        renderLoginForm();
      }
    };
  };

  // Login form
  const renderLoginForm = () => {
    title.textContent = "Login to Your Account";
    toggleFormBtn.textContent = "Sign Up";

    form.innerHTML = `
      ${inputField("email", "loginEmail", "Email *", "fas fa-envelope")}
      ${inputField("password", "loginPassword", "Password *", "fas fa-lock")}
      <button type="submit" class="register-btn" id="user-form-login">Login</button>
    `;

    form.onsubmit = (e) => {
      e.preventDefault();

      const email = form.querySelector("#loginEmail").value.trim();
      const password = form.querySelector("#loginPassword").value.trim();
      const loginusers = { email, password };
      localStorage.setItem("loginusers", JSON.stringify(loginusers));

      const user = authenticateUser(email, password);
      if (user) {
        window.location.href = "/";
      } else {
        alert("Invalid email or password!");
      }
    };
  };

  // Toggle between forms
  toggleFormBtn.addEventListener("click", () => {
    isSignUp = !isSignUp;
    isSignUp ? renderSignUpForm() : renderLoginForm();
  });

  // Check if user is already logged in and update button
  function checkLog() {
    const loginbtn = document.getElementById("loginbtn");
    if (!loginbtn) return;

    const userLoggedIn = JSON.parse(localStorage.getItem("loginusers"));
    if (userLoggedIn) {
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Logout";
      loginbtn.replaceWith(logoutBtn);
      logoutBtn.classList.add("logout");
      logoutBtn.classList.add("btn");
      logoutBtn.setAttribute("id" , "logoutBtn")
      // document.getElementById("loginbtn").style.display = "none";
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loginusers");
        window.location.reload();
      });
    }
  }

  // Initialize
  renderSignUpForm();
  checkLog();
}

// ======== Navbar ========
function navbar() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const mainNavbar = document.querySelector(".main-navbar");
  const dropdown = document.querySelector(".dropdown > a");
  const dropdownContainer = document.querySelector(".dropdown");

  // Hamburger menu functionality
  if (hamburger && navLinks && mainNavbar) {
    function toggleNavbar() {
      if (window.innerWidth < 1024) {
        if (navLinks.style.display === "flex") {
          navLinks.style.display = "none";
          mainNavbar.style.position = "sticky";
          mainNavbar.style.top = "0";
        } else {
          navLinks.style.display = "flex";
          mainNavbar.style.position = "relative";
          mainNavbar.style.top = "0";
        }
      }
    }

    hamburger.addEventListener("click", toggleNavbar);

    // Reset menu styles on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        navLinks.style.display = "flex";
        mainNavbar.style.position = "sticky";
        mainNavbar.style.top = "0";
        if (dropdownContainer) dropdownContainer.classList.remove("active");
      } else {
        navLinks.style.display = "none";
        mainNavbar.style.position = "sticky";
        mainNavbar.style.top = "0";
      }
    });
  }

  // Mobile dropdown functionality
  if (dropdown && dropdownContainer && navLinks) {
    if (window.innerWidth < 1024) {
      dropdown.innerHTML = `Services <i class="fa-solid fa-angle-down"></i>`;
    }

    dropdown.addEventListener("click", function (e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        dropdownContainer.classList.toggle("active");
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !dropdownContainer.contains(e.target) &&
        window.innerWidth < 1024 &&
        !navLinks.contains(e.target)
      ) {
        dropdownContainer.classList.remove("active");
      }
    });
  }
}

// ======== Patient Form ========
function patientform() {
  const form = document.getElementById("patient-form-registration-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get all form inputs
    const fullName = document
      .getElementById("patient-form-full-name")
      .value.trim();
    const email = document.getElementById("patient-form-email").value.trim();
    const dob = document.getElementById("patient-form-dob").value;
    const phone = document.getElementById("patient-form-phone").value.trim();
    const gender = document.getElementById("patient-form-gender").value;
    const state = document.getElementById("patient-form-state").value.trim();
    const city = document.getElementById("patient-form-city").value.trim();
    const zip = document.getElementById("patient-form-zip").value.trim();
    const relation = document
      .getElementById("patient-form-relation")
      .value.trim();
    const preferredDoctor = document
      .getElementById("patient-form-preferred-doctor")
      .value.trim();
    const preferredDate = document.getElementById(
      "patient-form-preferred-date"
    ).value;
    const aadhar = document.getElementById("patient-form-aadhar").value.trim();
    const symptoms = document
      .getElementById("patient-form-symptoms")
      .value.trim();
    const medicalReports = document.getElementById(
      "patient-form-medical-reports"
    ).files[0];
    const previousDoctors = document
      .getElementById("patient-form-previous-doctors")
      .value.trim();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const zipRegex = /^\d{5,6}$/;
    const aadharRegex = /^\d{12}$/;

    // Validation checks
    if (!fullName) return alert("Full Name is required.");
    if (!email || !emailRegex.test(email))
      return alert("Enter a valid Email Address.");
    if (!dob) return alert("Date of Birth is required.");
    if (!phone || !phoneRegex.test(phone))
      return alert("Enter a valid 10-digit Phone Number starting with 6-9.");
    if (!gender) return alert("Please select your Gender.");
    if (!state) return alert("State is required.");
    if (!city) return alert("City is required.");
    if (!zip || !zipRegex.test(zip))
      return alert("Enter a valid Zip/Pin Code.");
    if (!relation) return alert("Relation to patient is required.");
    if (!preferredDate) return alert("Preferred Date for Checkup is required.");
    if (!aadhar || !aadharRegex.test(aadhar))
      return alert("Enter a valid 12-digit Aadhar Number.");
    if (!symptoms) return alert("Please describe your symptoms.");

    // All validations passed
    const formData = {
      fullName,
      email,
      dob,
      phone,
      gender,
      state,
      city,
      zip,
      relation,
      preferredDoctor,
      preferredDate,
      aadhar,
      symptoms,
      medicalReports: medicalReports ? medicalReports.name : null,
      previousDoctors,
    };

    // Save to localStorage
    localStorage.setItem("patientData", JSON.stringify(formData));

    // Clear all input fields
    form.reset();

    // Success alert and redirection
    alert("Registration successful!");
    window.location.href = "index1.html";
  });
}

// ======== Doctor Page ========
function doctorpage() {
  const cardsContainer = document.getElementById("doctorCards");
  const searchInput = document.getElementById("search");
  const specialtyFilter = document.getElementById("specialtyFilter");
  const paginationContainer = document.querySelector(".doctor-pagination");

  // Only run if on doctor page
  if (
    !cardsContainer ||
    !searchInput ||
    !specialtyFilter ||
    !paginationContainer
  )
    return;

  let allDoctors = [];
  let filteredDoctors = [];
  let currentPage = 1;
  const cardsPerPage = 10;

  // Fetch doctor data from JSON
  fetch("../assets/data/doctor.json")
    .then((res) => res.json())
    .then((data) => {
      allDoctors = data.doctors || [];
      populateSpecialties(allDoctors);
      applyFilters();
    })
    .catch((error) => console.error("Error loading doctor data:", error));

  // Populate specialty filter dropdown
  function populateSpecialties(doctors) {
    const specialties = [
      ...new Set(doctors.map((doc) => doc.specialty)),
    ].sort();
    specialtyFilter.innerHTML = '<option value="">All Specialties</option>';

    specialties.forEach((spec) => {
      const option = document.createElement("option");
      option.value = spec;
      option.textContent = spec;
      specialtyFilter.appendChild(option);
    });
  }

  // Filter doctors based on search and specialty
  function applyFilters() {
    const search = searchInput.value.toLowerCase();
    const specialty = specialtyFilter.value;

    filteredDoctors = allDoctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(search) &&
        (specialty === "" || doc.specialty === specialty)
    );

    currentPage = 1;
    renderCards();
    setupPagination();
  }

  // Render the doctor cards for current page
  function renderCards() {
    cardsContainer.innerHTML = "";

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const doctorsToShow = filteredDoctors.slice(start, end);

    if (doctorsToShow.length === 0) {
      cardsContainer.innerHTML =
        "<p>No doctors found matching your criteria.</p>";
      return;
    }

    cardsContainer.innerHTML = doctorsToShow
      .map(
        (doc) => `
      <div class="doctor-page-card">
        <img src="${doc.image}" alt="${doc.name}" loading="lazy">
        <h3>${doc.name}</h3>
        <p><strong>Specialty:</strong> ${doc.specialty}</p>
        <p><strong>Experience:</strong> ${doc.experience}</p>
        <p><strong>Fees:</strong> Rs. ${doc.fees}</p>
        <div class="buttons">
          <button onclick="location.href='profile.html?email=${encodeURIComponent(
            doc.email
          )}'">
            View Profile
          </button>
          <button onclick="location.href='profile.html?email=${encodeURIComponent(
            doc.email
          )}'">Book Appointment</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Setup pagination
  function setupPagination() {
    const totalPages = Math.ceil(filteredDoctors.length / cardsPerPage);
    paginationContainer.innerHTML = "";

    const createLink = (label, page, isActive = false) => {
      const link = document.createElement("a");
      link.textContent = label;
      link.href = "#";
      if (isActive) link.classList.add("active");
      link.onclick = (e) => {
        e.preventDefault();
        currentPage = page;
        renderCards();
        setupPagination();
      };
      return link;
    };

    // Previous button
    if (currentPage > 1) {
      paginationContainer.appendChild(
        createLink("« Previous", currentPage - 1)
      );
    }

    // Page numbers - show first, last, and pages around current
    if (totalPages > 1) {
      // Always show first page
      paginationContainer.appendChild(createLink("1", 1, currentPage === 1));

      if (currentPage > 3) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Show pages around current
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentPage)
        );
      }

      if (currentPage < totalPages - 2) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Always show last page
      paginationContainer.appendChild(
        createLink(
          totalPages.toString(),
          totalPages,
          currentPage === totalPages
        )
      );
    } else {
      // Show all pages if less than 7
      for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentPage)
        );
      }
    }

    // Next button
    if (currentPage < totalPages) {
      paginationContainer.appendChild(createLink("Next »", currentPage + 1));
    }
  }

  // Event listeners
  searchInput.addEventListener("input", applyFilters);
  specialtyFilter.addEventListener("change", applyFilters);
}

// ======== Story Page ========
function storypage() {
  const container = document.querySelector(".stories-grid");
  const paginationContainer = document.querySelector(".story-pagination");

  // Only run if on story page
  if (!container || !paginationContainer) return;

  let allStoryData = [];
  let currentStoryPage = 1;
  const storyItemsPerPage = 9;

  // Fetch the JSON data
  async function fetchStoryData() {
    try {
      const response = await fetch("../assets/data/story.json");
      const jsonData = await response.json();
      allStoryData = jsonData.Stories || [];
      displayStoryData(currentStoryPage);
      setupPagination();
    } catch (error) {
      console.error("Error fetching story data:", error);
    }
  }

  // Display stories for current page
  function displayStoryData(page) {
    const start = (page - 1) * storyItemsPerPage;
    const storiesToShow = allStoryData.slice(start, start + storyItemsPerPage);

    container.innerHTML = storiesToShow
      .map(
        (story) => `
      <div class="story-card">
        <h3 class="story-title">${story.title}</h3>
        <p class="story-description">${story.description}</p>
        <p class="story-date">${story.publishing_Date}</p>
        <a href="#" class="read-more">Read More</a>
      </div>
    `
      )
      .join("");
  }

  // Setup pagination
  function setupPagination() {
    const totalPages = Math.ceil(allStoryData.length / storyItemsPerPage);
    paginationContainer.innerHTML = "";

    const createLink = (label, page, isActive = false) => {
      const link = document.createElement("a");
      link.textContent = label;
      link.href = "#";
      if (isActive) link.classList.add("active");
      link.onclick = (e) => {
        e.preventDefault();
        currentStoryPage = page;
        displayStoryData(currentStoryPage);
        setupPagination();
      };
      return link;
    };

    // Previous button
    if (currentStoryPage > 1) {
      paginationContainer.appendChild(
        createLink("« Previous", currentStoryPage - 1)
      );
    }

    // Page numbers
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentStoryPage)
        );
      }
    } else {
      // Show first page
      paginationContainer.appendChild(
        createLink("1", 1, currentStoryPage === 1)
      );

      if (currentStoryPage > 3) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Show pages around current
      const startPage = Math.max(2, currentStoryPage - 1);
      const endPage = Math.min(totalPages - 1, currentStoryPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentStoryPage)
        );
      }

      if (currentStoryPage < totalPages - 2) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Show last page
      paginationContainer.appendChild(
        createLink(
          totalPages.toString(),
          totalPages,
          currentStoryPage === totalPages
        )
      );
    }

    // Next button
    if (currentStoryPage < totalPages) {
      paginationContainer.appendChild(
        createLink("Next »", currentStoryPage + 1)
      );
    }
  }

  // Initialize
  fetchStoryData();
}

// ======== Blog Page ========
function blogpage() {
  const container = document.querySelector(".blogs-grid");
  const paginationContainer = document.querySelector(".blog-pagination");

  // Only run if on blog page
  if (!container || !paginationContainer) return;

  let allBlogData = [];
  let currentBlogPage = 1;
  const blogItemsPerPage = 6;

  // Fetch the blog data
  async function fetchBlogData() {
    try {
      const response = await fetch("../assets/data/blog.json");
      const jsonData = await response.json();
      allBlogData = jsonData.Blog || [];
      displayBlogData(currentBlogPage);
      setupPagination();
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  }

  // Display blog posts for current page
  function displayBlogData(page) {
    const start = (page - 1) * blogItemsPerPage;
    const blogToShow = allBlogData.slice(start, start + blogItemsPerPage);

    container.innerHTML = blogToShow
      .map(
        (blog) => `
      <div class="blog-card">
        <img src="${
          blog.image
        }" alt="Blog image" class="blog-img img-fluid" loading="lazy" 
             style="height: 20vh; width: 100%; object-fit: cover;">
        <div class="blog-info" style="height: 29vh;">
          <h3 class="blog-title">${
            blog.heading || blog.subheading1 || "Untitled Blog"
          }</h3>
          <p class="blog-preview">${blog.subpera1 || "No additional info."}</p>
        </div>
        <div class="blog-footer p-3 bg-light">
          <a href="#" class="read-more">Read More</a>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Setup pagination
  function setupPagination() {
    const totalPages = Math.ceil(allBlogData.length / blogItemsPerPage);
    paginationContainer.innerHTML = "";

    const createLink = (label, page, isActive = false) => {
      const link = document.createElement("a");
      link.textContent = label;
      link.href = "#";
      if (isActive) link.classList.add("active");
      link.onclick = (e) => {
        e.preventDefault();
        currentBlogPage = page;
        displayBlogData(currentBlogPage);
        setupPagination();
      };
      return link;
    };

    // Previous
    if (currentBlogPage > 1) {
      paginationContainer.appendChild(
        createLink("« Previous", currentBlogPage - 1)
      );
    }

    // Smart pagination
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentBlogPage)
        );
      }
    } else {
      // First page
      paginationContainer.appendChild(
        createLink("1", 1, currentBlogPage === 1)
      );

      if (currentBlogPage > 3) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Pages around current
      const startPage = Math.max(2, currentBlogPage - 1);
      const endPage = Math.min(totalPages - 1, currentBlogPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(
          createLink(i.toString(), i, i === currentBlogPage)
        );
      }

      if (currentBlogPage < totalPages - 2) {
        paginationContainer.appendChild(document.createTextNode("..."));
      }

      // Last page
      paginationContainer.appendChild(
        createLink(
          totalPages.toString(),
          totalPages,
          currentBlogPage === totalPages
        )
      );
    }

    // Next
    if (currentBlogPage < totalPages) {
      paginationContainer.appendChild(
        createLink("Next »", currentBlogPage + 1)
      );
    }
  }

  // Initialize
  fetchBlogData();
}

// ======== Theme Toggle Btn ========
function themeToggle() {
  const themeToggle = document.getElementById("theme");
  const body = document.body;

  // Only run if theme toggle exists
  if (!themeToggle) return;

  // Function to apply the theme based on the toggle state
  function applyTheme(isDark) {
    if (isDark) {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }

  // Load saved theme from localStorage on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    themeToggle.checked = true;
    applyTheme(true);
  } else {
    themeToggle.checked = false;
    applyTheme(false);
  }

  // Toggle theme on checkbox change
  themeToggle.addEventListener("change", () => {
    applyTheme(themeToggle.checked);
  });
}

// ======== Doctor Profile Page ========
function initDoctorProfilePage() {
  function doctorDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorEmail = urlParams.get("email");

    if (!doctorEmail) {
      displayError("No doctor email provided.");
      return;
    }

    fetch("../assets/data/doctor.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch doctor data.");
        }
        return res.json();
      })
      .then((data) => {
        const doctor = data.doctors.find((doc) => doc.email === doctorEmail);

        if (!doctor) {
          displayError("Doctor not found.");
          return;
        }

        populateDoctorDetails(doctor);
      })
      .catch((error) => {
        console.error("Error loading doctor data:", error);
        displayError("Error loading doctor details.");
      });
  }

  function populateDoctorDetails(doctor) {
    document.getElementById("doctorImage").src = doctor.image;
    document.getElementById("doctorImage").alt = doctor.name;
    document.getElementById("doctorName").textContent = doctor.name;
    document.getElementById("doctorSpecialty").textContent = doctor.specialty;
    document.getElementById("doctorWorkingTime").textContent = `${
      doctor.working_time
    } (${doctor.working_days.join(", ")})`;
    document.getElementById("doctorContact").textContent =
      doctor.contact_number;
    document.getElementById("doctorEmail").textContent = doctor.email;

    const educationList = document.getElementById("doctorEducation");
    const degrees = doctor.degree.split(", ");
    educationList.innerHTML = degrees
      .map((deg) => `<li><i class="fas fa-check"></i> ${deg}</li>`)
      .join("");

    const expertiseList = document.getElementById("doctorExpertise");
    const expertise = getExpertiseForSpecialty(doctor.specialty);
    expertiseList.innerHTML = expertise
      .map((item) => `<li><i class="fas fa-check-circle"></i> ${item}</li>`)
      .join("");

    const locationIframe = document.getElementById("doctorLocation");
    locationIframe.src = `https://www.google.com/maps?q=${encodeURIComponent(
      doctor.location
    )}&output=embed`;

    const bookBtn = document.getElementById("bookAppointmentBtn");
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const registerModal = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      registerModal.show();
      document.getElementById("patient-form-preferred-doctor").value =
        doctor.name;
    });
  }

  function getExpertiseForSpecialty(specialty) {
    const expertiseMap = {
      "Internal Medicine": [
        "Chronic disease management",
        "Preventive care",
        "General health checkups",
      ],
      Orthopedics: [
        "Joint replacement",
        "Fracture treatment",
        "Sports injuries",
      ],
      Gynecology: [
        "Prenatal care",
        "Menstrual disorders",
        "Fertility treatments",
      ],
      Cardiology: [
        "Heart disease management",
        "Angioplasty",
        "ECG and stress testing",
      ],
      Pediatrics: [
        "Child vaccinations",
        "Growth monitoring",
        "Pediatric infections",
      ],
    };

    return (
      expertiseMap[specialty] || [
        `${specialty} consultation`,
        "Specialized treatments",
        "Diagnostic evaluations",
      ]
    );
  }

  function displayError(message) {
    document.getElementById(
      "doctorProfile"
    ).innerHTML = `<p>Error: ${message}</p>`;
  }

  doctorDetail(); // Call main logic inside the wrapper
}

// ======== Initialize Page-Specific Code ========
document.addEventListener("DOMContentLoaded", () => {
  // These run on all pages
  navbar();
  userForm();
  themeToggle(); // Initialize theme toggle

  // These only run on their specific pages
  if (document.getElementById("patient-form-registration-form")) patientform();
  if (document.getElementById("doctorCards")) doctorpage();
  if (document.querySelector(".stories-grid")) storypage();
  if (document.querySelector(".blogs-grid")) blogpage();
  if (document.getElementById("doctorProfile")) initDoctorProfilePage();
});
