import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://www.panel.efe-travel.com/api/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/Blogeditor/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios.delete(`https://www.panel.efe-travel.com/api/blogs/${id}`)
        .then(() => setBlogs(blogs.filter(blog => blog._id !== id)))
        .catch(error => console.error('Error deleting blog:', error));
    }
  };

 

  return (
    <CRow>
      <CCol>
        <CCard className="d-flex 100%">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h1 style={{ fontSize: '24px', color: 'purple' }}>Blog Management List</h1>
            <CButton color="primary" size="sm" className="float-right" onClick={() => navigate('/Blogcreate')}>Create New Blog</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover bordered responsive>
              <CTableHead color='dark'>
                <CTableRow>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Author</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Image 1</CTableHeaderCell>
                  <CTableHeaderCell>Image 2</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>

                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {blogs.map((blog) => (
                  <CTableRow key={blog._id}>
                    <CTableDataCell>{blog.title}</CTableDataCell>
                    <CTableDataCell>{blog.category}</CTableDataCell>
                    <CTableDataCell>{blog.author}</CTableDataCell>
                    <CTableDataCell>{blog.status}</CTableDataCell>
                    <CTableDataCell>
                      {blog.image1 && (
                        <img
                          src={`https://www.panel.efe-travel.com/api/uploads/${blog.image1}`}
                          alt="blog"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {blog.image2 && (
                        <img
                          src={`https://www.panel.efe-travel.com/api/uploads/${blog.image2}`}
                          alt="blog"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{blog.date}</CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ color: '#f0ad4e', cursor: 'pointer' }}
                        onClick={() => handleEdit(blog._id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: '#bb1616', cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() => handleDelete(blog._id)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Blogs;