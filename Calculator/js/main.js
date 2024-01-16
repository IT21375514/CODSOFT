
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


    /**
    * Calculator function
    */

    let currentTotal = 0;
    let buffer = "0";

    let previousOperator = null;

    const calculatorScreen = document.querySelector(".calc-numbers");

    document.querySelector('.calculator-buttons').addEventListener("click", function (event) {
        buttonClick(event.target.innerHTML);
    });

    //separates the value of the button clicks into NotANumber and Numbers
    function buttonClick(value) {
        if (isNaN(parseInt(value))) {
            handleSymbols(value);
        } else {
            handleNumbers(value);
        }
        rerenderScreen(value);
    }

    function handleSymbols(value) {
        if (value === "C") {
            buffer = "0";
            currentTotal = 0;
            previousOperator = null;
        } else if (value === "=") {
            if (previousOperator === null) {
                return;
            }
            calculateFunctions(parseInt(buffer));
            buffer = "" + currentTotal;
            previousOperator = null;
            currentTotal = 0;
        } else if (value === "←") {
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
        } else {
            handleCalculations(value);
        }
    }

    function handleNumbers(value) {
        if (buffer === "0") {
            buffer = value;
        } else {
            buffer += value;
        }
    }

    function handleCalculations(value) {
        const internalBuffer = parseInt(buffer);

        if (currentTotal === 0) {
            currentTotal = internalBuffer;
        } else {
            calculateFunctions(internalBuffer);
        }

        previousOperator = value;

        buffer = "0";
    }

    function calculateFunctions(internalBuffer) {
        if (previousOperator === "+") {
            currentTotal += internalBuffer;
        } else if (previousOperator === "-") {
            currentTotal -= internalBuffer;
        } else if (previousOperator === "x") {
            currentTotal *= internalBuffer;
        } else {
            currentTotal /= internalBuffer;
        }
    }

    function rerenderScreen(value) {
        if (previousOperator == null) {
            calculatorScreen.value = buffer;
        } else if (buffer == 0 && value!=0) {
            calculatorScreen.value = currentTotal + " " + previousOperator;
        } else {
            calculatorScreen.value = currentTotal + " " + previousOperator + " " + buffer;
        }

    }

})()

