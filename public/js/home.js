const buttonSubmit = document.querySelector("input[value=Invia]");
buttonSubmit.addEventListener("click", function(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", document.querySelector("input[name=title]").value);
    formData.append("description", document.querySelector("textarea[name=description]").value);
    formData.append("image", document.querySelector("input[name=image]").files[0]);

    fetch("http://localhost:3030/insertPost", {
        method: "POST",
        body: formData
    }).then(result =>
        result.json()
    ).then(result => {
        const post = result.post;
        const divPosts = document.querySelector("div#posts");
        const date = new Date(post.date);

        const htmlPost = "<img src='" + result.imageString + "'>" +
            "<h6>" + post.title + "</h6>" +
            "<p>Date: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "</p>" + 
            "<span>Description</span><br/>" +
            "<p>" + post.description + "</p><br/>";

        document.querySelector("input[name=title]").value = "";
        document.querySelector("textarea[name=description]").value = "";
        document.querySelector("input[name=image]").value = null;

        divPosts.innerHTML += htmlPost;
    })
});
