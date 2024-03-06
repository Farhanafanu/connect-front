// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../Api/api";
// export default function EditPostModal({ post, images, videos, onClose }) {
//     const [editedContent, setEditedContent] = useState(post.content);
//     const [editedImage, setEditedImage] = useState('');
//     const [editedVideo, setEditedVideo] = useState('');
  
//     const handleContentChange = (e) => {
//       setEditedContent(e.target.value);
//     };
  
//     const handleImageChange = (e) => {
//       setEditedImage(e.target.files[0]);
//     };
  
//     const handleVideoChange = (e) => {
//       setEditedVideo(e.target.files[0]);
//     };
  
//     const handleUpdateClick = async () => {
//       const formData = new FormData();
//       formData.append('content', editedContent);
//       if (editedImage) formData.append('image', editedImage);
//       if (editedVideo) formData.append('video', editedVideo);
  
//       try {
//         const response = await axios.put(`${BASE_URL}/updatepost/${post.id}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
  
//         if (response.data.message === "Post updated.") {
//           onClose();
//         }
//       } catch (error) {
//         console.error("Error updating post:", error);
//       }
//     };
  
//     return (
//       <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Post</h5>
//               <button type="button" className="btn-close" onClick={onClose}></button>
//             </div>
//             <div className="modal-body">
//               <textarea
//                 value={editedContent}
//                 onChange={handleContentChange}
//                 className="form-control mb-3"
//                 placeholder="Edit your post..."
//               />
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="form-control mb-3"
//               />
//               <input
//                 type="file"
//                 onChange={handleVideoChange}
//                 className="form-control mb-3"
//               />
//               <div>
//                 <h3 className="mb-2">Media Preview</h3>
//                 <div className="media-preview">
//                   {images.map((image, index) => (
//                     <img key={index} src={`${BASE_URL}${image.image_url}`} className="img-fluid mb-2" alt={`Post Image ${index}`} />
//                   ))}
//                   {videos.map((video, index) => (
//                     <video key={index} controls className="mb-2">
//                       <source src={`${BASE_URL}${video.video_url}`} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 onClick={handleUpdateClick}
//                 className="btn btn-primary"
//               >
//                 Update Post
//               </button>
//               <button onClick={onClose} className="btn btn-secondary">
//                 Cancel
//               </button>
//               {/* Add a temporary style to ensure the button is visible */}
//               <button className="btn btn-danger" style={{ visibility: "visible" }}>Test Button</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  