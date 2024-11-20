import React, { useState } from "react";
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilImage, cilPencil, cilTrash, cilPlus } from "@coreui/icons";
import axios from "axios";

const Blogs = () => {
  const [formData, setFormData] = useState({
    blogs: [],
    blogForm: {
      title: "",
      description: "",
      image: null,
    },
    isEditing: false,
    editingIndex: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      blogForm: {
        ...prevState.blogForm,
        [name]: value,
      },
    }));
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      blogForm: {
        ...prevState.blogForm,
        image: file,
      },
    }));
  };

  // Handle form submission for creating or editing a blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { blogForm, isEditing, editingIndex, blogs } = formData;

    // Create a FormData object to send data to the backend
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", blogForm.title);
    formDataToSubmit.append("description", blogForm.description);
    if (blogForm.image) {
      formDataToSubmit.append("image", blogForm.image);
    }

    try {
      let response;

      if (isEditing) {
        // If editing, update the existing blog
        const blogId = blogs[editingIndex].id; // Assuming the blog has an `id` field
        response = await axios.put(`/api/blogs/${blogId}`, formDataToSubmit);
      } else {
        // If creating a new blog, send a POST request
        console.log("before sumitting",formData)
        response = await axios.post("http://localhost:8000/blogs/create-blog", formDataToSubmit);
        console.log("after sumitting",response)
      }

      if (response.status === 200 || response.status === 201) {
        // If successful, update the local state
        const newBlog = response.data; // Assuming the response contains the newly created blog
        if (isEditing) {
          const updatedBlogs = blogs.map((blog, index) =>
            index === editingIndex ? newBlog : blog
          );
          setFormData({
            ...formData,
            blogs: updatedBlogs,
            isEditing: false,
            editingIndex: null,
            blogForm: { title: "", description: "", image: null },
          });
        } else {
          setFormData({
            ...formData,
            blogs: [...blogs, newBlog],
            blogForm: { title: "", description: "", image: null },
          });
        }
      } else {
        console.error("Error submitting the blog:1", response);
      }
    } catch (error) {
      console.error("Error submitting the blog:2", error);
    }
  };

  // Handle editing a blog
  const handleEdit = (index) => {
    setFormData({
      ...formData,
      blogForm: formData.blogs[index],
      isEditing: true,
      editingIndex: index,
    });
  };

  // Handle deleting a blog
  const handleDelete = async (index) => {
    const blogId = formData.blogs[index].id; // Assuming blog has an `id`
    try {
      const response = await axios.delete(`/api/blogs/${blogId}`);
      if (response.status === 200) {
        const updatedBlogs = formData.blogs.filter((_, i) => i !== index);
        setFormData({
          ...formData,
          blogs: updatedBlogs,
        });
      } else {
        console.error("Error deleting the blog:", response);
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>{formData.isEditing ? "Edit Blog" : "Create Blog"}</h4>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilImage} />
                </CInputGroupText>
                <CFormInput
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  placeholder="Upload an image"
                />
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
                  placeholder="Title"
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
                placeholder="Enter the blog description"
                required
              ></CFormTextarea>
            </CCol>
          </CRow>
          <CButton type="submit" color="primary">
            {formData.isEditing ? "Update Blog" : "Create Blog"}
          </CButton>
        </CForm>

        <hr />

        <h5>Blogs List</h5>
        {formData.blogs.length === 0 && <p>No blogs available. Start by creating one!</p>}
        {formData.blogs.map((blog, index) => (
          <CCard className="mb-3" key={index}>
            <CCardBody>
              {blog.image && (
                <img
                  src={blog.imageUrl || URL.createObjectURL(blog.image)} // Assuming imageUrl exists on the blog
                  alt={blog.title}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              )}
              <h5>{blog.title}</h5>
              <p>{blog.description}</p>
              <CButton
                color="info"
                size="sm"
                onClick={() => handleEdit(index)}
              >
                <CIcon icon={cilPencil} /> Edit
              </CButton>{" "}
              <CButton
                color="danger"
                size="sm"
                onClick={() => handleDelete(index)}
              >
                <CIcon icon={cilTrash} /> Delete
              </CButton>
            </CCardBody>
          </CCard>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default Blogs;
