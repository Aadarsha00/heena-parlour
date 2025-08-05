/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../components/axios/api.axios";
import type { BlogApiResponse, BlogPost } from "../interface/blog.interface";

// List blog posts with optional filters
export const getBlogPosts = async (params?: {
  category?: string;
  is_published?: boolean;
  is_featured?: boolean;
}): Promise<BlogApiResponse> => {
  try {
    const response = await api.get("/blog/", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get blog post details by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  try {
    const response = await api.get(`/blog/${slug}/`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (): Promise<any> => {
  try {
    const response = await api.get("/blog/featured/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get blog posts by category (grouped)
export const getBlogPostsByCategory = async (): Promise<any> => {
  try {
    const response = await api.get("/blog/by_category/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get recent blog posts
export const getRecentBlogPosts = async (): Promise<any> => {
  try {
    const response = await api.get("/blog/recent/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};
// Get all unique categories
export const getBlogCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get("/blog/");
    const allPosts = response.data.results || [];
    const categories = [
      ...new Set(allPosts.map((post: BlogPost) => post.category)),
    ];
    return categories;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};
