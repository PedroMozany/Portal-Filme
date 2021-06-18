
////////   INICIO DA REQUISIÇÃO   //////

(function () {
  window.tmdb = {
    "api_key": "3dacaea653afd5f737d28031b807acbb",
    "base_uri": "https://api.themoviedb.org/3",
    "images_uri": "https://image.tmdb.org/t/p/w500",
    "timeout": 5000,
    
    
    call: function (url, params, success, error) {
      let params_str = "api_key=" + tmdb.api_key;
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          params_str += "&" + key + "=" + encodeURIComponent(params[key]);
        }
      }
      let xhr = new XMLHttpRequest();
      xhr.timeout = tmdb.timeout;
      xhr.ontimeout = function () {
        throw ("Request timed out: " + url + " " + params_str);
      };
      xhr.open("GET", tmdb.base_uri + url + "?" + params_str + "&language=pt-br", true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.responseType = "text";
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            if (typeof success == "function") {
              success(JSON.parse(this.response));
            } else {
              throw ('No success callback, but the request gave results')
            }
          } else {
            if (typeof error == "function") {
              error(JSON.parse(this.response));
            } else {
              throw ('No error callback')
            }
          }
        }
      };
      xhr.send();
    }
  }
})()
////////   FIM DA REQUISIÇÃO   //////


////////   INICIO DA PESQUISA   //////
window.addEventListener('keydown', function (dados) {
  handleKeyPress(dados);
}, false);

let input = document.getElementById('search');
input.addEventListener('click', search, false);

function handleKeyPress(dados) {
  let key = dados.keyCode || dados.which;
  if (key == 13) {
    search();
  }
}

document.getElementById('search').addEventListener('click', search);

function search() {
  let info = document.getElementById('info');
  let query = document.getElementById('query').value;
  info.innerHTML = '';
  tmdb.call('/search/tv', {
      'query': query,
    },

    function (dados) {

      let results = Object.keys(dados.results);
      for (let i = 0; i < dados.results.length; i++) {
        console.log(dados.results[i]);
        let info = document.getElementById('info')
        let show = document.createElement('div');
        show.id = i;
        let json = dados.results[i];
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].first_air_date).toLocaleDateString();
        let name = dados.results[i].original_name;
        let aval = dados.results[i].vote_average;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;
        info.appendChild(show);
        show.innerHTML += `   <div class="col-md-6 col-lg-6">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <p class="des">
                      ${dados.results[i].overview}
                      <a href="${link}">Leia mais...</a>
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
  `;
        show.addEventListener('click', click, false);
      };
    },
    function (dados) {
      console.log("Error: " + dados)
    }
  )

  tmdb.call('/search/movie', {
      'query': query,
    },
    function (dados) {
      let results = Object.keys(dados.results);

      for (let i = 0; i < dados.results.length; i++) {
        console.log(dados.results[i]);
        let info = document.getElementById('info')
        let show = document.createElement('div');
        show.id = i;
        let json = dados.results[i];
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].release_date).toLocaleDateString();
        let aval = dados.results[i].vote_average;
        let name = dados.results[i].original_title;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;
        info.appendChild(show);
        show.innerHTML += `<div class="col-md-6 col-lg-6">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <a href="${link}">Leia mais...</a>
                      <p class="des">
                      ${dados.results[i].overview}
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
`;
        show.addEventListener('click', click, false);
      };

    },
    function (dados) {
      console.log("Error: " + dados)
    }
  )
};

////////   FIM DA PESQUISA   //////

////////   INICIO DOS FILME   //////

function exibeFilmes() {
  tmdb.call('/movie/popular', {},

  function  (dados) {
    
    let textoHTML = '';
    let results = Object.keys(dados.results);
    console.log("Success: " + dados);
    console.log(dados.results);

    for (let i = 0; i <=3; i++) {
        let name = dados.results[i].title;
        let sinopse = dados.results[i].overview;
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].release_date).toLocaleDateString();
        let aval = dados.results[i].vote_average;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;

        textoHTML += ` <div class="col-md-6 col-lg-3 my-3">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <p class="des">
                      ${sinopse}
                      <a href="${link}">Leia mais...</a>
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>`
        ;
  
  
  
    }
    document.getElementById('imagem_destaque').innerHTML = textoHTML;
}
  );
}

function carregarFilmes() {

  tmdb.call('/movie/popular', {},

  function (dados) {
    
 
    let results = Object.keys(dados.results);
    let textoHTML = '';
    console.log("Success: " + dados);
    console.log(dados.results);

    for (let i = 0; i < dados.results.length; i++) {
        let name = dados.results[i].title;
        let sinopse = dados.results[i].overview;
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].release_date).toLocaleDateString();
        let aval = dados.results[i].vote_average;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;

        textoHTML += ` <div class="col-md-6 col-lg-3 my-3">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <p class="des">
                      ${sinopse}
                      <a href="${link}">Leia mais...</a>
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>`
        ;
  
  
  
    }
    document.getElementById('imagem_destaque').innerHTML = textoHTML;
}
  );
}
////////   FIM DA FILME   //////

////////   INICIO DOS SERIES   //////

function tvPopular() {
  tmdb.call('/tv/popular', {},
  function (dados) {
    
    let results = Object.keys(dados.results);
    let textoHTML = '';
    console.log("Success: " + dados);
    console.log(dados.results);

    for (let i = 0; i <= 3; i++) {
        let name = dados.results[i].original_name;
        let sinopse = dados.results[i].overview;
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].first_air_date).toLocaleDateString();
        let aval = dados.results[i].vote_average;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;

        textoHTML += ` <div class="col-md-6 col-lg-3 my-3">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <p class="des">
                      ${sinopse}
                      <a href="${link}">Leia mais...</a>
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>`
        ;
  
  
  
    }
    document.getElementById('serie_destaque').innerHTML = textoHTML;
}

  );
}
  
function carregarSerie() {
  tmdb.call('/tv/popular', {},
  function (dados) {

    let results = Object.keys(dados.results);
    let textoHTML = '';
    console.log("Success: " + dados);
    console.log(dados.results);

    for (let i = 0; i < dados.results.length; i++) {
        let name = dados.results[i].original_name;
        let sinopse = dados.results[i].overview;
        let poster = tmdb.images_uri + dados.results[i].poster_path;
        let date = new Date(dados.results[i].first_air_date).toLocaleDateString();
        let aval = dados.results[i].vote_average;
        let link = "https://www.adorocinema.com/pesquisar/?q=" + name;
        let trailer = "https://www.youtube.com/results?search_query=" + name;

        textoHTML += ` <div class="col-md-6 col-lg-3 my-3">
        <div class="row">
            <div class="column">
                <div class="card">
                  <div class="content">
                    <div class="front">
                      <img class="profile" width="100%" src="${poster}" alt="${name}">
                    </div>
                    <div class="back from-left">
                      <h3>${name}</h3>
                      <h3>${date}</h3>
                      <p class="des">
                      ${sinopse}
                      <a href="${link}">Leia mais...</a>
                      </p>
                      <h3>Avaliação:${aval}</h3>
                      <ul class="social-icon">
                        <a href="${trailer}"><button type="button" class="btn btn-dark">Trailer</button></a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>`
        ;
  
  
  
    }
    document.getElementById('serie_destaque').innerHTML = textoHTML;
}

  );
}
////////   FIM DA SERIES   //////