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
      return data
    }
    const $form = document.getElementById('form')
    $form.addEventListener('submit', () => {
      
    })


    const actionList = await getData ('https://yts.mx/api/v2/list_movies.json?genre=action')
    const dramaList = await getData ('https://yts.mx/api/v2/list_movies.json?genre=drama')
    const animationList = await getData ('https://yts.mx/api/v2/list_movies.json?genre=animation')
    console.log (actionList, dramaList , animationList)

    function videoItemTemplate ( movie) {
      return (  
        `<div class="primaryPlaylistItem">
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
        alert('hiciste click')
      })
    }

    
    function renderMovielist (list, $container){
      $container.children[0].remove();  // con esta entrada estamos removiendo el primer elemento dentro del container, que es la imagen del loader.
      // actionList.data.movies    =    list.
      list.forEach((movie) => {
        const HTMLString = videoItemTemplate (movie); 
        const movieElement = createTemplate(HTMLString);
        $container.append(movieElement); 
        addEventClick(movieElement);
    })

    };
    const $actionContainer = document.getElementById('action')
    renderMovielist (actionList.data.movies, $actionContainer )
    
    const $dramaContainer = document.getElementById('drama')
    renderMovielist (dramaList.data.movies, $dramaContainer )
    const $animationContainer = document.getElementById('animation')
    renderMovielist (animationList.data.movies, $animationContainer )

  const $featuringContainer = document.getElementById('featuring')
  const $home = document.getElementById('home')

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')




    // console.log (videoItemTemplate ('images/covers/bitcoin.jpg', 'bitcoin'))


  }) ();