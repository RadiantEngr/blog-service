import { Request } from "express";
import { BlogPost, validateBlogPostRequest } from "../models/BlogPost";
import ResponseMessageCode from "../enums/ResponseMessageCode";

const DEFAULT_PAGE_SIZE = 20;

export default {
    createPost: async (postRequest: Record<string, string>)  => {
        try {
            const { error, value } = validateBlogPostRequest(postRequest);
            if (error) {
                return {
                    status: [ResponseMessageCode.BAD_REQUEST, error.details[0].message]
                }
            }

            const post = await BlogPost.create(value);
            return {
                status: [ResponseMessageCode.CREATED, "POST_CREATED"],
                data: post
            };
        } catch (err) {
            console.log(`Error while posting blog: ${err}`);
            throw new Error(`An error occured while posting blog: ${err}`);
        }
    },

    getAllPosts: async (req: Request) => {
        try {
            const { page = 1, limit = DEFAULT_PAGE_SIZE } = req.query;
            const posts = await BlogPost.find({}).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
            if (!posts || !posts.length) {
                return {
                    status: [ResponseMessageCode.NOT_FOUND, "NO_POST_FOUND"]
                };
            }

            return {
                status: [ResponseMessageCode.OK, "POSTS_FETCHED"],
                data: posts
            };
        } catch (err) {
            console.log(`Error while fetching posts: ${err}`);
            throw new Error(`An error occured while fetching posts: ${err}`);
        }
    },

    getPostById: async (postId: string) => {
        try {
            const post = await BlogPost.findById(postId);
            if (!post) {
                return {
                    status: [ResponseMessageCode.NOT_FOUND, "POST_NOT_FOUND"]
                };
            }

            return {
                status: [ResponseMessageCode.OK, "POST_FETCHED"],
                data: post
            };
        } catch (err) {
            console.log(`Error while fetching post: ${err}`);
            throw new Error(`An error occured while fetching post: ${err}`);
        }
    },

    updatePost: async (req: Request) => {
        try {
            const { postId } = req.params; 
            const post = await BlogPost.findById(postId);      
            if (!post) {
                return {
                    status: [ResponseMessageCode.NOT_FOUND, "POST_NOT_FOUND"]
                };
            }
      
            const updatedPost = await BlogPost.findByIdAndUpdate(postId, req.body, {new:true});
            return {
                status: [ResponseMessageCode.OK, "POST_UPDATED"],
                data: updatedPost
            };
        } catch (err) {
            console.log(`Error while updating post: ${err}`);
            throw new Error(`Error while updating post: ${err}`);
        }
    },

    deletePost: async (postId: string) => {
        try {          
            const post = await BlogPost.findById(postId);    
            if (!post) {
                return {
                    status: [ResponseMessageCode.NOT_FOUND, "POST_NOT_FOUND"]
                };
            }
      
            await BlogPost.findByIdAndDelete(postId);
            return {
                status: [ResponseMessageCode.CONTENT_DELETED, "POST_DELETED"]
            };
        } catch (err) {
            console.log(`Error while deleting post: ${err}`);
            throw new Error(`Error while deleting post: ${err}`);
        }
    },
}
