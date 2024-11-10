import mongoose from "mongoose";


export const postSchema = new mongoose.Schema({
      profilePhoto: {
         type : String,
         require : true
      },
      post:{
        type : String,
        require : true,
      }, 
       photo: {
        type : String,
        require : true,
       },
        username: {
            type : String,
            require : true,
        },
         name:{
            type : String,
            require : true,
         },
          email: {
            type : String,
            require : true
          },
          likes :[
            {email : String  , name : String ,userName : String, profilePhoto : String}
          ]
        }
      )

      const Post = mongoose.model('Post', postSchema);

      export default Post;
