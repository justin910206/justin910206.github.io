//grab search button

const submit_btn = document.getElementById("submit_btn")

//add event listern
submit_btn.addEventListener("click", (e) => {
    e.stopPropagation()
    e.preventDefault()

    //grab search field
    const searchField = document.getElementById("search");
    makeKeywordCard(searchField.value);

    //preform search with API

    //add new btn container

    //add search result to search result container


})

function makeKeywordCard (keyword){
    //create new keyword card 
    const newCard = document.createElement("div");
    //added classes to new card
    newCard.classList.add("card", "m-3");
    //creating a cardbody
    const cardBody = document.createElement("div");
    //adding classes
    cardBody.classList.add("card-body");
    //creating a cardtitle
    const cardTitle = document.createElement("h5");
    //adding classes to cardtitle
    cardTitle.classList.add("card-title", "text-center");
    //adding search box field into card title
    cardTitle.textContent = keyword;
    //attaching cardtitle to cardbody
    cardBody.appendChild(cardTitle);
    const mediaButton = document.createElement("a");
    //adding classes to cardtitle
    mediaButton.classList.add("btn", "btn-success", "text-white", "mr-2");
    //adding search box field into card title
    mediaButton.textContent = "Media Search";
    mediaButton.addEventListener("click", mediaSearch);
    //attaching cardtitle to cardbody
    cardBody.appendChild(mediaButton);
    const gifButton = document.createElement("a");
    //adding classes to cardtitle
    gifButton.classList.add("btn", "btn-warning", "text-white");
    //adding search box field into card title
    gifButton.textContent = "Gif Search";
    gifButton.addEventListener("click", gifSearch);
    //attaching cardtitle to cardbody
    cardBody.appendChild(gifButton);
    //attaching cardbody to cardtitle
    newCard.appendChild(cardBody);
    //adding card to keyWord Container
    const searchBtnContainer = document.getElementById("Keyword_card_container");
    searchBtnContainer.appendChild(newCard);
}

function mediaSearch(e){
    e.stopPropagation()
    e.preventDefault()
    const searchResultContainer = document.getElementById("search_result_container");
    searchResultContainer.innerHTML = "";
    const keyword = encodeURIComponent(e.target.parentElement.firstChild.textContent);
    console.log(keyword);
    const url = `http://www.omdbapi.com/?apikey=1ec0e6fa&s=${keyword}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search.length > 12) {
            for (let i = 0; i < 12; i++){
                makeMediaCard(data.Search[i]);
            }
        } else {
            data.Search.forEach(result => {
                makeMediaCard(result); 
            });
        }
      });
}
function gifSearch(e){
    e.stopPropagation()
    e.preventDefault()
    const searchResultContainer = document.getElementById("search_result_container");
    searchResultContainer.innerHTML = "";
    const keyword = (e.target.parentElement.firstChild.textContent);
    const url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=kKPVbLcCtIRGyPvxgf4HgISitpvtVo0w&limit=12`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
          console.log(data.data);
        data.data.forEach(result => {
            makeGifCard(result); 
        });
      });

}

function makeMediaCard(result) {
    const newCard = document.createElement("div");
    newCard.classList.add("card", "m-3");
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = result.Poster;
    newCard.appendChild(cardImage);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "text-center");
    cardTitle.textContent = result.Title;
    cardBody.appendChild(cardTitle);
    const cardSubTitle = document.createElement("h6");
    cardSubTitle.classList.add(
      "card-subtitle",
      "mb-2",
      "text-muted",
      "text-center"
    );
    cardSubTitle.textContent = `${
      result.Type.charAt(0).toUpperCase() + result.Type.slice(1)
    } - ${result.Year}`;
    cardBody.appendChild(cardSubTitle);
    newCard.appendChild(cardBody);
    const searchResultContainer = document.getElementById("search_result_container");
    searchResultContainer.appendChild(newCard);
  }

  function makeGifCard(result) {
    const newCard = document.createElement("div");
    newCard.classList.add("card", "m-3");
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = result.images.fixed_height.url;
    newCard.appendChild(cardImage);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "text-center");
    cardTitle.textContent = result.title;
    cardBody.appendChild(cardTitle);
    newCard.appendChild(cardBody);
    const searchResultContainer = document.getElementById("search_result_container");
    searchResultContainer.appendChild(newCard);
  }