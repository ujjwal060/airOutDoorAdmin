import React, { useEffect, useState } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { cilImage, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import axios from "axios";

const Blogs = () => {
  const [formData, setFormData] = useState({
    blogForm: { title: "", description: "", images: null },
    isEditing: false,
    editingIndex: null,
  });
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      blogForm: { ...prevState.blogForm, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      blogForm: { ...prevState.blogForm, images: file },
    }));
  };

  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/blogs/get-blogs");
      setBlogs(res.data.updatedBlogList);
    } catch (error) {
      console.error("Error while fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { blogForm, isEditing, editingIndex } = formData;

    const blogSubmitData = new FormData();
    blogSubmitData.append("title", blogForm.title);
    blogSubmitData.append("description", blogForm.description);
    if (blogForm.images) blogSubmitData.append("images", blogForm.images);

    try {
      let response;
      if (isEditing) {
        const blogId = blogs[editingIndex]._id;
        response = await axios.put(`/api/blogs/${blogId}`, blogSubmitData);
      } else {
        response = await axios.post("http://localhost:8000/blogs/createBlog", blogSubmitData);
      }

      if (response.status === 200 || response.status === 201) {
        getBlogs(); // Refresh blogs after submitting
        setFormData({
          blogForm: { title: "", description: "", images: null },
          isEditing: false,
          editingIndex: null,
        });
        setModalOpen(false); // Close modal after submit
        document.querySelector("input[type='file']").value = ""; // Reset file input
      }
    } catch (error) {
      console.error("Error submitting the blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      blogForm: blog,
      isEditing: true,
      editingIndex: blogs.findIndex((b) => b._id === blog._id),
    });
    setModalOpen(true); // Open the modal for editing
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/blogs/delete/${blogId}`);
      if (response.status === 200) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <>
      <CButton
        color="primary"
        onClick={() => {
          setFormData({
            blogForm: { title: "", description: "", images: null },
            isEditing: false, // Ensure it's set to false when creating a new blog
            editingIndex: null,
          });
          setModalOpen(true); // Open modal for creating a new blog
        }}
      >
        Create Blog
      </CButton>

      <CModal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <CModalHeader closeButton>
          <h4>{formData.isEditing ? "Edit Blog" : "Create Blog"}</h4>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput type="file" name="image" accept="image/*" onChange={handleFileChange} />
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    name="title"
                    value={formData.blogForm.title}
                    onChange={handleInputChange}
                    placeholder="Enter Title"
                    required
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea
                  name="description"
                  value={formData.blogForm.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter Description"
                  required
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton type="submit" color="primary">
                {formData.isEditing ? "Update Blog" : "Create Blog"}
              </CButton>
              <CButton color="secondary" onClick={() => setModalOpen(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CCard>
        <CCardHeader>
          <h4>Blogs List</h4>
        </CCardHeader>
        <CCardBody>
          {blogs.length === 0 ? (
            <p>No blogs available. Start by creating one!</p>
          ) : (
            <CTable hover striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentBlogs.map((blog) => (
                  <CTableRow key={blog._id}>
                    <CTableDataCell>
                      {blog.image && (
                        <img
                          src={blog.image[0]}
                          alt={blog.title}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell>{blog.title}</CTableDataCell>
                    <CTableDataCell>{blog.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(blog)}>
                        <CIcon icon={cilPencil} /> Edit
                      </CButton>{" "}
                      <CButton color="danger" size="sm" onClick={() => handleDelete(blog._id)}>
                        <CIcon icon={cilTrash} /> Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
          {/* <CPagination aria-label="Page navigation">
            <CPaginationItem
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </CPaginationItem>
            <CPaginationItem
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </CPaginationItem>
            <CPaginationItem
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </CPaginationItem>
            <CPaginationItem
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </CPaginationItem>
          </CPagination> */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Blogs;
