const CONTACT_EMAIL = "ayomidefaruq079@gmail.com"; // Replace before launch.

const listings = [
  {id:1,title:"Moonlight on My Side",writer:"Demo Writer 01",genre:"Afrobeats",mood:"Love",price:"Example: $20",art:"art-1",symbol:"☾",excerpt:"When the city goes quiet, your name still sings\nTwo shadows dancing where the midnight begins\nIf tomorrow loses its way in the blue\nI would find every road that leads me to you",full:"When the city goes quiet, your name still sings\nTwo shadows dancing where the midnight begins\nIf tomorrow loses its way in the blue\nI would find every road that leads me to you"},
  {id:2,title:"Paper Hearts",writer:"Demo Writer 02",genre:"Pop",mood:"Heartbreak",price:"Example: negotiable",art:"art-2",symbol:"♡",excerpt:"We made forever out of paper and rain\nWatched every promise turn soft in the frame\nI kept the letters, you kept the truth\nFunny how goodbye still sounds like you",full:"We made forever out of paper and rain\nWatched every promise turn soft in the frame\nI kept the letters, you kept the truth\nFunny how goodbye still sounds like you"},
  {id:3,title:"No Small Dreams",writer:"Demo Writer 03",genre:"Rap",mood:"Confidence",price:"Example: $35",art:"art-3",symbol:"↗",excerpt:"Came with a plan and a pocket of hope\nBuilt me a ladder from every closed door\nIf they draw a line, I make it a road\nI know what I'm worth, I know what I'm owed",full:"Came with a plan and a pocket of hope\nBuilt me a ladder from every closed door\nIf they draw a line, I make it a road\nI know what I'm worth, I know what I'm owed"},
  {id:4,title:"Golden Hour Prayer",writer:"Demo Writer 04",genre:"Gospel",mood:"Hope",price:"Example: $15",art:"art-4",symbol:"✧",excerpt:"Light through the window, peace in my chest\nEven in the waiting, I'm learning to rest\nOne more morning, one more chance\nGrace has a way of teaching feet to dance",full:"Light through the window, peace in my chest\nEven in the waiting, I'm learning to rest\nOne more morning, one more chance\nGrace has a way of teaching feet to dance"},
  {id:5,title:"Green Light Feeling",writer:"Demo Writer 05",genre:"R&B",mood:"Love",price:"Example: $25",art:"art-5",symbol:"〰",excerpt:"Don't need a reason, just stay for a while\nYour quiet language, your half-hidden smile\nNo perfect timing, no grand design\nJust your hand finding its way into mine",full:"Don't need a reason, just stay for a while\nYour quiet language, your half-hidden smile\nNo perfect timing, no grand design\nJust your hand finding its way into mine"},
  {id:6,title:"One More Summer",writer:"Demo Writer 06",genre:"Indie",mood:"Party",price:"Example: $18",art:"art-6",symbol:"☼",excerpt:"Barefoot roads and a radio song\nWe swore that the night could keep going on\nIf youth is a place, let me stay awhile\nWith salt in my hair and a sunburned smile",full:"Barefoot roads and a radio song\nWe swore that the night could keep going on\nIf youth is a place, let me stay awhile\nWith salt in my hair and a sunburned smile"}
];

const grid = document.getElementById("listingGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const moodFilter = document.getElementById("moodFilter");
const dialog = document.getElementById("listingDialog");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[character]));
}

function renderListings() {
  const search = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;
  const mood = moodFilter.value;
  const filtered = listings.filter(item => {
    const searchable = `${item.title} ${item.writer} ${item.genre} ${item.mood} ${item.excerpt}`.toLowerCase();
    return searchable.includes(search) &&
      (genre === "all" || item.genre === genre) &&
      (mood === "all" || item.mood === mood);
  });
  grid.innerHTML = filtered.map(item => `
    <article class="lyric-card">
      <div class="card-top"><span class="genre-pill">${escapeHtml(item.genre)}</span><span class="mood-pill">${escapeHtml(item.mood)}</span></div>
      <div class="card-art ${escapeHtml(item.art)}"><span class="art-symbol">${escapeHtml(item.symbol)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="writer-line">by ${escapeHtml(item.writer)} · Demo listing</p>
      <p class="lyric-snippet">${escapeHtml(item.excerpt)}</p>
      <div class="card-footer"><span class="price">${escapeHtml(item.price)}</span><button type="button" data-listing-id="${item.id}">View details ↗</button></div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}
function openListing(id) {
  const item = listings.find(entry => entry.id === id);
  if (!item) return;
  document.getElementById("dialogGenre").textContent = `${item.genre} · ${item.mood}`;
  document.getElementById("dialogTitle").textContent = item.title;
  document.getElementById("dialogMeta").textContent = `Submitted by ${item.writer} · Fictional demo`;
  document.getElementById("dialogLyrics").textContent = item.full;
  document.getElementById("dialogPrice").textContent = item.price;
  const contact = document.getElementById("dialogContact");
  contact.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent("LyricMarket enquiry: " + item.title)}&body=${encodeURIComponent("Hello, I am interested in the demo listing: " + item.title + ". Please confirm the approved listing details and rights terms.")}`;
  dialog.showModal();
}
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-listing-id]");
  if (button) openListing(Number(button.dataset.listingId));
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
[searchInput, genreFilter, moodFilter].forEach(element => element.addEventListener("input", renderListings));

document.getElementById("submissionForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = [
    "LYRICMARKET — NEW LYRIC SUBMISSION",
    "----------------------------------",
    `Writer display name: ${data.get("writer")}`,
    `Contact email: ${data.get("email")}`,
    `Song title: ${data.get("title")}`,
    `Genre: ${data.get("genre")}`,
    `Mood: ${data.get("mood")}`,
    `Asking price: ${data.get("price") || "Not provided"}`,
    `Rights offered: ${data.get("rights")}`,
    "",
    "PREVIEW",
    String(data.get("preview")),
    "",
    "DECLARATION: Submitter checked the box confirming they created the work or have permission to submit it.",
    "",
    "IMPORTANT: This file was generated locally in the submitter's browser. It has not been sent to LyricMarket or uploaded to any server."
  ].join("\n");
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeTitle = String(data.get("title")).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0,50) || "lyrics";
  link.href = url;
  link.download = `lyricmarket-submission-${safeTitle}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  document.getElementById("formStatus").textContent = "Submission file created. It has NOT been sent. Save the file and email it to the site owner for review.";
});
document.getElementById("year").textContent = new Date().getFullYear(
loadLiveListings();
                            
