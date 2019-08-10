// client-side js
// run by the browser each time your view template is loaded

const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    // prevent page from reloading when form is submitted
  event.preventDefault();
  // get the value of the input field
  const input = document.querySelector('.search-input').value;
  // remove whitespace from the input
  const searchQuery = input.trim();
  // call `fetchResults` and pass it the `searchQuery`
  fetchResults(searchQuery);

}

function fetchImage(searchQuery){
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${searchQuery}&origin=*`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const result = data.query.pages;
        console.log('result', result);
        const id = Object.keys(result)[0];
        if(id !== -1){
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
  // Store a reference to `.searchResults`
  const searchResults = document.querySelector('.searchResults');
  // Remove all child elements
  searchResults.innerHTML = '';
  // Loop over results array
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

const saveSearch = (searchQuery) => {
  
}



// // our default array of dreams
// const dreams = [
//   'Find and count some sheep',
//   'Climb a really tall mountain',
//   'Wash the dishes'
// ];

// // define variables that reference elements on our page
// const dreamsList = document.getElementById('dreams');
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements['dream'];

// // a helper function that creates a list item for a given dream
// const appendNewDream = function(dream) {
//   const newListItem = document.createElement('li');
//   newListItem.innerHTML = dream;
//   dreamsList.appendChild(newListItem);
// }

// // iterate through every dream and add it to our page
// dreams.forEach( function(dream) {
//   appendNewDream(dream);
// });

// // listen for the form to be submitted and add a new dream when it is
// dreamsForm.onsubmit = function(event) {
//   // stop our form submission from refreshing the page
//   event.preventDefault();

//   // get dream value and add it to the list
//   dreams.push(dreamInput.value);
//   appendNewDream(dreamInput.value);

//   // reset form 
//   dreamInput.value = '';
//   dreamInput.focus();
// };
