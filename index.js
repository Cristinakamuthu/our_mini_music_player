const base_url = "http://localhost:3000/songs";

let allsongs = []
fetch(base_url)
  .then(res => res.json())
  .then(songs => {allsongs = songs; list_of_songs(songs)})
  .catch(err => console.log(err && "Cristina Kuna error!"));

document.addEventListener("DOMContentLoaded",() =>{
    const searchinput = document.getElementById("searchbar")

    searchinput.addEventListener("input",()=>{
        const searchstuff = searchinput.value.toLowerCase();

        const filteredSongs = allsongs.filter(song => song.title.toLowerCase().includes(searchstuff))

        list_of_songs(filteredSongs)
    })
})







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
        <button id="${song.id}">Like</button>
      </li>
    `;
    songsList.innerHTML += html;
  });
}
