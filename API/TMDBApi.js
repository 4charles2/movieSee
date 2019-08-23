const API_TOKEN = "e62d9bf8a9a6bea3999671be1cbbd94e"

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query='+ text + '&page=' +page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w500/' + name
}

export function getFilmDetailFromApi(idFilm){
    const url = 'https://api.themoviedb.org/3/movie/'+ idFilm +'?api_key='+ API_TOKEN +'&language=fr';
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}