
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal
    var zoomImages = document.querySelectorAll(".modalImg");
    var modalImg = document.getElementById("img01");

    // Iterate through each image and attach a click event
    zoomImages.forEach(function (zoomImage) {
        zoomImage.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        };
    });

    // Close the modal when the close button is clicked
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal if the user clicks outside the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

})()

