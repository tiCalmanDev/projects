let movies = {
    apiKey: "9362a760df3a4ef5e3b525cf2dc17e40",
    fetchMovie: function(movieID) {
    fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.apiKey}&language=en-US`
    )
    .then((response) => {
        if (!response.ok){
            alert("We have no movie with that ID on our records");
            throw new Error("No movie found.");
        }
        return response.json();
    })
    .then((data) => this.displayDetails(data));
},

    displayDetails: function(data){
        document.querySelector(".title").innerHTML = `The title of the movie is ${data.original_title}.`;
        document.querySelector(".year").innerHTML = `${data.original_title} was released on ${data.release_date}.`;
        document.querySelector(".budget").innerHTML = `The budget for this movie was $${data.budget}.`;
    },

    searchMovie: function() {
        this.fetchMovie(document.querySelector('.search-bar').value);
    }
};

document.querySelector("#button").addEventListener('click', function () {
    movies.searchMovie();
});

document.querySelector(".search-bar").addEventListener('keyup', (event) => {
    if (event.key == 'Enter'){
            movies.searchMovie();
    }
});
