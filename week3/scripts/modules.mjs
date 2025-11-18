// importing the modules from byuiCourse.mjs, sections.mjs and output.mjs into the modules.mjs

import byuiCourse from "./course.mjs";

import { setSectionSelection } from "./sections.mjs";

import { setTitle, renderSections } from "./output.mjs";

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);
    // adding the renderSections(byuiCourse.sections); here to update the displayed sections after enrollment change
    renderSections(byuiCourse.sections);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);
    // adding the renderSections(byuiCourse.sections); here to update the displayed sections after enrollment change
    renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);