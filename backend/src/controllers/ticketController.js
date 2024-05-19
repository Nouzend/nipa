const db = require('../utils/firebase');
const admin = require('firebase-admin');
const { createTicket } = require('../models/ticket');

exports.createTicket = async (req, res) => {
  try {
    const { title, description, contact } = req.body;

    if(title =="" || description =="" || contact =="" ){
      return res.status(400).json({ message: 'Invalid data' });
    }

    const createdAt = admin.firestore.FieldValue.serverTimestamp();
    const ticketRef = db.collection('tickets').doc();
    const ticket = {
      id: ticketRef.id,
      title,
      description,
      contact,
      status: 'pending',
      createdAt,
      updatedAt: createdAt
    };
    await ticketRef.set(ticket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, contact, status } = req.body;
    const validStatuses = ['pending', 'accepted', 'resolved', 'rejected'];
    
    if(title =="" || description =="" || contact =="" ){
      return res.status(400).json({ message: 'Invalid data' });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedAt = new Date();
    const ticketRef = db.collection('tickets').doc(id);

    await ticketRef.update({
      title,
      description,
      contact,
      status,
      updatedAt,
    });

    const updatedTicket = (await ticketRef.get()).data();
    updatedTicket.createdAt = updatedTicket.createdAt.toDate();
    updatedTicket.updatedAt = updatedTicket.updatedAt.toDate();

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getTickets = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    let ticketsRef = db.collection('tickets');

    if (status) {
      ticketsRef = ticketsRef.where('status', '==', status);
    }

    if (sortBy) {
      ticketsRef = ticketsRef.orderBy(sortBy, 'desc');
    } else {
      ticketsRef = ticketsRef.orderBy('updatedAt', 'desc');
    }

    const ticketsSnapshot = await ticketsRef.get();
    const tickets = ticketsSnapshot.docs.map(doc => {
      const data = doc.data();
      if (data.createdAt) {
        data.createdAt = data.createdAt.toDate();
      }
      if (data.updatedAt) {
        data.updatedAt = data.updatedAt.toDate();
      }
      return data;
    });

    // Define the custom order for status
    const statusOrder = {
      pending: 1,
      accepted: 2,
      resolved: 3,
      rejected: 4,
    };

    // Sort tickets based on the custom status order
    tickets.sort((a, b) => {
      if (statusOrder[a.status] < statusOrder[b.status]) {
        return -1;
      }
      if (statusOrder[a.status] > statusOrder[b.status]) {
        return 1;
      }
      return 0;
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketDoc = await db.collection('tickets').doc(id).get();
    if (!ticketDoc.exists) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    const data = ticketDoc.data();
    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};