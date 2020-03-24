// offline data
db.enablePersistence().catch(err => {
  if (err.code == "failed-precondition") {
    // if multiple tabs open
    console.log("Persistence failed");
  } else if (err.code == "") {
    // if browser not supports it
    console.log("Persistence is not available");
  }
});

// realtime listener
db.collection("foodrecipes").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeRecipe(change.doc.id);
    }
  });
});

// add recipe
const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection("foodrecipes")
    .add(recipe)
    .catch(err => console.error(err));

  form.title.value = "";
  form.ingredients.value = "";
});

// delete recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", event => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    db.collection("foodrecipes")
      .doc(id)
      .delete();
  }
});
