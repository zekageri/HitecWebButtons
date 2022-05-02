var numInput = {
    scrollingDetails: {},
    inputScrollerInterval: null,
    scrollingSensitivity: 50,       // ms
    mousePosition : {'x': 0, 'y': 0},
    init: function() {
        this.events();
    },
    events: function() {
        this.scrollerStartEvent();
        this.scrollerEndEvent();
        this.fetchMousePosition();
    },
    fetchMousePosition: function() {
        document.addEventListener('mousemove', e => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            if( numInput.scrollingDetails.isScrolling ){
                numInput.setGrabbingCursor();
            }
        });
    },
    scrollerStartEvent: function() {
        let scrollers = qsa(".hshNumberScroller");
        for (let i = 0; i < scrollers.length; i++) {
            scrollers[i].addEventListener('mousedown', function(e) {
                let inputID = this.getAttribute('data-scroller');
                numInput.scrollingDetails = {
                    startY: e.clientY,
                    lastY: e.clientY,
                    currentValue: parseInt( qs(`#${inputID}`).value ),
                    inputID: inputID,
                    scrollerElem: scrollers[i],
                    isScrolling: true,
                };
                numInput.startInputScrolling();
                e.preventDefault();
            });
        }
    },
    setGrabbingCursor: function(){
        numInput.scrollingDetails.scrollerElem.classList.add("scrolling");
        numInput.scrollingDetails.scrollerElem.style.cursor = "grabbing";
        document.body.style.cursor = "grabbing";
    },
    setGrabCursor: function(){
        numInput.scrollingDetails.scrollerElem.classList.remove("scrolling");
        numInput.scrollingDetails.scrollerElem.style.cursor = "grab";
        document.body.style.cursor = "default";
    },
    scrollerEndEvent: function() {
        document.addEventListener('mouseup', function(e) {
            if( numInput.scrollingDetails.isScrolling ){
                numInput.scrollingDetails.isScrolling = false;
                clearInterval( numInput.inputScrollerInterval );
                numInput.setGrabCursor();
            }
        });
    },
    startInputScrolling: function() {
        clearInterval( numInput.inputScrollerInterval );
        numInput.inputScrollerInterval = setInterval(() => {
            if( numInput.mousePosition.y != numInput.scrollingDetails.lastY ){
                if( numInput.scrollingDetails.startY > numInput.mousePosition.y ){
                    numInput.scrollingDetails.currentValue -= 1;
                } else if( numInput.scrollingDetails.startY < numInput.mousePosition.y ){
                    numInput.scrollingDetails.currentValue += 1;
                }
                numInput.scrollingDetails.lastY = numInput.mousePosition.y;
                qs(`#${numInput.scrollingDetails.inputID}`).value = numInput.scrollingDetails.currentValue;
            }
        }, numInput.scrollingSensitivity);
    },
};