/**
 * @param spanEL: Represents the HTML span element to write text
 * @param speed: An integer in milliseconds, small (fast), high (slow)
 * @param words: An array of strings to type
 */
const TypeWriter = function (spanEL, words) {
    this.spanEL = spanEL;
    this.words = words;
    this.speed = 500;
    this.index = 0;
    this.word = "";
    this.isDeleting = false;

    this.type();
}

TypeWriter.prototype.type = function() {
    const fullWord = this.words[this.index % this.words.length];
    if (this.isDeleting) {
        this.word = fullWord.substring(0, this.word.length - 1);
    } else {
        this.word = fullWord.substring(0, this.word.length + 1);
    }
    this.spanEL.innerHTML = `<span class="txt">${this.word}</span>`;


    if(this.word === fullWord) {
        setTimeout(() => {
        this.isDeleting = true;
        this.speed = 100;
    }, 2000);
    } else if(this.word === "") {
        this.isDeleting = false;
        this.index++;
        this.speed = 200;
    }


    setTimeout(() => this.type(), this.speed);

}

function init() {
    const spanEL = document.querySelector(".txt-type");
    const words = JSON.parse(spanEL.getAttribute("data-words"));
    new TypeWriter(spanEL, words);
}

document.addEventListener("DOMContentLoaded", init);