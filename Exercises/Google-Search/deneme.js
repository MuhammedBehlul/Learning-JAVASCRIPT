function fibonacciGenerator(n) {
    //Do NOT change any of the code above 👆
    let array = [0, 1];

    for (var i = 2; i < n; i++) {
        nextValue = array[i - 1] + array[i - 2];
        array.push(nextValue);
    }


    return array;


    //Return an array of fibonacci numbers starting from 0.

    //Do NOT change any of the code below 👇
}
fibonacciGenerator(5);