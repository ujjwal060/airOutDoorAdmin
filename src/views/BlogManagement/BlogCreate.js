import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const formatDate = (dateString) => {
  if (!dateString) return '';
  // Extract date part from ISO string
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};


const Blogcreate = () => {
  const [blog, setBlog] = useState({ title: '', category: '', content: '',date: '', author: 'Admin', status: 'draft' });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`https://www.panel.efe-travel.com/api/blogs/${id}`)
        .then(response => {
          const blogData = response.data;
          setBlog({
            ...blogData,
            date: formatDate(blogData.date) // Format date for display
          });
        })
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setBlog({ ...blog, [name]: value });
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };


  const handleContentChange = (content) => {
    setBlog({ ...blog, content });
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
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
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);

    try {
    //   if (id) {
    //     await axios.put(`https://www.panel.efe-travel.com/api/blogs/${id}`, formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' }
    //     });
    //   } else {
    //     await axios.post('https://www.panel.efe-travel.com/api/blogs', formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' }
    //     });
    //   }
      navigate('/blogs/list');
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
            <label htmlFor="image1" className="form-label">Image 1</label>
            <input type="file" id="image1" name="image1" onChange={handleImage1Change} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="image2" className="form-label">Image 2</label>
            <input type="file" id="image2" name="image2" onChange={handleImage2Change} className="form-control" />
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