const db = require('../utils/firebase');
const admin = require('firebase-admin');
const { createTicket } = require('../models/ticket');

exports.createTicket = async (req, res) => {
  try {
    const { title, description, contact } = req.body;
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
    const updatedAt = new Date();
    const ticketRef = db.collection('tickets').doc(id);
    const ticket = {
      title,
      description,
      contact,
      status,
      updatedAt
    };
    await ticketRef.update(ticket);
    res.status(200).json({ id, title, description, contact, status, updatedAt });
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

    const ticketsSnapshot = await db.collection('tickets').get();
    const tickets = ticketsSnapshot.docs.map(doc => {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate();
      data.updatedAt = data.updatedAt.toDate();
      return data;
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