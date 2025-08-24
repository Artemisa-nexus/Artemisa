import { renderRouter } from "../routes.js";

// Event listener for clicks on links
window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const isLink = e.target.matches('[data-link]');
        if (isLink) {
            e.preventDefault();  // Prevent default action (page reload)

            const targetUrl = e.target.href; // Get the target URL
            history.pushState(null, null, targetUrl);  // Change the URL without reloading the page

            renderRouter();  // Call renderRoute() to update the content based on the new URL
        }
    });
});

// Event listener for when the navigation history changes
window.addEventListener('popstate', renderRouter);

// Event listener for when the page initially loads
window.addEventListener('load', renderRouter);

