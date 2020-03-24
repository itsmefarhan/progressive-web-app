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
      // delete data
    }
  });
});
