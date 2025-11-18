function setSectionSelection(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");

    // clear existing options, except the first placeholder
    sectionSelect.innerHTML = '<option value="" disabled selected>Select Section</option>';

    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNumber;
        option.textContent = `${section.sectionNumber}`;
        sectionSelect.appendChild(option);
    });
}

export { setSectionSelection };