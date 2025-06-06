/**
 * Enhanced custom cursor functionality
 * This script handles all cursor interactions and ensures OS cursor is hidden
 */

document.addEventListener('DOMContentLoaded', function () {
    // Force cursor: none on all elements that might not inherit it
    const forceNoCursor = () => {
        const elementsToFix = document.querySelectorAll('.stack-card, .stack-card *, .card-stack, .card-stack-container, .stack-indicator, .stack-indicator *');
        elementsToFix.forEach(el => {
            el.style.cursor = 'none !important';
        });
    };

    // Run initially
    forceNoCursor();

    // Also run after a short delay to catch dynamically created elements
    setTimeout(forceNoCursor, 500);

    // Re-initialize custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Ensure cursor follows mouse everywhere
    document.addEventListener('mousemove', function (e) {
        cursor.classList.add('active');
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.transform = 'translate(-50%, -50%)';
    });

    // Handle click animation
    document.addEventListener('mousedown', function (e) {
        cursor.classList.add('click');
        setTimeout(() => {
            cursor.classList.remove('click');
        }, 300);
    });

    // Hide on mouse leave
    document.addEventListener('mouseleave', function () {
        cursor.classList.remove('active');
    });

    // Special handling for stack cards
    const stackCardArea = document.querySelector('.card-stack-container');
    if (stackCardArea) {
        // Add a mutation observer to watch for changes in the stack card area
        const observer = new MutationObserver(forceNoCursor);
        observer.observe(stackCardArea, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        // Add extra event listeners to ensure cursor stays hidden
        stackCardArea.addEventListener('mouseenter', forceNoCursor);
        stackCardArea.addEventListener('mouseover', forceNoCursor);
    }
});
