import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { cilImage, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(5)
  const [formData, setFormData] = useState({
    blogForm: {
      title: '',
      description: '',
      image: null,
      video: null, 
    },
    qaList: [],
    isEditing: false,
    editingIndex: null,
  })

  const handleQAChange = (index, field, value) => {
    const updatedQA = [...formData.qaList]
    updatedQA[index][field] = value
    setFormData({ ...formData, qaList: updatedQA })
  }

  const addQAField = () => {
    setFormData({
      ...formData,
      qaList: [...formData.qaList, { question: '', answer: '' }],
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      blogForm: { ...prevState.blogForm, [name]: value },
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]
    setFormData((prevState) => ({
      ...prevState,
      blogForm: { ...prevState.blogForm, [name]: file },
    }))
  }

  const getBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/blogs/get-blogs')
      setBlogs(res.data.updatedBlogList)
    } catch (error) {
      console.error('Error while fetching blogs:', error)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { blogForm, qaList, isEditing, editingIndex } = formData

    const blogSubmitData = new FormData()

    blogSubmitData.append('title', blogForm.title)
    blogSubmitData.append('description', blogForm.description)

    if (blogForm.image) blogSubmitData.append('image', blogForm.image)
    if (blogForm.video) blogSubmitData.append('video', blogForm.video)

    qaList.forEach((qa, index) => {
      blogSubmitData.append(`qaList[${index}][question]`, qa.question)
      blogSubmitData.append(`qaList[${index}][answer]`, qa.answer)
    })

    try {
      let response
      if (isEditing) {
        const blogId = blogs[editingIndex]._id
        response = await axios.put(`http://localhost:8000/blogs/update/${blogId}`, blogSubmitData)
      } else {
        response = await axios.post('http://localhost:8000/blogs/createBlog', blogSubmitData)
      }

      if (response.status === 200 || response.status === 201) {
        getBlogs() // Fetch updated blog list
        setFormData({
          blogForm: { title: '', description: '', image: null, video: null },
          qaList: [],
          isEditing: false,
          editingIndex: null,
        })
        setModalOpen(false)
        document.querySelector("input[type='file']").value = null // Clear file input
      }
    } catch (error) {
      console.error('Error submitting the blog:', error)
    }
  }

  // Edit a blog
  const handleEdit = (blog) => {
    setFormData({
      blogForm: blog,
      isEditing: true,
      editingIndex: blogs.findIndex((b) => b._id === blog._id),
      qaList: blog.qaList || [],
    })
    setModalOpen(true)
  }

  // Delete a blog
  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/blogs/delete/${blogId}`)
      if (response.status === 200) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId))
      }
    } catch (error) {
      console.error('Error deleting the blog:', error)
    }
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)

  return (
    <>
      <CModal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <CModalHeader closeButton>
          <h4>{formData.isEditing ? 'Edit Blog' : 'Create Blog'}</h4>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            {/* Image Input */}
            <CRow className="mb-3">
              <CCol md={6}>
                <h5>Image </h5>
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </CInputGroup>
              </CCol>
            </CRow>

            {/* Video Input */}
            <CRow className="mb-3">
              <CCol md={6}>
                <h5>Video </h5>
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilImage} /> {/* You can use a video icon here */}
                  </CInputGroupText>
                  <CFormInput
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </CInputGroup>
              </CCol>
            </CRow>

            {/* Title Input */}
            <CRow className="mb-3">
              <CCol md={6}>
                <h5>Title</h5>
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

            {/* Description Input */}
            <CRow className="mb-3">
              <CCol md={12}>
                <h5>Description</h5>
                <CFormTextarea
                  name="description"
                  value={formData.blogForm.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter Description"
                  required
                />
              </CCol>
            </CRow>

            {/* Q&A Section */}
            <CRow className="mb-3">
              <CCol md={12}>
                <h5>Questions and Answers</h5>
                {formData.qaList.map((qa, index) => (
                  <div key={index} className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      value={qa.question}
                      onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                      className="mb-2"
                    />
                    <CFormTextarea
                      placeholder={`Answer ${index + 1}`}
                      value={qa.answer}
                      onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                    />
                  </div>
                ))}
                <CButton color="secondary" onClick={addQAField} className="mt-2">
                  Add Question and Answer
                </CButton>
              </CCol>
            </CRow>

            {/* Modal Footer */}
            <CModalFooter>
              <CButton type="submit" color="primary">
                {formData.isEditing ? 'Update Blog' : 'Create Blog'}
              </CButton>
              <CButton color="secondary" onClick={() => setModalOpen(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Blogs List */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4>Blogs List</h4>
          <CButton
            color="primary"
            onClick={() => {
              setFormData({
                blogForm: { title: '', description: '', image: null, video: null },
                qaList: [],
                isEditing: false,
                editingIndex: null,
              })
              setModalOpen(true)
            }}
          >
            Create New Blog
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
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
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{blog.title}</CTableDataCell>
                  <CTableDataCell>{blog.description}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="warning" onClick={() => handleEdit(blog)}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" onClick={() => handleDelete(blog._id)} className="ms-2">
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Blogs
