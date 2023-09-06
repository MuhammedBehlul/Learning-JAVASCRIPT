var buttonW = document.querySelector(".w");
var buttonA = document.querySelector(".a");
var buttonS = document.querySelector(".s");
var buttonD = document.querySelector(".d");
var buttonJ = document.querySelector(".j");
var buttonK = document.querySelector(".k");
var buttonL = document.querySelector(".l");


for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        alert("I got clicked!");

    });
}


