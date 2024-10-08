import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoticeDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 조회 오류:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">작성자: {post.author}</p>
      <p className="text-gray-600 mb-2">
        작성일: {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">조회수: {post.views}</p>
      <div className="mt-4">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default NoticeDetail;
