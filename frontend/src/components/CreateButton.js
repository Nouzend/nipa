import React, { useState, useEffect } from "react";
import { createTicket } from "../services/ticketService";
import { Button,Modal,Input,Typography } from "antd";

const CreateButton = ({ triggerRefresh }) =>{
    const [alert , setAlert] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTicketData, setNewTicketData] = useState({
    title: "",
    description: "",
    contact: "",
    status: "pending",
  });

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCancel = () => {
    setAlert(false)
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
    const { title, description, contact } = newTicketData;
    if (!title || !description || !contact) {
      setAlert(true)
      return;
    }
    try {
      await createTicket(newTicketData);
      handleModalToggle();
      triggerRefresh();
      setNewTicketData({
        title: "",
        description: "",
        contact: "",
        status: "pending",
      })
      setAlert(false)
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

    useEffect(() => {
        if (alert) {
        Modal.error({
            title: 'Error',
            content: 'All fields are required.',
        });
        setAlert(false);
        }
    }, [alert]);

    return(
    <>
    <Button variant="contained" color="primary" onClick={handleModalToggle}>
        Create Ticket
    </Button>
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
        <Typography.Title level={5}>Title</Typography.Title>
        <Input
          name="title"
          value={newTicketData.title}
          onChange={handleChange}
        />
        <Typography.Title level={5}>Description</Typography.Title>
        <Input.TextArea
          name="description"
          value={newTicketData.description}
          onChange={handleChange}
          size="large"
        />
        <Typography.Title level={5}>Contact</Typography.Title>
        <Input
          name="contact"
          value={newTicketData.contact}
          onChange={handleChange}
        />
      </Modal>
 
      </>
    )
}

export default CreateButton;