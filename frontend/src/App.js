import React, { useState } from "react";
import { createTicket } from "./services/ticketService";
import { Container, Typography, TextField } from "@material-ui/core";
import TicketList from "./components/TicketList";
import { Button, Modal } from "antd";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    title: "",
    description: "",
    contact: "",
    status: "pending",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewTicketData({
      title: "",
      description: "",
      contact: "",
      status: "pending",
    })
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
      setNewTicketData({
        title: "",
        description: "",
        contact: "",
        status: "pending",
      })
    } catch (error) {
      console.error("Error creating ticket:", error);
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
      <TicketList
        refreshTrigger={refreshTrigger}
        triggerRefresh={triggerRefresh}
      />

      <Modal
        open={isModalOpen}
        title="Create Ticket"
        onOk={handleCreateTicket}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
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
      </Modal>
    </Container>
  );
};

export default App;
