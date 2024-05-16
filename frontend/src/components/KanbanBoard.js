import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TicketCard from './TicketCard';
import { Container, Paper, Typography } from '@material-ui/core';

const KanbanBoard = ({ tickets, onUpdate }) => {
  const columns = ['pending', 'accepted', 'resolved', 'rejected'];

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTicket = {
        ...tickets.find(ticket => ticket.id === result.draggableId),
        status: destination.droppableId
      };

      try {
        await onUpdate(updatedTicket);
      } catch (error) {
        console.error('Error updating ticket status:', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container style={{ display: 'flex', gap: '10px' }}>
        {columns.map(column => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <Paper
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ padding: '10px', width: '250px', minHeight: '500px' }}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </Typography>
                {tickets
                  .filter(ticket => ticket.status === column)
                  .map((ticket, index) => (
                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ marginBottom: '10px', ...provided.draggableProps.style }}
                        >
                          <TicketCard ticket={ticket} onUpdate={onUpdate} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Container>
    </DragDropContext>
  );
};

export default KanbanBoard;
