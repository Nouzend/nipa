const express = require('express');
const { createTicket, updateTicket, getTickets, getTicketById } = require('../controllers/ticketController');
const router = express.Router();

router.post('/', createTicket);
router.put('/:id', updateTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);

module.exports = router;
