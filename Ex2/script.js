let totalFacts = 0;
let storage = window.localStorage;
let body = document.querySelector("body");

function requestFact(category) {
  let randomFact = "";
  if (category != "none") {
    randomFact = fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
  } else {
    randomFact = fetch(`https://api.chucknorris.io/jokes/random`);
  }
  randomFact
    .then((data) => data.json())
    .then((fact) => {
      // since .json() returns a promise i need to resolve that promise
      let div = document.createElement("div");
      let content = document.createTextNode(fact.value);
      storage.setItem(totalFacts, fact.value);
      totalFacts += 1;
      console.log(totalFacts);
      div.appendChild(content);
      body.appendChild(div);
    });
}

function loadFacts() {
  totalFacts = storage.length;
  console.log(storage.length);
  for (let i = 0; i < storage.length; i++) {
    let div = document.createElement("div");
    let content = document.createTextNode(storage.getItem(i));
    div.appendChild(content);
    body.appendChild(div);
  }
}

let buttonTrigger = document.querySelector(".trigger");
let buttonTrash = document.querySelector(".trash");
let selector = document.querySelector("select");
loadFacts();

// Get menu list
let categoryList = fetch("https://api.chucknorris.io/jokes/categories")
  .then((ev) => ev.json())
  .then((e) => {
    for (el of e) {
      // create entry for each category
      let entry = document.createElement("option");
      console.log(entry);
      entry.setAttribute("value", el);
      let content = document.createTextNode(el);
      entry.appendChild(content);
      selector.appendChild(entry);
    }
    // Create None option
    content = document.createTextNode("none");
    entry = document.createElement("option");
    entry.appendChild(content);
    entry.setAttribute("value", "none");
    selector.appendChild(entry);
  });

buttonTrigger.addEventListener("click", (e) => {
  requestFact(selector.value);
});

buttonTrash.addEventListener("click", (e) => {
  storage.clear();
  window.location.reload();
});
