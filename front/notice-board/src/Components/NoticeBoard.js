import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:8000/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">공지사항</h1>
      <p className="text-gray-600 mb-4">
        공지사항을 빠르고 정확하게 안내해드립니다.
      </p>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 border-b">번호</th>
            <th className="py-2 border-b">제목</th>
            <th className="py-2 border-b">글쓴이</th>
            <th className="py-2 border-b">작성일</th>
            <th className="py-2 border-b">조회</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="text-center">
              <td className="py-2 border-b">{post.id}</td>
              <td className="py-2 border-b">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-2 border-b">{post.author}</td>
              <td className="py-2 border-b">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 border-b">{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 ${
              i + 1 === currentPage ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        등록
      </button>
    </div>
  );
};

export default NoticeBoard;
