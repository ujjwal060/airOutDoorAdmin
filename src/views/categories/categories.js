import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Removed faEye import
import axios from 'axios';

const AnimalManagement = () => {
  const [animals, setAnimals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ name: '', category: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0); // Total items count from the server

  useEffect(() => {
    fetchAnimals(currentPage, searchName);
  }, [currentPage, searchName]); // Fetch data whenever currentPage or searchName changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAnimals = async (page, search) => {
    try {
      const response = await axios.post('http://localhost:8000/catogries/get', {
        page,
        limit: itemsPerPage,
        search
      });
      console.log('API Response:', response.data);
      if (Array.isArray(response.data.data)) {
        setAnimals(response.data.data);
        setTotalItems(response.data.total); // Set total items count
      } else {
        console.error('Expected response.data to be an array', response.data);
      }
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setNewAnimal((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const addAnimal = async () => {
    const formData = new FormData();
    formData.append('name', newAnimal.name);
    formData.append('parentCategory', newAnimal.category);
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:8000/catogries/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response:", response.data); // Log the full response

      if (response.status === 201) {
        fetchAnimals(currentPage, searchName); // Re-fetch animals after adding a new one
        resetForm();
      }
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  const resetForm = () => {
    setModalVisible(false);
    setNewAnimal({ name: '', category: '', image: '' });
    setImageFile(null);
  };

  const deleteAnimal = async (id) => {
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/catogries/delete/${id}`);
      if (response.status === 200) {
        fetchAnimals(currentPage, searchName); // Re-fetch animals after deletion
      }
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setNewAnimal({ ...newAnimal, category: value });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Animal Management</strong>
              <div className="d-flex align-items-center">
                <CFormInput
                  type="text"
                  placeholder="Search by Animal Name"
                  className="me-5"
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <CButton color="warning" onClick={() => setModalVisible(true)} style={{ width: "80%" }}>
                  Add Animal
                </CButton>
              </div>
            </CCardHeader>

            <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Animal Name</CTableHeaderCell>
                    <CTableHeaderCell>Category</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {animals.map((animal, index) => (
                    <CTableRow key={animal._id || index}>
                      <CTableHeaderCell scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
                      <CTableDataCell>
                        <img src={`http://localhost:8000/${animal.image}`} alt={animal.name} width="50" />
                      </CTableDataCell>
                      <CTableDataCell>{animal.name}</CTableDataCell>
                      <CTableDataCell>{animal.parentCategory}</CTableDataCell>
                      <CTableDataCell>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => deleteAnimal(animal._id)}
                          style={{ cursor: 'pointer', color: 'red' }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Modal for adding an animal */}
        <CModal visible={modalVisible} onClose={resetForm}>
          <CModalHeader>Add Animal</CModalHeader>
          <CModalBody>
            <CForm>
              <CFormInput
                label="Animal Name"
                name="name"
                value={newAnimal.name}
                onChange={handleInputChange}
                required
              />
              <CFormInput
                type="file"
                label="Image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              <CFormSelect label="Category" onChange={handleCategoryChange}>
                <option>Select Category</option>
                <option value="Terrestrial Animals">Terrestrial Animals</option>
                <option value="Aquatic Animals">Aquatic Animals</option>
                <option value="Aerial Animals">Aerial Animals</option>
                <option value="Adventure Activities">Adventure Activities</option>
                <option value="Special Events">Special Events</option>
                <option value="Other Activities">Other Activities</option>
              </CFormSelect>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={resetForm}>
              Cancel
            </CButton>
            <CButton color="warning" onClick={addAnimal}>
              Add Animal
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Pagination */}
        <CCol xs={12} className="d-flex justify-content-center">
          <CPagination>
            <CPaginationItem onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </CPaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <CPaginationItem key={index + 1} active={currentPage === index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </>
  );
};

export default AnimalManagement;
