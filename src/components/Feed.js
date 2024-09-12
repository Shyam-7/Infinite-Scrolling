import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts } from '../services/api';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    const newPosts = await fetchPosts(page);
    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="feed">
      <h1>Social Media Feed</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts to show.</p>}
      >
        {posts.map(post => (
          <Post key={post.id} title={post.title} body={post.body} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;