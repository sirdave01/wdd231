// creating array of courses completed and not completed yet using false and true and using filter to filter the courses for each course name

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]



// creating a responsive hamburger button for the small screens
// using DOM to manipulate the HTML contents and 
// adding eventlistener for click reaction for the hamburger menu

const navButton = document.querySelector(`#nav-btn`);
const navlinks = document.querySelector(`#nav-bar`);

navButton.addEventListener(`click`, () => {
    navButton.classList.toggle(`show`);
    navlinks.classList.toggle(`show`);
})

// creating and eventlistener to dynamically populate the footer of the page's year and last modified date

document.addEventListener(`DOMContentLoaded`, function () {

    // for the current year

    const currentYear = document.querySelector(`#currentyear`);

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();
    }

    // for last modified date

    const lastEdited = document.querySelector(`#lastModified`);

    if (lastEdited) {

        lastEdited.textContent = `Last Modified: ${new Date().toLocaleString()}`
    }
})

// wayfinding, creating current class for any active/current page

document.addEventListener(`DOMContentLoaded`, () => {

    const activePage = window.location.pathname.split(`/`).pop() || `index.html`;

    links.forEach(link => {
        if (link.getAttribute(`href`) === activePage) {
            link.classList.add(`current`);
        }
    });
});

// dynamically populating the courses into the HTML course cards

let currentCourses = [...courses];

// create and call displayCourses and filterCourses functions and add an eventlistener for the buttons when clicked

function displayCourses(coursesToShow) {

    const container = document.querySelector(`#courses-container`);

    container.innerHTML = ``; //clears the container

    coursesToShow.forEach(course => {

        const card = document.createElement(`article`);

        card.className = `course-card ${course.completed ? `completed` : ``}`;

        card.innerHTML = `
        <h3> ${course.subject}:${course.number}</h3>
        <p> Credits: ${course.credits} </p>
        <p> Title: ${course.title} </p>
        <p> Certificate: ${course.certificate} </p>
        <p> Description: ${course.description} </p>
        <p> Technology: ${course.technology} </p>
        <span class="status">${course.completed ? `Completed` : `In Progress`}</span>
        `;

        container.appendChild(card);

    });

    // for the total credits with reduce

    const total = coursesToShow.reduce((sum, course) => sum + course.credits, 0);

    document.querySelector(`#totalCredits`).textContent = `Toral Credits: ${total}`;


}

function filterCourses(filterType) {

    switch (filterType) {
        case `wdd`:
            currentCourses = courses.filter(c => c.subject.startsWith(`WDD`));
            break;

        case `cse`:
            currentCourses = courses.filter(c => c.subject.startsWith(`CSE`));
            break;
        default:
            currentCourses = [...courses];
    }

    displayCourses(currentCourses);
}

// eventlistener for the buttons

document.addEventListener(`DOMContentLoaded`, () => {

    document.querySelector(`#allCourses`).addEventListener(`click`, () => filterCourses(`all`));

    document.querySelector(`#wddCourses`).addEventListener(`click`, () => filterCourses(`wdd`));

    document.querySelector(`#cseCourses`).addEventListener(`click`, () => filterCourses(`cse`));

    // initial load
    displayCourses(currentCourses);

})