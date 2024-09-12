import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_PER_PAGE = 10;

export const fetchPosts = async (page) => {
  try {
    const response = await axios.get(`${API_URL}?_page=${page}&_limit=${POSTS_PER_PAGE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};