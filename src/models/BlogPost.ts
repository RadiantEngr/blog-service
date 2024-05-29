import mongoose from 'mongoose';
import Joi from "joi";

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema, "blog_post");

const validateBlogPostRequest = (postRequest: Record<string, any>) => {
  const schema = Joi.object({
    author: Joi.string().required().max(64),
    title: Joi.string().required().max(64),
    content: Joi.string().required()
  });

  return schema.validate(postRequest);
};

export {
  BlogPost,
  validateBlogPostRequest
};
