import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const TicketCard = ({ ticket }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{ticket.title}</Typography>
        <Typography>{ticket.description}</Typography>
        <Typography>{ticket.contact}</Typography>
        <Typography>{ticket.status}</Typography>
        <Typography>Created At: {new Date(ticket.createdAt).toLocaleString()}</Typography>
        <Typography>Last Updated: {new Date(ticket.updatedAt).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
