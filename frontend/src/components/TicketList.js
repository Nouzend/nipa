import React, { useEffect, useState } from 'react';
import { getTickets } from '../services/ticketService';
import TicketCard from './TicketCard';
import { MenuItem, Select, Container} from '@material-ui/core';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await getTickets(status, sortBy);
      setTickets(response.data);
    };
    fetchTickets();
  }, [status, sortBy]);

  return (
    <Container>
      <div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          displayEmpty
          style={{ marginRight: 10 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="updatedAt">Latest Update</MenuItem>
          <MenuItem value="createdAt">Creation Date</MenuItem>
        </Select>
      </div>
      <div>
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </Container>
  );
};

export default TicketList;
