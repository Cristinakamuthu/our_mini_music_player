const base_url = "http://localhost:3000/songs";

let allsongs = []
fetch(base_url)
  .then(res => res.json())
  .then(songs => {allsongs = songs.map(song => ({...song, likes: 0})); list_of_songs(songs)})
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
        <button class="like" id="${song.id}">👍</button>
      </li>
    `;
    songsList.innerHTML += html;
  });
}

const likebtn = document.querySelectorAll(".like")

function list_of_songs(songs) {
    const songsList = document.getElementById("my_songlist");
    songsList.innerHTML = "";
  
    songs.forEach(song => {
      let html = `
        <li id="song-${song.id}">
          <h4>${song.title}</h4>
          <audio controls>
            <source src="${song.url}" type="audio/mpeg">
            Sadly, umebunt kimuziki
          </audio>
          <button class="like" data-id="${song.id}">👍 Like (${song.likes})</button>
        </li>
      `;
      songsList.innerHTML += html;
    });
  
   
    const likebtns = document.querySelectorAll(".like");
  
    likebtns.forEach(button => {
      button.addEventListener("click", () => {
        const songid = button.getAttribute("data-id");
        const song = allsongs.find(s => s.id == songid);
        if (song) {
          song.likes += 1;
          button.textContent = `👍 Like (${song.likes})`;
        }
      });
    });
  }

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const titleInput = e.target.querySelector('input[type="text"]');
    const urlInput = e.target.querySelector('input[type="url"]');
  
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
  
    if (!title || !url) {
      alert("Enter both title and URL, bestie 👀");
      return;
    }
  
    const newSong = {
      title,
      url,
      likes: 0,
    };
  
    fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    })
      .then(res => res.json())
      .then(savedSong => {
        allsongs.push(savedSong);
        localStorage.setItem("songs", JSON.stringify(allsongs)); // optional backup
        list_of_songs(allsongs);
        titleInput.value = "";
        urlInput.value = "";
      })
      .catch(err => console.log("Save error 😩", err));
  });
  
  
  
