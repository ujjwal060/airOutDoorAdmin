import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardText,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CPagination,
  CPaginationItem,
  CSpinner,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Species = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const fetchSpecies = async () => {
    try {
      const response = await axios.get("http://3.111.163.2:3002/api/species/getSpeciesCategories");
      setSpecies(response.data.data); // Assuming the API response contains the species data
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred while fetching species.");
    }
  };

  useEffect(() => {
    fetchSpecies(); // Fetch species data when the component mounts
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({ ...formData, [id]: id === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);
    setLoading(true);


    try {
      await axios.post("http://3.111.163.2:3002/api/species/SpeciesCategories", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormVisible(false);
      resetFormData();
      fetchSpecies(); // Refresh the species list after adding
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred while adding species.");
    }finally{
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await axios.put(`http://3.111.163.2:3002/api/species/speciescategory/${selectedSpecies._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEditModalVisible(false);
      resetFormData();
      fetchSpecies(); // Refresh the species list after editing
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred while editing species.");
    }finally{
      setLoading(false);
    }
  };

  const handleEditClick = (specie) => {
    setSelectedSpecies(specie);
    setFormData({
      name: specie.name || "",
      image: null,
    });
    setEditModalVisible(true);
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      image: null,
    });
    setSelectedSpecies(null);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Species</h3>
          <CButton color="primary" onClick={() => setFormVisible(true)}>
            Add Species
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <CTable responsive striped hover bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    S.No
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Image
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ textAlign: "center" }}>
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {species.map((specie, index) => (
                  <CTableRow key={specie._id}>
                    <CTableHeaderCell scope="row" style={{ textAlign: "center" }}>
                      {index + 1}
                    </CTableHeaderCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {specie.name || "null"}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      {specie.image && (
                        <img
                          src={`http://3.111.163.2:3002/${specie.image}`} // Update this path according to your API
                          alt={specie.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: "center" }}>
                      <button
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => handleEditClick(specie)}
                      >
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '15px', marginRight: '10px' }} />
                      </button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardText>
          <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem disabled aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>

      {/* Add Species Modal */}
      <CModal
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          resetFormData();
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Add Species</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="image"
                label="Image"
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
            <CButton
                type="submit"
                color="primary"
                className="px-4"
                disabled={loading} // Disable button while loading
              >
                {loading ? <CSpinner size="sm" /> : 'Submit'} {/* Show loader in button */}
              </CButton>
              
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>

      {/* Edit Species Modal */}
      <CModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          resetFormData();
        }}
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit Species</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleEditSubmit}>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="image"
                label="Image"
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12}>
              <CButton
            type="submit"
            color="primary"
            className="px-4"
            disabled={loading} // Disable button while loading
          >
            {loading ? <CSpinner size="sm" /> : 'Update'} {/* Show loader in button */}
          </CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setEditModalVisible(false);
              resetFormData();
            }}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Species;
