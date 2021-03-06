console.log('hola mundo!');
const noCambia = "Alejandro";

let cambia = "@ASL"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}



const getUser1 = new Promise ( function (todoBien, todoMal) // la funcion de la promesa esta compuesta por dos parametros, uno por si el resultado de la promesa es positivo y el otro por si el resultado es negativo
{
  setTimeout ( function(){todoBien("primer mensaje de prueba")}, 
  3000)
}
)
const getUser2 = new Promise ( function (todoBien, todoMal) // la funcion de la promesa esta compuesta por dos parametros, uno por si el resultado de la promesa es positivo y el otro por si el resultado es negativo
{
  setTimeout ( function(){todoBien("segundo mensaje de prueba")}, 
  5000)
}
)

// getUser
//  .then (function () {
//    console.log ("aguante todo")
//  })
//  .catch (function (MensajeDeTodoMAl) {
//    console.log (MensajeDeTodoMAl)
//  })

 Promise.race ([
   getUser1,
   getUser2
 ])
 .then (function (MensajeDePrueba) {
  console.log (MensajeDePrueba)
})  
.catch (function (MensajeDePrueba) {
  console.log (MensajeDePrueba)
})



// -------------------- ajax para jQuery
 

$.ajax('https://randomuser.me/api/', {
    method: 'GET',
    success: function(data){
        console.log(data)
    },
    error: function(error){
        console.log(error)
    }

})

fetch ('https://randomuser.me/api/')
  .then (function (response) {
    // console.log (response)
    return response.json()
  })
  .then (function (user) {
    console.log ('user', user.results[0].name.first)
  })
  .catch (function () {
    console.log ("algo fallo")
  });
  
  
  
  
  (async function load () {
    async function getData (url) {
      const response = await fetch  (url)
      const data = await response.json()
      if (data.data.movie_count > 0){
        return data
      }
      throw new Error ('No se encontró ningún resultado');
    }

    const $form = document.getElementById('form')
    const $home = document.getElementById('home')
    const $featuringContainer = document.getElementById('featuring')
    
    function setAttributes($element, attributes) {
      for (const attribute in attributes) {
        $element.setAttribute(attribute, attributes[attribute]);
      }
    }

    function featuringTemplate (peli) {
      return (
        `
        <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">"${peli.title}" </p>
        </div>
      </div>
        `
      )
    }

  
    $form.addEventListener("submit", async (event) => {
      // debugger
      event.preventDefault();
      $home.classList.add('search-active')
      const $loader = document.createElement('img');
      setAttributes($loader, {
        src: 'images/loader.gif',
        height: 50,
        width: 50,
      })
      $featuringContainer.append($loader);
      

      const data = new FormData($form)
      try {
        const {
          data: {
            movies: pelis
          }
        } = await getData (`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`)
        
        const HTMLString = featuringTemplate(pelis[0])
        $featuringContainer.innerHTML = HTMLString
      }catch(error){
        alert(error.message);
        $loader.remove();
        $home.classList.remove('search-active')

      }
    })


    
    
    function videoItemTemplate ( movie, category) {
      return (  
        `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
        <img src=${movie.medium_cover_image}>
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>
        </div>`
        )} // esta funcion es el template de como quiero presentar cada pelicula
        
        function createTemplate (HTMLString){
          const html = document.implementation.createHTMLDocument()
          html.body.innerHTML =  HTMLString;
        return html.body.children[0];
    }

    function addEventClick ($element){
      $element.addEventListener('click', function(){
        // alert('hiciste click')
        showModal($element)
      })
    }

    
    function renderMovielist (list, $container, category){
      $container.children[0].remove();  // con esta entrada estamos removiendo el primer elemento dentro del container, que es la imagen del loader.
      // actionList.data.movies    =    list.
      list.forEach((movie) => {
        const HTMLString = videoItemTemplate (movie, category); 
        const movieElement = createTemplate(HTMLString);
        $container.append(movieElement);
        const image = movieElement.querySelector('img')
        image.addEventListener( 'load', event => event.target.classList.add('fadeIn') )
        addEventClick(movieElement);
    })

    };

    async function cacheExist(category) {
      const listName = `${category}List`
      const cacheList = window.localStorage.getItem(listName);
      if (cacheList){
        return JSON.parse(cacheList) // con este if lo que hacemos es chequear que, en caso de que haya un dato en cacheList, nos retorne ese dato en forma de objeto
      }

      const {data: { movies: data}} = await getData (`https://yts.mx/api/v2/list_movies.json?genre=${category}`) // en caso de que el if sea negativo, que nos procese el getData desde la direccion.
      window.localStorage.setItem(listName, JSON.stringify(data))

      return data 
    }

    const actionList = await cacheExist('action')
    // window.localStorage.setItem('actionList', JSON.stringify(actionList))
    const $actionContainer = document.getElementById('action')
    renderMovielist (actionList, $actionContainer, "action" )

    const dramaList = await cacheExist('drama')
    const $dramaContainer = document.getElementById('drama')
    renderMovielist (dramaList, $dramaContainer, "drama" )

    const animationList = await cacheExist('animation')
    const $animationContainer = document.getElementById('animation')
    renderMovielist (animationList, $animationContainer, "animation" )
    
    
 

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')


  function findById (list, id){
    return  list.find((movie) =>  movie.id === parseInt(id, 10))
  }
  function findMovie(id, category) {
    switch(category){
      case 'action' :{ 
        return findById(actionList, id)
        
      }
      case 'drama' :{ 
        return findById(dramaList, id)

      }
      case 'default' :{ 
        return findById(animationList, id)

      }}}

  function showModal($element){
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie(id, category)

    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src', data.medium_cover_image)
    $modalDescription.textContent = data.description_full
  }

  $hideModal.addEventListener('click',hideModal)
    function hideModal () {
      $overlay.classList.remove('active')
      $modal.style.animation = 'modalOut .8s forwards'
    }
  



  


  }) ();