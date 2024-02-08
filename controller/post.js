import Post from "../model/post.js";

const getHome = (req, res, next) => {
    Post.find().then(posts => {
        res.render("home", {
            posts: posts
        });
    }).catch(err => {
        console.log(err);
    })
};

const insertPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        date: new Date(),
        image: (req.file) ? req.file.buffer : ""
    });

    post.save().then(post => {
        res.status(201).json({ post: post, imageString: "data:image/String;base64," + Buffer.from(post.image).toString("base64")});
    }).catch((err) => {
        console.log(err);
    })
}

export { insertPost, getHome };