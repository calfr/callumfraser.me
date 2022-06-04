"use strict";
function showProject(e){
    let allElements = document.querySelectorAll(".projects .info div");
    for(let e of allElements) {
        e.classList.remove("active");
    }
    let elements = document.querySelectorAll(".projects .info [data-project="+e+"]");
    for(let e of elements) {
        e.classList.add("active");
    }
}