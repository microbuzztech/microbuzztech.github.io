const apiUrl = "https://api.npoint.io/fc9efe97d14b038fe2f0";

let companyInfo = {};

async function loadCompanyInfo() {
  try {
    const res = await fetch(apiUrl);
    companyInfo = await res.json();

    // Set document title
    document.title = companyInfo.title;

    // Company name
    document.querySelectorAll(".company-name").forEach(el => el.textContent = companyInfo.name);
    document.querySelectorAll(".company-name-accent").forEach(el => el.textContent = companyInfo.name);

    // Email & Address
    document.querySelectorAll(".company-email").forEach(el => el.innerHTML = `<strong>Email:</strong> ${companyInfo.email}`);
    document.querySelectorAll(".company-address").forEach(el => el.innerText = companyInfo.address);

    // Map iframe
    const mapFrame = document.getElementById("company-map");
    if (mapFrame && companyInfo.mapUrl) {
      mapFrame.src = companyInfo.mapUrl;
    }

    // Socials
    document.querySelectorAll("a.instagram").forEach(el => el.href = companyInfo.socials.instagram);
    document.querySelectorAll("a.linkedin").forEach(el => el.href = companyInfo.socials.linkedin);
    document.querySelectorAll("a.facebook").forEach(el => el.href = companyInfo.socials.facebook);
    document.querySelectorAll("a.twitter").forEach(el => el.href = companyInfo.socials.twitter);

    // Contact form
    document.querySelectorAll(".contact-form").forEach(form => form.action = companyInfo.contactFormAction);

    // Logo
    const logoContainers = document.querySelectorAll(".company-logo");
    logoContainers.forEach(container => {
      container.innerHTML = "";
      const img = document.createElement("img");
      img.src = companyInfo.logo;
      img.alt = `${companyInfo.name} Logo`;
      img.className = "logo-img";
      container.prepend(img);
    });

    // Favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = companyInfo.favicon;
    favicon.type = "image/png";
    document.head.appendChild(favicon);

    // ✅ Load API-driven sections (blog, reviews, team)
    loadSection(companyInfo.apis.blog, "#blog-grid", createBlogCard);
    loadSection(companyInfo.apis.reviews, "#reviews-grid", createReviewCard);
    loadSection(companyInfo.apis.team, "#team .grid", createTeamCard);

  } catch (err) {
    console.error("Error loading company info:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCompanyInfo);
