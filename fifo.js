let myAarray = ["amirmhmd", "hoseini", "23", "mashhad"];

function push(newValue) {
  let tempArray = [];
  tempArray[0] = newValue;
  const len = myAarray.length;
  for (let i = 1; i < len + 1; i++) {
    tempArray[i] = myAarray[i - 1];
  }
  myAarray = tempArray;
  console.log(myAarray);
}

function pop() {
  if (myAarray.length === 0) {
    return ;
  } else {
    let len = myAarray.length;
    tempArray = [];
    console.log(myAarray[len - 1]);
    for (let i = 0; i < len - 1; i++) {
      tempArray[i] = myAarray[i];
    }
    myAarray = tempArray;
    console.log(myAarray);
  }
}

// push tests
console.log(myAarray);
push("salam");
push("meow");

// pop tests
pop();
pop();
