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
  CFormSelect,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const SupportHelpManagement = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value
    setFilter(selectedFilter)

    if (selectedFilter === 'read') {
      setFilteredTickets(tickets.filter((ticket) => ticket.isRead))
    } else if (selectedFilter === 'unread') {
      setFilteredTickets(tickets.filter((ticket) => !ticket.isRead))
    } else {
      setFilteredTickets(tickets)
    }
  }

  const getAllQueries = async () => {
    const res = await axios.get('http://44.196.64.110:8000/contact/getContactUs')
    setTickets(res.data.allContactUs)
    setFilteredTickets(res.data.allContactUs) // Initialize filtered tickets
  }

  const markTicketRead = async (id) => {
    await axios.put(`http://44.196.64.110:8000/contact/markRead/${id}`)
    getAllQueries()
  }

  useEffect(() => {
    getAllQueries()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Support/Contact Management</h3>
          <div className="d-flex align-items-center ms-auto">
            <label htmlFor="filter-select" className="me-2 fw-bold">
              Filter:
            </label>
            <CFormSelect
              id="filter-select"
              value={filter}
              onChange={handleFilterChange}
              style={{ maxWidth: '200px' }}
            >
              <option value="all">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </CFormSelect>
          </div>
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
              {filteredTickets.map((ticket) => (
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
