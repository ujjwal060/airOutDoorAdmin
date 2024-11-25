import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const SupportHelpManagement = () => {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [visible, setVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket)
    setResponseMessage(ticket.message)
    setIsEditing(true)
    setVisible(true)
  }

  const getAllQueries = async () => {
    const res = await axios.get('http://localhost:8000/contact/getContactUs')
    setTickets(res.data.allContactUs)
  }
  const markTicketRead = async (id) => {
    console.log(id)
    const res = await axios.put(`http://localhost:8000/contact/markRead/${id}`)
    console.log(res)
  }
  useEffect(() => {
    getAllQueries()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>Support and Help Management</h3>
        </CCardHeader>

        <CCardBody>
          <CTable responsive striped hover bordered className="mt-3">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Message</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tickets.map((ticket) => (
                <CTableRow key={ticket._id}>
                  <CTableDataCell>{ticket.name}</CTableDataCell>
                  <CTableDataCell>{ticket.email}</CTableDataCell>
                  <CTableDataCell>{ticket.message}</CTableDataCell>
                  {ticket.isRead ? (
                    <CTableDataCell>This Ticket is Read</CTableDataCell>
                  ) : (
                    <CTableDataCell>
                      <CButton size="sm" color="warning" onClick={() => markTicketRead(ticket._id)}>
                        <FontAwesomeIcon icon={faEdit} /> Mark as read
                      </CButton>
                    </CTableDataCell>
                  )}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default SupportHelpManagement
