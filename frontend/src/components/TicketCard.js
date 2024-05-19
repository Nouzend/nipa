import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { updateTicket } from '../services/ticketService';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Alert } from 'antd';
import moment from 'moment-timezone';
moment.tz.setDefault("Asia/Bangkok");
const { Meta } = Card;

const TicketCard = ({ ticket, onUpdate }) => {
  const [alert , setAlert] = useState(false)
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
    contact: ticket.contact,
    status: ticket.status,
  });

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const { title, description, contact } = formData;
    if (!title || !description || !contact) {
      setAlert(true)
      return;
    }
    try {
      const response = await updateTicket(ticket.id, formData);
      onUpdate(response.data);
      setAlert(false)
      setEditable(false);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      contact: ticket.contact,
      status: ticket.status,
    });
    setAlert(false)
    setEditable(false);
  };

  return (
    <Card
      actions={[
        editable ? (
          <SaveOutlined key="save" onClick={handleSave} />
        ) : (
          <EditOutlined key="edit" onClick={handleEditToggle} />
        ),
        editable && <CloseOutlined key="cancel" onClick={handleCancel} />
      ]}
    >
      <Meta
        title={
          editable ? (
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            ticket.title
          )
        }
        description={
          editable ? (
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
            />
          ) : (
            ticket.description
          )
        }
      />
      {editable ? (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="contact"
            label="Contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      ) : (
        <>
          <p>Status: {ticket.status}</p>
          <p>Contact: {ticket.contact}</p>
        </>
      )}
      <p>Created at: {moment(ticket.createdAt).format('DD MMMM YYYY, hh A')}</p>
      <p>Last Updated: {moment(ticket.updatedAt).fromNow()}</p>
      { alert ? 
        <Alert
        message="Error"
        description="All fields are required."
        type="error"
        showIcon
        />
        : ""
      }
    </Card>
  );
};

export default TicketCard;
