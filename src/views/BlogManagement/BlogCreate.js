import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const Blogcreate = () => {
  const location = useLocation();
  const [blog, setBlog] = useState({
    title: '',
    category: '',
    content: '',
    date: '',
    author: 'Admin',
    status: 'draft',
  });
  const [images, setImages] = useState([]); // Array to store multiple images
  const { id } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://44.196.64.110:8000/blogs/getBlog/${id}`)
        .then((response) => {
          const blogData = response.data;
          setBlog({
            ...blogData,
            date: formatDate(blogData.date),
          });
        })
        .catch((error) => console.error('Error fetching blog:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleContentChange = (content) => {
    setBlog({ ...blog, content });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Update state with selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('category', blog.category);
    formData.append('content', blog.content);
    formData.append('date', blog.date);
    formData.append('author', blog.author);
    formData.append('status', blog.status);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      if (id) {
        await axios.put(`http://44.196.64.110:8000/blogs/update/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://44.196.64.110:8000/blogs/createBlog', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/blogs-management');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <CCard>
      <CCardHeader>{id ? 'Edit Blog' : 'Create Blog'}</CCardHeader>
      <CCardBody>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input id="title" name="title" value={blog.title} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input id="category" name="category" value={blog.category} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <ReactQuill value={blog.content} onChange={handleContentChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input id="author" name="author" value={blog.author} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select id="status" name="status" value={blog.status} onChange={handleChange} className="form-select">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              className="form-control"
              multiple
              accept="image/*"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input id="date" name="date" type="date" value={blog.date} onChange={handleChange} className="form-control" />
          </div>
          <CButton type="submit" color="primary">{id ? 'Update' : 'Create'}</CButton>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default Blogcreate;
