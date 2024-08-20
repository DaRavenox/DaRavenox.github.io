function makeDraggable(element, handleElement) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Mouse Event Listeners
    handleElement.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Touch Event Listeners
    handleElement.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === handleElement) {
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

            setTranslate(currentX, currentY, element);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }
}


function makeWindowsWindow(window, toolbar, windowContent, minimize, close)
{
    makeDraggable(window, toolbar);
    windowContent.addEventListener('mousedown', function() {setTranslate(0, 0, Window); });
    minimize.addEventListener('mousedown', function (){windowContent.hidden = !windowContent.hidden; });
    close.addEventListener('mousedown', function () {window.remove(); });

}
document.addEventListener('DOMContentLoaded', function () {
    makeWindowsWindow(
        document.getElementById('logoWindow'),
        document.getElementById('logoWindowToolbar'),
        document.getElementById('logoWindowContent'),
        document.getElementById('logoWindowMinimize'),
        document.getElementById('logoWindowClose'));


    makeWindowsWindow(
        document.getElementById('headerWindow'),
        document.getElementById('headerWindowToolbar'),
        document.getElementById('headerWindowContent'),
        document.getElementById('headerWindowMinimize'),
        document.getElementById('headerWindowClose'))

});


const map_button_to_content = new Map();
function unhide(e) {

    for(let [key, value] of map_button_to_content)
    {
        value.hidden = e.target !== key;
    }
}

function addContentButton(content, button, startHidden = true)
{
    content.hidden = startHidden;
    map_button_to_content.set(button, content);
    button.addEventListener('mousedown', unhide);
}


document.addEventListener('DOMContentLoaded', function() {
    const contentElement = document.getElementById('homeContent');
    const buttonElement = document.getElementById('contentButton');
    addContentButton(contentElement, buttonElement, false);

    const aboutElement = document.getElementById('homeAbout');
    const aboutButtonElement = document.getElementById('aboutButton');
    addContentButton(aboutElement, aboutButtonElement);

    const servicesElement = document.getElementById('homeServices');
    const servicesButtonElement = document.getElementById('servicesButton');
    addContentButton(servicesElement, servicesButtonElement);

    const contactElement = document.getElementById('homeContact');
    const contactButtonElement = document.getElementById('contactsButton');
    addContentButton(contactElement, contactButtonElement);
});


function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}