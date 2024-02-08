import Post from "../model/post.js";
import User from "../model/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    let token = req.get("Authorization").split(" ")[1];

    try{
        var tokenDecoded = jwt.verify(token, process.env.PK_JWT);
    } catch(err){
       return res.status(500).json();
    }

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

const postSignUp = (req, res, next) => {
    User.find({$or: [{email: req.body.email}, {username: req.body.username}]}).then(result => {
        if(result.length > 0){
            return res.redirect("/");
        }

        bcrypt.hash(req.body.password, Number(process.env.NUMSALT), function(err, hashPassword) {
            if(err){
                console.log(err);
                return res.redirect("/");
            }

            const user = new User({
                username: req.body.username,
                password: hashPassword,
                email: req.body.email
            });

            user.save().then(() => {
                res.status(201).json({success: "Account creato con successo"});
            }).catch(err => {
                console.log(err);
            });
        });
    }).catch(err => {
        console.log(err);
    })
};

const postLogIn = (req, res, next) => {
    User.find({username: req.body.username}).then(result => {
        if(result.length == 0){
            return res.redirect("/");
        }

        const token = jwt.sign({idUsername: result[0]._id}, process.env.PK_JWT, {expiresIn: '1h'});
        res.status(200).json({token: encodeURIComponent(token), success: "Accesso effetuato con successo, hai 1 ora prima di dover rifare l'autenticazione"});
    }).catch(err => {
        console.log(err);
    });
};

export { insertPost, getHome, postSignUp, postLogIn};