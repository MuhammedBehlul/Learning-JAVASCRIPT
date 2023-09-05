var randomNumber1 = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
var randomNumber2 = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6

// Get the image elements with specific classes (replace "img1" and "img2" with the actual class names)
var imgElement = document.querySelector(".img1");
var imgElement2 = document.querySelector(".img2");

if (imgElement && imgElement2) {
    // Depending on the random number, set the src attribute of the selected image element
    switch (randomNumber1) {
        case 1:
            imgElement.setAttribute("src", "./images/dice1.png");
            break;
        case 2:
            imgElement.setAttribute("src", "./images/dice2.png");
            break;
        case 3:
            imgElement.setAttribute("src", "./images/dice3.png");
            break;
        case 4:
            imgElement.setAttribute("src", "./images/dice4.png");
            break;
        case 5:
            imgElement.setAttribute("src", "./images/dice5.png");
            break;
        default:
            imgElement.setAttribute("src", "./images/dice6.png");
            break;
    }

    switch (randomNumber2) {
        case 1:
            imgElement2.setAttribute("src", "./images/dice1.png");
            break;
        case 2:
            imgElement2.setAttribute("src", "./images/dice2.png");
            break;
        case 3:
            imgElement2.setAttribute("src", "./images/dice3.png");
            break;
        case 4:
            imgElement2.setAttribute("src", "./images/dice4.png");
            break;
        case 5:
            imgElement2.setAttribute("src", "./images/dice5.png");
            break;
        default:
            imgElement2.setAttribute("src", "./images/dice6.png");
            break;
    }

} else {
    console.log("No element with class 'img1' and 'img2' found.");
}


if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "<i class='fas fa-flag' style='color: red'></i> Player 1 Wins!";
}
else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! <i class='fas fa-flag' style='color: red'></i>";
}
else {
    document.querySelector("h1").innerHTML = "Draw!";
}