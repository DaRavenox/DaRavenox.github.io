document.addEventListener('DOMContentLoaded', function() {
    const logoWindow = document.getElementById('logoWindow');
    const toolbar = document.getElementById('logoWindowToolbar');
    const logoWindowContent = document.getElementById('logoWindowContent');

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Mouse Event Listeners
    toolbar.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Touch Event Listeners
    toolbar.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);
    logoWindowContent.addEventListener('mousedown', moveToOriginal);

    function moveToOriginal(e) {
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, logoWindow);

    }
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === toolbar) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, logoWindow);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const logoMinimize = document.getElementById('logoWindowMinimize');
    const logoWindowContent = document.getElementById('logoWindowContent');

    // Mouse Event Listener on x.
    logoMinimize.addEventListener('mousedown', minimize);

    function minimize(e) {
        logoWindowContent.hidden = !logoWindowContent.hidden;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logoX = document.getElementById('logoWindowClose');
    const logoWindow = document.getElementById('logoWindow');

    // Mouse Event Listener on x.
    logoX.addEventListener('mousedown', closeWindow);

    function closeWindow(e) {
        logoWindow.remove();
    }
});

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}