
const openButton = document.querySelector(`#openButton`);
const dialogBox = document.querySelector(`#dialogBox`);
const closeButton = document.querySelector(`#closeButton`);
const fruitContainer = document.querySelector(`#fruitContainer`);

// show the dialog box

openButton1.addEventListener(`click`, () => {
    dialogBox.showModal();
    fruitContainer.innerHTML = `One Apple carton contains 98 calories`
});

openButton2.addEventListener(`click`, () => {
    dialogBox.showModal();
    fruitContainer.innerHTML = `One Orange carton contains 98 Vitamins`
});

openButton3.addEventListener(`click`, () => {
    dialogBox.showModal();
    fruitContainer.innerHTML = `One Melon carton contains798 calories`
});

//close the dialog box

closeButton.addEventListener(`click`, () => {
    dialogBox.close();
});