import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// Static data for content management
const staticBanners = [
  { id: 1, title: "Summer Sale", imageUrl: "/images/banner1.jpg" },
  { id: 2, title: "Winter Collection", imageUrl: "/images/banner2.jpg" },
];

const staticFeaturedProperties = [
  { id: 1, name: "Beach House", location: "Miami", description: "A beautiful beach house." },
  { id: 2, name: "Mountain Cabin", location: "Colorado", description: "A cozy mountain cabin." },
];

const staticContent = {
  faqs: "Frequently Asked Questions content goes here.",
  guides: "User guides and other helpful content go here.",
};

const ContentManagement = () => {
  const [visible, setVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(staticContent);
  const [newContent, setNewContent] = useState({
    title: "",
    imageUrl: "",
    name: "",
    location: "",
    description: "",
  });

  const handleEditContent = (type) => {
    setSelectedContent(type);
    setVisible(true);
    setEditMode(true);
  };

  const handleAddContent = (type) => {
    setSelectedContent(type);
    setVisible(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setVisible(false);
    setEditMode(false);
    setNewContent({
      title: "",
      imageUrl: "",
      name: "",
      location: "",
      description: "",
    });
  };

  const handleSave = () => {
    // Save logic here
    alert("Content saved!");
    handleClose();
  };

  const handleAddNew = () => {
    // Add new content logic here
    alert("New content added!");
    handleClose();
  };

  return (
    <>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CCard>
        <CCardHeader>
          <h3>Content Management</h3>
        </CCardHeader>

        <CCardBody>
          <h5>Homepage Banners</h5>
          <CButton color="primary" onClick={() => handleAddContent("banners")}>
            <FontAwesomeIcon icon={faPlus} /> Add Banner
          </CButton>
          <CTable responsive striped hover bordered className="mt-3">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>Title</CTableHeaderCell>
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {staticBanners.map((banner) => (
                <CTableRow key={banner.id}>
                  <CTableDataCell>{banner.title}</CTableDataCell>
                  <CTableDataCell>
                    <img src={banner.imageUrl} alt={banner.title} style={{ width: '100px', height: 'auto' }} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="warning" onClick={() => handleEditContent("banners")}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ms-2">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <h5 className="mt-4">Featured Properties</h5>
          <CButton color="primary" onClick={() => handleAddContent("properties")}>
            <FontAwesomeIcon icon={faPlus} /> Add Property
          </CButton>
          <CTable responsive striped hover bordered className="mt-3">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {staticFeaturedProperties.map((property) => (
                <CTableRow key={property.id}>
                  <CTableDataCell>{property.name}</CTableDataCell>
                  <CTableDataCell>{property.location}</CTableDataCell>
                  <CTableDataCell>{property.description}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="warning" onClick={() => handleEditContent("properties")}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ms-2">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <h5 className="mt-4">Static Content</h5>
          <CButton color="primary" onClick={() => handleEditContent("static")}>
            <FontAwesomeIcon icon={faEdit} /> Edit FAQs & Guides
          </CButton>
        </CCardBody>
      </CCard>

      {/* Add/Edit Content Modal */}
      <CModal visible={visible} onClose={handleClose}>
        <CModalHeader onClose={handleClose} closeButton>
          <CModalTitle>{editMode ? "Edit" : "Add"} {selectedContent}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedContent === "banners" && (
            <>
              <CFormInput
                type="text"
                label="Title"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                type="text"
                label="Image URL"
                value={newContent.imageUrl}
                onChange={(e) => setNewContent({ ...newContent, imageUrl: e.target.value })}
              />
            </>
          )}
          {selectedContent === "properties" && (
            <>
              <CFormInput
                type="text"
                label="Name"
                value={newContent.name}
                onChange={(e) => setNewContent({ ...newContent, name: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                type="text"
                label="Location"
                value={newContent.location}
                onChange={(e) => setNewContent({ ...newContent, location: e.target.value })}
                className="mb-3"
              />
              <CFormTextarea
                label="Description"
                value={newContent.description}
                onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
              />
            </>
          )}
          {selectedContent === "static" && (
            <CForm>
              <CFormInput
                type="text"
                label="FAQs"
                value={content.faqs}
                onChange={(e) => setContent({ ...content, faqs: e.target.value })}
                className="mb-3"
              />
              <CFormTextarea
                label="Guides"
                value={content.guides}
                onChange={(e) => setContent({ ...content, guides: e.target.value })}
              />
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleClose}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={editMode ? handleSave : handleAddNew}>
            {editMode ? "Save Changes" : "Add Content"}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ContentManagement;
