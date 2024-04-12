// Your code here

const baseUrl = `https://my-json-server.typicode.com/Mworia-Ian/wk3-code-challenge/films`

fetch(baseUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    // convert response to json
}).then((res) => res.json())
    // we can now access the converted data
  .then((data) => {

    const movieTitles = document.getElementById('films')


    data.forEach((title) => {
        const paragraph = document.createElement('li')

        paragraph.classList.add("film", "item")

        // paragraph.addEventListener('click', fetchFilmById(title.id))
        paragraph.addEventListener("click", async () => {
            currentFilmId = title.id;
            const selectedFilm = await fetchFilmById(currentFilmId);
            updateFilmDetails(selectedFilm);
        });



        paragraph.innerText = title.title

        movieTitles.append(paragraph)}) 
        
    })

    const fetchFilmById = async(id) => {

        const response = await 

        fetch(`${baseUrl}/${id}`);

        const filmData = await response.json();

        return filmData;
    }

    const updateFilmDetails = (selectedFilm) => {

       const posters = document.getElementById('poster')

       posters.src = selectedFilm.poster

       const movieTitle = document.getElementById('title')

       movieTitle.innerHTML = selectedFilm.title

       const runTime = document.getElementById('runtime')

       runTime.innerHTML = selectedFilm.runtime + ' Minutes'

       const description = document.getElementById('film-info')

       description.innerHTML = selectedFilm.description

       const showtime = document.getElementById('showtime')

       showtime.innerHTML = selectedFilm.showtime

       const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold

       document.getElementById('ticket-num').innerHTML = availableTickets

       if (availableTickets <= 0){
            const btn = document.getElementById('buy-ticket')
            btn.innerText = 'SOLD OUT!!'
            btn.disable = true
       }
    }

    
    const buyTicket = async () => {
        const response = await fetch(`${baseUrl}/${currentFilmId}`, {
        method: "PATCH",
        headers: {
         "Content-Type": "application/json",
        },
            body: JSON.stringify({
            tickets_sold: 1
            })
            })
        
        if(response.ok) {
            const updatedFilm = await fetchFilmById(currentFilmId)
            updateFilmDetails(updatedFilm)
            }

        else{
        console.error('Something went wrong')
            }
        }
        
        const buyticket = document.getElementById('buy-ticket')
        // buyticket.addEventListener("click", buyTicket);

        buyticket.addEventListener("click", async (e) => {
            e.preventDefault();
            await buyTicket()
           } )
        
    

    