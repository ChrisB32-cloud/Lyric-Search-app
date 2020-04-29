// 1 start
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// 2
const apiURL = 'https://api.lyrics.ovh';

// 4 search by song or artist
async function searchSongs(term) {
  //   fetch(`${apiURL}/suggest/${term}`).then(res =>
  //     res.json().then(data => {
  //       console.log(data);
  //     })
  //   );

  // async await
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  // 5
  showData(data);
}

// 6 Show song and artist in DOM
function showData(data) {
  // 7
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
     </li>`
        )
        .join('')}
    </ul>`;
  // 8
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}

// 9 Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// 13 Get lyrics for song
async function getLyrics(artist, songTitle) {
  // 14
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // \r for a return \n for new line | mean or g means global <br> line break
  // checking and replacing with a line break if return and new line
  // or return or new line
  // 15
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  // 16
  result.innerHTML = `
    
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;
  more.innerHTML = '';
}

// 3 Event listeners
form.addEventListener('submit', e => {
  // when we have a jsubmit event use prevent so it wont submit
  e.preventDefault();

  const searchTerm = search.value.trim();

  // a little validation
  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// 10 Get lyrics button click
result.addEventListener('click', e => {
  const clickEl = e.target;
  // 11
  if (clickEl.tagName === 'BUTTON') {
    const artist = clickEl.getAttribute('data-artist');
    const songTitle = clickEl.getAttribute('data-songtitle');

    // 12 Get lyrics function call
    getLyrics(artist, songTitle);
  }
});

// goes 7
// let output = '';

// 7
// data.data.forEach(song => {
//   output += `
//     <li>
//       <span><strong>${song.artist.name}</strong> - ${song.title}</span>
//       <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
//     </li>
//   `;
// });

// result.innerHTML = `
//   <ul class="songs">
//     ${output}
//   </ul>
// `;
