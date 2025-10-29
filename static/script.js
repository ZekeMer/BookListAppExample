console.log("Script is loaded from base.html");
// -------------------------------------------------------------
// script.js - JavaScript for Book App
// -------------------------------------------------------------
// This file handles DOM interactions and event listeners
// to make the Flask app more interactive for users.
// -------------------------------------------------------------
// Wait for the page to load before running scripts so that the scripts are able to do stuff!
document.addEventListener("DOMContentLoaded", () => {
    // --------------------------
    // 1. Validate required fields on blur. This is when a text field is clicked on.
    // --------------------------
    const requiredInputs = document.querySelectorAll('input[required]');
    //callback function! .forEach will take each value on the list and give to input.
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            //If there is nothing in the text box that is focused on, then . . .
            if (!input.value.trim()) {
            //not really for customer use, but easy to see for development. Shows on browser.    
                alert(`Please fill out the ${input.name} field.`);
            }
        });
    });
    // --------------------------
    // 2. Confirm before deleting a book
    // --------------------------
    const deleteLinks = document.querySelectorAll('.delete-link');
    deleteLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            //Shows on browser.
            const confirmDelete = confirm("Are you sure you want to delete this book?");
            if (!confirmDelete) {
                event.preventDefault(); // .preventDefault stops navigation 'if' DON'T want to delete. 
            }
        });
    });
    // --------------------------
    // 3. Example of DOM selection and logging
    // --------------------------
    // Just for teaching purposes – shows how JavaScript sees the page.
    const table = document.querySelector('#booksTable');
    if (table) {
        console.log("The books table has been loaded!");
    }
});