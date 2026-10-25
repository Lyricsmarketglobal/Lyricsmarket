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
  contact.href = `mailto:${encodeURIComponent(ayomidefaruq079@gmail.com)}?subject=${encodeURIComponent("LyricMarket enquiry: " + item.title)}&body=${encodeURIComponent("Hello, I am interested in the demo listing: " + item.title + ". Please confirm the approved listing details and rights terms.")}`;
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

                       
