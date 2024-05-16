import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { updateTicket } from '../services/ticketService';
import axios from 'axios';

const TicketCard = ({ ticket, onUpdate }) => {
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
    try {
      const response = await updateTicket(ticket.id,formData);
      onUpdate(response.data);
      setEditable(false);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        {editable ? (
          <>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
            />
            <TextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
            <Button onClick={handleEditToggle} color="secondary">Cancel</Button>
          </>
        ) : (
          <>
            <Typography variant="h5">{ticket.title}</Typography>
            <Typography>Description :{ticket.description}</Typography>
            <Typography>Contact :{ticket.contact}</Typography>
            <Typography>Status :{ticket.status}</Typography>
            <Typography>Created At: {new Date(ticket.createdAt).toLocaleString()}</Typography>
            <Typography>Last Updated: {new Date(ticket.updatedAt).toLocaleString()}</Typography>
            <Button onClick={handleEditToggle} color="primary">Edit</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
