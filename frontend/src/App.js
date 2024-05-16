import React from 'react';
import TicketList from './components/TicketList';
import { Container, Typography } from '@material-ui/core';

const App = () => {
  return (
    <Container>
      <Typography variant="h4">Helpdesk Support Ticket Management</Typography>
      <TicketList />
    </Container>
  );
};

export default App;
