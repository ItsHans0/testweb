const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('queryInput');
const resultsList = document.getElementById('resultsList');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (query === '') return;

  resultsList.innerHTML = 'Searching...';

  try {
    const response = await fetch(`https://spotify.nomisec07.site/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.status) {
      if (data.data.length > 0) {
        resultsList.innerHTML = '';
        data.data.forEach((track) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <div class="track-info">
              <img src="${track.thumbnail}" alt="Thumbnail" class="thumbnail">
              <div class="title">Judul : ${track.title}</div>
              <div class="artist">Artis : ${track.artist}</div>
              <div class="duration">Durasi : ${track.duration}</div>
            </div>
            <a href="https://spotify.nomisec07.site/download?url=${encodeURIComponent(track.url)}" class="download-btn" download="${track.title}.mp3">> Download</a>
          `;
          resultsList.appendChild(listItem);
        });
      } else {
        resultsList.innerHTML = 'No results found.';
      }
    } else {
      resultsList.innerHTML = 'Search failed.';
    }
  } catch (error) {
    resultsList.innerHTML = 'Error occurred during the search.';
  }
});
