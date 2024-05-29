import { Request, Response } from "express";
import BlogPostService from '../services/BlogPostService';
import sendResponse from '../services/ResponseService';

export default {
    createPost: async (req: Request, res: Response)  => {
      try {
        const response = await BlogPostService.createPost(req.body);
        return sendResponse(req, res, Number(response.status[0]), response.status[1].toString(), response.data);
      } catch (err) {
        sendResponse(req, res, 500, `An error occured while posting blog: ${err}`);
      }
    },

    getAllPosts: async (req: Request, res: Response) => {
      try {
        const response = await BlogPostService.getAllPosts(req);
        return sendResponse(req, res, Number(response.status[0]), response.status[1].toString(), response.data);
      } catch (err) {
        sendResponse(req, res, 500, `An error occured while fetching posts: ${err}`);
      }
    },

    getPostById: async (req: Request, res: Response) => {
      try {
        const { postId } = req.params;
        const response = await BlogPostService.getPostById(postId);
        return sendResponse(req, res, Number(response.status[0]), response.status[1].toString(), response.data);
      } catch (err) {
        sendResponse(req, res, 500, `An error occured while fetching post: ${err}`);
      }
    },

    updatePost: async (req: Request, res: Response) => {
      try {
        const response = await BlogPostService.updatePost(req);
        return sendResponse(req, res, Number(response.status[0]), response.status[1].toString(), response);
      } catch (err) {
        sendResponse(req, res, 500, `An error occured while updating post: ${err}`);
      }
    },

    deletePost: async (req: Request, res: Response) => {
      try {
        const { postId } = req.params;
        const response = await BlogPostService.deletePost(postId);
        return sendResponse(req, res, Number(response.status[0]), response.status[1].toString(), response.status);
      } catch (err) {
        sendResponse(req, res, 500, `An error occured while deleting post: ${err}`);
      }
    }

};
