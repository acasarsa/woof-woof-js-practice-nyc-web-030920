
const dogURL = 'http://localhost:3000/pups'
let dogBar // cannot set and define it in global because index.js script is in the header
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json' 
}

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
}

function addToDogBar(dog) {
  const span = document.createElement('span')
  const dogInfo = document.getElementById('dog-info')

  span.textContent = dog.name
  span.dataset.id = dog.id
  span.style.cursor = 'pointer'
  span.addEventListener('click', () => {
    dogInfo.innerHTML = ""
    dogCard(dog)
    
  })
  
  dogBar.append(span)
}

function dogCard (dog) {
  const dogInfo = document.getElementById('dog-info')
  dogInfo.dataset.id = dog.id
  

  dogInfo.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button class="doggoAlignment">${dogAlignment(dog)}</button>
  `

  dogInfo.addEventListener('click', (e) => {
    
    if (e.target.className === "doggoAlignment") {
      
      const parentDiv = e.target.parentNode
      let status = parentDiv.getElementsByClassName('doggoAlignment')
      console.log(status.textContent)
      // const attributeTarget = parentDiv.
      updateDogAlignment(status.parentNode)
      
      console.log(parentDiv.dataset.id)

    }
    // should cause a patch request to initiate and thus change the attribute thus triggering ternary above. 
    
  })
}

function dogAlignment (dog) {
  let button = document.getElementsByClassName('doggoAlignment')
  let alignment = dog.isGoodDog ? button.textContent = "Good Dog" : button.textContent = "Bad Dog"
  return alignment
}

function updateDogAlignment (dog) {
  console.log("from updateDogAlignment fn:", dog.dataset.id)
  fetch(`${dogURL}/${dog.dataset.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(dog.isGoodDog)
    
  })
  .then(resp => resp.json())
  .then(dog => {
    toggleAlignment(dog)
  })
}

function toggleAlignment (dog) {
  let button = document.getElementsByClassName('doggoAlignment')
  let statusChange = dog.textContent = "Good Dog" ? button.textContent = "Bad Dog" : button.textContent = "Good Dog"
  return statusChange
}





// add listener to button 
// // but text changes. button.textContent change? maybe
// // make patch request url interpolation 

// When a user clicks the Good Dog/Bad Dog button, two things should happen:

// The button's text should change from Good to Bad or Bad to Good
// The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// Please note, you can update a dog by making a PATCH request to /pups/:id
