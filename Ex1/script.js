function addLine() {
  let r = fetch("./becode.json");
  let body = document.querySelector("body");
  console.log(r);
  let jsn = r.then((response) => response.json());
  console.log(typeof jsn);

  jsn.then((j) => {
    //look into .then() the first one i get but the second one ?
    for (el of j) {
      console.log("forloop");
      console.log(el);
      let div = document.createElement("div");
      let content = document.createTextNode(el);
      div.appendChild(content);
      body.appendChild(div);
    }
  });
}
let button = document.querySelector("button");

button.addEventListener("click", (e) => {
  addLine();
});
