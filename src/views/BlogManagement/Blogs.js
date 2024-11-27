import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://44.196.64.110:8000/blogs/getBlog')
      .then((response) => setBlogs(response.data.data))
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const handleEdit = (id) => {
    navigate('/Blogeditor',{state:{id}});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios
        .delete(`http://44.196.64.110:8000/blogs/delete/${id}`)
        .then(() => setBlogs(blogs.filter((blog) => blog._id !== id)))
        .catch((error) => console.error('Error deleting blog:', error));
    }
  };

  const handleViewImages = (images) => {
    setSelectedImages(images);
    setIsModalVisible(true);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h1 style={{ fontSize: '24px', color: 'purple' }}>Blog Management List</h1>
            <CButton
              color="primary"
              size="sm"
              className="float-right"
              onClick={() => navigate('/Blogcreate')}
            >
              Create New Blog
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover bordered responsive>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Author</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
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
                      {blog.images?.length > 0 && (
                        <div
                          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                          onClick={() => handleViewImages(blog.images)}
                        >
                          <img
                            src={blog.images[0]}
                            alt="blog-img-preview"
                            style={{
                              width: '70px',
                              height: '70px',
                              objectFit: 'cover',
                              marginRight: '10px',
                            }}
                          />
                          {blog.images.length > 1 && (
                            <span style={{ fontSize: '14px', color: '#007bff' }}>
                              +{blog.images.length - 1} more
                            </span>
                          )}
                        </div>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{new Date(blog.date).toLocaleDateString()}</CTableDataCell>
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

      {/* Modal for Viewing All Images */}
      <CModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        size="lg"
        alignment="center"
      >
        <CModalHeader closeButton>
          <CModalTitle>Blog Images</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`blog-img-${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            ))}
          </div>
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default Blogs;
