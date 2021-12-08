let btn = document.querySelector(".btn");
let count1 = document.querySelector(".count1");
let count2 = document.querySelector(".count2");

btn.addEventListener("click", () => {
    let arr1 = [];
    let arr2 = [];

    for (let i = 0; i < 20; i++) {
        let min = 1;
        let max = 100;
        let result = Math.random() * (max - min) + min;
        let nr = Math.floor(result);

        if (nr % 2 === 0) {
            arr1.push("\n" + nr);
        } else {
            arr2.push("\n" + nr);
        }
    }

    arr1.sort((a, b) => a - b);
    let val1 = count1.innerText + arr1;
    count1.innerText = val1;

    arr2.sort((a, b) => a - b);
    let val2 = count2.innerText + arr2;
    count2.innerText = val2;
});
