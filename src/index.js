// { 
//   "id": 1,
//   "name": "Mr. Bonkers",
//   "isGoodDog": true,
//   "image": "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_1.jpg"
// }

const dogURL = 'http://localhost:3000/pups'
let dogBar // cannot set and define it in global because index.js script is in the header


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  dogBar = document.querySelector('#dog-bar') // defines dogBar before calling other functions so they can use them.

  getDogs()
  // addListenerToDogSpan()
  // addListenerToDogBar()
  // dogCard()
});


// fetch dogs // put on DOM

function getDogs () {
  fetch(dogURL)
  .then(resp => resp.json())
  .then(dogs => {
    dogs.forEach(dog => {
      addDogs(dog)

    
    });
  })
}

function addDogs (dog) {
  addToDogBar(dog)
  dogCard(dog)
  // addListenerToDogSpan(dog)
  // if button in dogBar is clicked run code below:
  

  // const dogInfo = document.getElementById('dog-info')
  // span.addEventListener('click', (e) => {
  //   let doggo = e.target
  //   console.log(doggo.dataset.name)
  //   const dogInfo = document.getElementById('dog-info')
  //   // dogCard(doggo)
    
  //   // unhide target div and display in center? hmm would that work. 
  //   // get info from span dataset
  //   // display that info 

}

// function addListenerToDogSpan (dogTarget) {
//   const selectedDog = document.querySelector(`[data-id='${dogTarget.dataset.id}']`)

//   selectedDog.addEventListener('click', (e) => {
//     console.log(e.target)
//     dogCard(e.target)
//   })


// }

function addToDogBar(dog) {
  const span = document.createElement('span')
  const dogInfo = document.getElementById('dog-info')

  span.textContent = dog.name
  span.dataset.id = dog.id
  span.style.cursor = 'pointer'
  span.addEventListener('click', (e) => {
    const dogDiv = document.getElementById(`${dog.id}`)
    if (e.target.dataset.id == dogDiv.id) {
      dogDiv.style.display = "block" 

      console.log(dogDiv)
    } else if (e.target.dataset.id !== dogDiv.id) {
      dogDiv.style.display = "none"
    }
    
  })
  
  dogBar.append(span)
}

function dogCard (dog) {
  const dogInfo = document.getElementById('dog-info')

  const dogDiv = document.createElement('div')
  dogDiv.id = dog.id
  dogDiv.dataset.id = dog.id
  dogDiv.style.display = "none"
  dogDiv.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button class="doggoAlignment">${dog.isGoodDog}</button>
  `
  dogInfo.append(dogDiv)

  // dogInfo.dataset.id = dog.id

  // dogInfo.innerHTML = `
  //   <img src="${dog.image}">
  //   <h2>${dog.name}</h2>
  //   <button class="doggoAlignment">${dog.isGoodDog}</button>
  // `
}


//   return displayDog
// }

// create html diplay for dogInfo



// When a user clicks on a pup's span in the dog bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". When you have the pup's information, the dog info div should have the following children:

// an img tag with the pup's image url
// an h2 with the pup's name
// a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false. Ex: <img src=dog_image_url> <h2>Mr. Bonkers</h2> <button>Good Dog!</button>
