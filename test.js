let counter = 0
let myInterval = setInterval(() => {
    console.log(counter);
    counter += 1
    if (counter === 10){
        counter = 0;
}
}, 1000)



