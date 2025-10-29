
// -------------------------------------------------------------
// script.js - JavaScript for Book App
// -------------------------------------------------------------
// This file handles DOM interactions and event listeners
// to make the Flask app more interactive for users.
// -------------------------------------------------------------
// Wait for the page to load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    // --------------------------
    // 1. Validate required fields on blur
    // --------------------------
    const requiredInputs = document.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
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
            const confirmDelete = confirm("Are you sure you want to delete this book?");
            if (!confirmDelete) {
                event.preventDefault(); // stops navigation
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