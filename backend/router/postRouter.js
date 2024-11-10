import express from "express";
import cors from 'cors';
import Post from '../db/model/postModel.js';

const PostRouter = express.Router();
PostRouter.use(cors());
PostRouter.use(express.json());

PostRouter.post('/post', async(req, resp) => {
     try {
        let data = new Post(req.body);
        let result = await data.save();
        resp.send(result);
     } catch(error) {
        resp.send({status: "error"});
     }
});

PostRouter.get('/getAllPost', async(req, resp) => {
   try {
    let result = await Post.find();
     resp.send(result);
   } catch(error) {
    resp.send({status: "error"});
   }
});

PostRouter.get('/user/post', async(req, resp) => {
   try {
      const email = req.query.email;
      let result = await Post.find({email: email});
      resp.send(result);
   } catch(error) {
    resp.send({status: "error"});
   }
});

PostRouter.patch('/liked/:id', async(req, resp) => {
   try {
       let result = await Post.updateOne(
         {_id: req.params.id},
         {$set: req.body}
       );
       resp.send(result);
   } catch(error) {
    resp.send({status: "error"});
   }
});

export default PostRouter;
