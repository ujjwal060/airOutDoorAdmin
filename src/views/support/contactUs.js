import React, { useState } from 'react';
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

// Static data for support tickets
const staticTickets = [
  { id: 1, type: 'User', subject: 'Issue with Login', status: 'Open', message: 'User cannot log in to their account.' },
  { id: 2, type: 'Vendor', subject: 'Payment Issue', status: 'In Progress', message: 'Vendor reports an issue with receiving payments.' },
  // Add more sample tickets here
];

const SupportHelpManagement = () => {
  const [tickets, setTickets] = useState(staticTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setResponseMessage(ticket.message);
    setIsEditing(true);
    setVisible(true);
  };

  const handleAdd = () => {
    setSelectedTicket(null);
    setResponseMessage('');
    setIsEditing(false);
    setVisible(true);
  };

  const handleSave = () => {
    // Save or update logic here
    alert('Ticket saved!');
    setVisible(false);
  };

  const handleStatusChange = (id, status) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status } : ticket
    ));
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>Support and Help Management</h3>
        </CCardHeader>

        <CCardBody>
          <CInputGroup className="mb-3">
            <CInputGroupText>Filter by Status</CInputGroupText>
            <CFormSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </CFormSelect>
          </CInputGroup>
          
          <CButton color="primary" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} /> Add Ticket
          </CButton>
          
          <CTable responsive striped hover bordered className="mt-3">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Subject</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tickets
                .filter(ticket => filterStatus === 'All' || ticket.status === filterStatus)
                .map(ticket => (
                  <CTableRow key={ticket.id}>
                    <CTableDataCell>{ticket.type}</CTableDataCell>
                    <CTableDataCell>{ticket.subject}</CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="warning" onClick={() => handleEdit(ticket)}>
                        <FontAwesomeIcon icon={faEdit} /> View/Respond
                      </CButton>
                      <CButton size="sm" color="danger" className="ms-2">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Ticket Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)} closeButton>
          <CModalTitle>{isEditing ? 'View/Respond to' : 'Add'} Ticket</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              label="Subject"
              value={selectedTicket?.subject || ''}
              readOnly
              className="mb-3"
            />
            <CFormSelect
              label="Type"
              value={selectedTicket?.type || 'User'}
              readOnly
              className="mb-3"
            >
              <option value="User">User</option>
              <option value="Vendor">Vendor</option>
            </CFormSelect>
            <CFormTextarea
              label="Message"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              rows="4"
              className="mb-3"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            {isEditing ? 'Save Response' : 'Add Ticket'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default SupportHelpManagement;
