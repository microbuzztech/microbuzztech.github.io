function toggleMenu() {
  document.getElementById('navbar').classList.toggle('active');
}

document.getElementById('year').textContent = new Date().getFullYear();

const phrases = ["making apps.", "marketing apps.", "publishing apps."];
let index = 0;
const dynamicText = document.getElementById("dynamic-text");

function updateText() {
  dynamicText.textContent = phrases[index];
  index = (index + 1) % phrases.length;
}
setInterval(updateText, 1000);
updateText();

window.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('contactDialog');
  if (dialog?.showModal) {
    setTimeout(() => dialog.showModal(), 2000);
  }
  loadSection(companyInfo.apis.blog, "#blog-grid", createBlogCard);
  loadSection(companyInfo.apis.reviews, "#reviews-grid", createReviewCard);
  loadSection(companyInfo.apis.team, "#team .grid", createTeamCard);
});

function loadSection(apiUrl, containerSelector, createCardFn) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector(containerSelector);
      container.innerHTML = "";
      data.forEach(item => container.appendChild(createCardFn(item)));
    })
    .catch(err => console.error(`Error loading from ${apiUrl}:`, err));
}

function createBlogCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="blog-image">
    <h4>${item.title}</h4>
    <p>${item.description}</p>
  `;
  return card;
}

function createReviewCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.avatar}" alt="${item.name}" class="review-avatar">
    <p>“${item.review}”</p>
    <h4>- ${item.name}</h4>
  `;
  return card;
}

function createTeamCard(member) {
  const card = document.createElement("div");
  card.className = "card team-card";
  card.onclick = () => window.open(member.link, "_blank");
  card.innerHTML = `
    <img src="${member.image}" alt="${member.name}" class="team-avatar">
    <h4>${member.name}</h4>
    <p>${member.role}</p>
  `;
  return card;
}
