// learning how to fetch and display JSON data about latter-day prophets in a web page



// Declare a const variable named "url" that contains the URL string of the JSON resource provided.

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".

const cards = document.querySelector('#cards');

// Create a async defined function named "getProphetData" to fetch data from the JSON source url using the await fetch() method.

async function getProphetData() {

    const response = await fetch(url); // request the URL

    // Store the response from the fetch() method in a const variable named "response".

    const data = await response.json(); // parse the JSON data from the response

    // Add a console.table() expression method to check the data response at this point in the console window.

    // console.table(data); // temporary checking for valid response

    // console.table(data.prophets); // temporary checking for valid data
    displayProphets(data.prophets);
}

// Call the getProphetData() function to execute the data fetching process.

getProphetData();

// Define a function expression named "displayProphets" that handles a single
// parameter named "prophets" somewhere in your js file. Use an arrow expression
// to contain statements that will process the parameter value and build a card for each prophet.

const displayProphets = (prophets) => {
    // Use a forEach() method to loop through each prophet object
    // in the prophets array.
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element

        // create a section element and store it in a variable named card using createElement(),
        let card = document.createElement('section');

        // create an h2 element and store it in a variable named "fullName",
        let fullName = document.createElement('h2');

        // create an img element and store it in a variable named "portrait",
        let portrait = document.createElement('img');

        // populate the heading element with the prophet's full name using a template string to build the full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // build the image element by setting the src, alt, loading, width, and height attributes using setAttribute().
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Using appendChild() on the section element named "card", add the heading and image elements one at a time.
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Finally, append the section element named "card" to the div element with an id of "cards".
        cards.appendChild(card);
    });
}


