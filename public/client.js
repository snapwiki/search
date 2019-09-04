// client-side js
// run by the browser each time your view template is loaded

const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('.search-input').value;
  const searchQuery = input.trim();
  fetchResults(searchQuery);
}
// more on using wikipedia action=query https://www.mediawiki.org/wiki/API:Query
function fetchImage(searchQuery){
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${searchQuery}&origin=*`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const result = data.query.pages;
        const id = Object.keys(result)[0];
        if(result[id].original){
          const imgURL = result[id].original.source;
          console.log(imgURL); 
          displayImage(imgURL);
        }
      })};

function fetchResults(searchQuery) {
	  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  	fetch(endpoint)
  		.then(response => response.json())
  		.then(data => {
  	  	const results = data.query.search;
        console.log(results);
        fetchImage(searchQuery);
        displayResults(results);
		})
    .catch(() => console.log('An error occurred'));
}

function displayImage(imageURL){
  const searchResults = document.querySelector('.searchResults');
  searchResults.insertAdjacentHTML('beforeend',
                                  `<img src="${imageURL}"/>`);
}

function displayResults(results) {
  const searchResults = document.querySelector('.searchResults');
  searchResults.innerHTML = '';
  const result = results[0];
  const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

   searchResults.insertAdjacentHTML('beforeend',
    `<div class="resultItem">
      <h3 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h3>
      <span class="resultItem-snippet">${result.snippet}</span><br>
    </div>`
  );
}
  
