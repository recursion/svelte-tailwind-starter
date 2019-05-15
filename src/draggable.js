// Makes an element draggable to anywhere on the page.
// modified the pannable code from https://svelte.dev/tutorial/actions
// TODO: give it bounding boxes (window size)
// TODO: make it only droppable in certain locations
export function draggable(node, options = {}) {
    let x;
    let y;

    const nodePosition = { x: 0, y: 0 };
    function handleMousedown(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragstart', {
            detail: { x, y }
        }));

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
    }

    function handleMousemove(event) {
        const { width, height } = node.getBoundingClientRect();
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        x = event.clientX;
        y = event.clientY;

        let nextX = nodePosition.x + dx;
        let nextY = nodePosition.y + dy;
        const container = options.container || window;
        let containerWidth, containerHeight;
        console.log(container);
        if (container === window) {
            containerWidth = window.innerWidth;
            containerHeight = window.innerHeight;
        } else {
            containerWidth = container.getBoundingClientRect().width;
            containerHeight = container.getBoundingClientRect().height;
        }
        if (options.boundingBox) {
            if (nextX + width + 1 <= containerWidth && nextX >= 0) {
                nodePosition.x = nextX;
            }
            if (nextY + height + 1 <= containerHeight && nextY >= 0) {
                nodePosition.y = nextY;
            }
        } else {
            nodePosition.x = nextX;
            nodePosition.y = nextY;
        }

        node.dispatchEvent(new CustomEvent('dragmove', {
            detail: { x, y, dx, dy }
        }));

        node.style = `transform: translate(${nodePosition.x}px, ${nodePosition.y}px)`;
    }

    function handleMouseup(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragend', {
            detail: { x, y }
        }));

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
    }

    node.addEventListener('mousedown', handleMousedown);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    };
};