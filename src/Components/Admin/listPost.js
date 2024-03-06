import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal'; // Replace with your actual DetailModal component
import ConfirmationModal from './ConfirmationPost'; // Replace with your actual ConfirmationModal component

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/connectadmin/admin/posts/?page=${currentPage}`);
      console.log('API Response:', response.data);
      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 posts per page
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };
  
  const handleViewMoreClick = (post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleRejectPostClick = (postId) => {
    setSelectedPost(postId);
    setShowConfirmationModal(true);
  };

  const handleConfirmRejection = async () => {
    try {
      console.log(`Rejecting post with ID: ${selectedPost}`);
      await axios.patch(`http://127.0.0.1:8000/connectadmin/admin/posts/${selectedPost}/`);
      // Remove the post from the local state
      setPosts(posts.filter(post => post.id !== selectedPost));
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  
  
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl mt-3 mb-3 text-pink-700 font-bold">Post Management</h1>
      </div>
      <div className="container my-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Time</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{new Date(post.created_at).toLocaleString()}</td>
                  <td>{post.user.username}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleViewMoreClick(post)}>
                      View More
                    </button>
                    <button className="btn btn-danger ml-2" onClick={() => handleRejectPostClick(post.id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No posts available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
  <DetailModal
    post={selectedPost} // Pass the selected post object
    show={showDetailModal}
    onClose={closeDetailModal}
  />
)}


      {/* Confirmation Modal */}
      {selectedPost && (
        <ConfirmationModal
          show={showConfirmationModal}
          onHide={closeConfirmationModal}
          onConfirm={handleConfirmRejection}
          title="Reject Post"
          message="Are you sure you want to reject this post?"
        />
      )}
    </>
  );
};

export default React.memo(PostList);
