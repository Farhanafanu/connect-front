import React from "react";

const DetailModal = ({ post, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Details</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body" style={{ width: '600px', overflow: 'auto' }}>
            <p className="text-sm text-gray-500 text-end">Post ID: {post.id}</p>
            <p className="text-sm text-gray-500 text-end">Created At: {new Date(post.created_at).toLocaleString()}</p>
            <p className="text-sm text-gray-500 text-end">User: {post.user.username}</p>
            <p className="text-sm text-gray-500 text-end">Content: {post.content}</p>

            <div className="mt-4">
              {post.images && post.images.map((imageObj, index) => (
                <img
                  key={index}
                  src={`http://127.0.0.1:8000${imageObj.images_url}`} // Assuming Django is serving media from the root
                  alt={`Image ${index + 1}`}
                  className="img-fluid mb-2"
                  style={{ maxWidth: '100%' }}
                />
              ))}
              {post.videos && post.videos.map((videoObj, index) => (
                <video key={index} controls className="video-fluid mb-2" style={{ maxWidth: '100%' }}>
                  <source src={`http://127.0.0.1:8000${videoObj.video_url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
