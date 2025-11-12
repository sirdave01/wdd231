// how to write promise in script for the synchronous loading of a json file

const myPromise = new Promise((resolve, reject) => {
    const success = true; // Simulate success or failure
    if (success) {
        resolve("Operation was successful!");
    } else {
        reject("Operation failed.");
    }
});

// To handle the result of a promise, you can use the .then() and .catch() methods:

myPromise
    .then((result) => {
        console.log(result); // Output: "Operation was successful!"
    })
    .catch((error) => {
        console.error(error); // Output: "Operation failed."
    });

// Now, let's see how async/await can simplify this process. The async keyword is used to define an asynchronous function,
// and the await keyword is used to pause the execution of that function until a promise is resolved or rejected.

// Here's how you can rewrite the previous example using async/await:

const myAsyncFunction = async () => {
    try {
        const result = await myPromise; // Wait for the promise to resolve
        console.log(result); // Output: "Operation was successful!"
    } catch (error) {
        console.error(error); // Output: "Operation failed."
    }
};

// Here's a simple example of using async/await to fetch data from an API:
// The await keyword can only be used inside an async as shown in the next example.

const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be converted to JSON
        console.log(data); // Output the fetched data
    } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
    }
};

// For example, the following code uses the fetch() method to make a GET request to an example URL 
// at 'https://jsonplaceholder.typicode.com/todos/'.

const response = await fetch('https://jsonplaceholder.typicode.com/todos/');


// You can then use the.json() method on the response object to parse the JSON data and use it in your application.
// The.json() method also returns a promise, 
// so you can use the await keyword to wait for the data to be parsed before using it.

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/'); // request
    const data = await response.json(); // parse the JSON data
    console.log(data); // temp output test of data response 
}

getData();