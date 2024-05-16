import React, { useState } from 'react';
import { createTicket } from './services/ticketService';
import { Container, Typography, Button, Modal, TextField, Box } from '@material-ui/core';
import TicketList from './components/TicketList';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    title: '',
    description: '',
    contact: '',
    status: 'pending',
  });
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicketData({
      ...newTicketData,
      [name]: value,
    });
  };

  const handleCreateTicket = async () => {
    try {
      await createTicket(newTicketData);
      handleModalToggle();
      setRefreshTrigger(!refreshTrigger);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const triggerRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <Container>
      <Typography variant="h4">Helpdesk Support Ticket Management</Typography>
      <Button variant="contained" color="primary" onClick={handleModalToggle}>
        Create Ticket
      </Button>
      <TicketList refreshTrigger={refreshTrigger} triggerRefresh={triggerRefresh} />
      
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <Box p={3} bgcolor="background.paper" boxShadow={3} borderRadius={5}>
          <Typography variant="h6">Create New Ticket</Typography>
          <TextField
            label="Title"
            name="title"
            value={newTicketData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newTicketData.description}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
          />
          <TextField
            label="Contact"
            name="contact"
            value={newTicketData.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCreateTicket} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
