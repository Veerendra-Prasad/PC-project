// Get the current URL
let url = new URL(window.location.href);

// Add or update the 'mode' parameter to 'dark'
url.searchParams.set('mode', 'dark');

// Convert the URL object back to a string
let updatedUrl = url.toString();

// Optionally, you can update the browser's address bar without reloading the page
window.history.pushState({ path: updatedUrl }, '', updatedUrl);

console.log(updatedUrl);
