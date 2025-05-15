const base_url = "http://localhost:3000/songs";

fetch(base_url)
  .then(res => res.json())
  .then(songs => list_of_songs(songs))
  .catch(err => console.log(err || "Cristina Kuna error!"));

function list_of_songs(songs) {
  const songsList = document.getElementById("my_songlist");
  songsList.innerHTML = ""

  songs.forEach(song => {
    let html = `
      <li id="song-${song.id}">
        <h4>${song.title}</h4>
        <audio controls>
          <source src="${song.url}" type="audio/mpeg">
          Sadly, umebunt kimuziki
        </audio>
        <button data-id="${song.id}>Like</button>
      </li>
    `;
    songsList.innerHTML += html;
  });
}
