
//import the js data file

import { temples } from "../data/temples.js";

// console.log(temples)

import { url } from "../data/temples.js";

// console.log(url)

const showHere = document.querySelector(`#showHere`);

const mydialog = document.querySelector(`#mydialog`);

const myTitle = document.querySelector(`#mydialog h2`);

const myInfo = document.querySelector(`#mydialog p`);

const myClose = document.querySelector(`#mydialog button`);

myClose.addEventListener(`click`, () => {
    dialogBox.closest();
})

function displayItems(data) {
    console.log(data)

    data.forEach(element => {
        console.log(element)

        // create a photo element to hold the images

        const photo = document.createElement(`img`)
        photo.src = `${url}${element.path}`
        photo.alt = element.name

        // add an eventlistener to each division on the page

        photo.addEventListener(`click`, () => showStuff(element));

        showHere.appendChild(photo)
    });
}

// to display all items in the JSON file
displayItems(temples)

// populate the image with informaton when clicked

function showStuff(element) {
    myTitle.innerHTML = element.name
    myInfo.innerHTML = `dedicated ${element.dedicated} by ${element.person} as temple number ${element.number}`
    mydialog.showModal()
}



