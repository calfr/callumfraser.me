"use strict";
const greetings = [
    "Good morning!", // Shown between 6am and 11:59am
    "Good afternoon!", // Shown between midday and 5:59pm
    "Good evening!", // Shown between 6pm and 5:59am
];

const seasonalGreetings = [
    "Merry Christmas!", // Shown on Christmas Day at any time
    "Happy new year!" // Shown on the 1st January at any time.
];

const styles = [
    "morning", // Shown between 6am and 11:59am
    "afternoon", // Shown between midday and 5:59pm
    "evening", // Shown between 6pm and 5:59am
];

const seasonalStyles = [
    "christmas", // Shown on Christmas Day at any time
    "newyear" // Shown on the 1st January at any time.
];

function getGreeting() {
    const dateTime = new Date();
    // Seasonal greetings
    if (dateTime.getDate() == 25 && dateTime.getMonth() == 11) {
        return seasonalGreetings[0]
    }
    if (dateTime.getDate() == 1 && dateTime.getMonth() == 0) {
        return seasonalGreetings[1]
    }
    // Time based greetings
    if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
        return greetings[0]
    }
    if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
        return greetings[1]
    }
    if (dateTime.getHours() < 6 || dateTime.getHours() > 17) {
        return greetings[2]
    }
}

function getstyle() {
    const dateTime = new Date();
    var styleList = [];
    // Seasonal greetings
    if (dateTime.getDate() == 25 && dateTime.getMonth() == 11) {
        styleList.push(seasonalStyles[0]);
        return styleList
    }
    if (dateTime.getDate() == 1 && dateTime.getMonth() == 0) {
        styleList.push(seasonalStyles[1]);
        return styleList
    }
    // Non-exclusive variants
    if (dateTime.getMonth() == 5) {
        styleList.push("variant-1")
    }
    // Time based greetings
    if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
        styleList.push(styles[0])
    }
    if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
        styleList.push(styles[1])
    }
    if (dateTime.getHours() < 6 || dateTime.getHours() > 17) {
        styleList.push(styles[2])
    }
    return styleList;
}

function init() {
    const greeting = getGreeting();
    let elements = document.querySelectorAll("[data-greeting]");
    for (let e of elements) {
        e.textContent = greeting;
    }
    document.body.classList.add.apply(document.body.classList,getstyle());
}

document.addEventListener("DOMContentLoaded", init);