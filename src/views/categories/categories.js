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
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnimalManagement = () => {
  const [animals, setAnimals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ name: '', category: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAnimals(currentPage, searchName);
  }, [currentPage, searchName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAnimals = async (page, search) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://44.196.192.232:8000/catogries/get', {
        page,
        limit: itemsPerPage,
        search,
      });
      if (Array.isArray(response.data.data)) {
        setAnimals(response.data.data);
        setTotalItems(response.data.total);
      }
    } catch (error) {
      toast.error('Error fetching animals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setNewAnimal((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const addAnimal = async () => {
    if (!newAnimal.name || !imageFile) {
      toast.error('Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', newAnimal.name);
    formData.append('images', imageFile);

    try {
      const response = await axios.post('http://44.196.192.232:8000/catogries/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Animal added successfully');
        resetForm();
        setModalVisible(false)
        fetchAnimals(currentPage, searchName);
      }
    } catch (error) {
      toast.error('Error adding animal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setModalVisible(false);
    setNewAnimal({ name: '', image: '' });
    setImageFile(null);
  };

  const deleteAnimal = async (id) => {
    if (!id) {
      toast.error('Invalid ID');
      return;
    }

    try {
      const response = await axios.delete(`http://44.196.192.232:8000/catogries/delete/${id}`);
      if (response.status === 200) {
        toast.success('Animal deleted successfully');
        fetchAnimals(currentPage, searchName);
      }
    } catch (error) {
      toast.error('Error deleting animal');
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <ToastContainer />
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
                <CButton color="warning" onClick={() => setModalVisible(true)} style={{ width: '80%' }}>
                  Add Animal
                </CButton>
              </div>
            </CCardHeader>

            <CCardBody>
              {isLoading ? (
                <CSpinner color="primary" />
              ) : (
                <CTable>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>Image</CTableHeaderCell>
                      <CTableHeaderCell>Animal Name</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>

                  <CTableBody>
                    {animals.map((animal, index) => (
                      <CTableRow key={animal._id || index}>
                        <CTableHeaderCell scope="row">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell>
                          <img src={animal.image} alt={animal.name} width="50" />
                        </CTableDataCell>
                        <CTableDataCell>{animal.name}</CTableDataCell>
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
              )}
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
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={resetForm}>
              Cancel
            </CButton>
            <CButton color="warning" onClick={addAnimal} disabled={isSubmitting}>
              {isSubmitting ? <CSpinner size="sm" /> : 'Add Animal'}
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Pagination */}
        <CCol xs={12} className="d-flex justify-content-center">
          <CPagination>
            <CPaginationItem
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </CPaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <CPaginationItem
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </>
  );
};

export default AnimalManagement;
