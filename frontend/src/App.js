import React, { useState } from "react";
import TicketList from "./components/TicketList";
import CreateButton from "./components/CreateButton";
import { Container,Typography } from "@material-ui/core";

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const triggerRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
  };
  return (
    <Container>
      <Typography variant="h4">Helpdesk Support Ticket Management</Typography>
      <CreateButton     
         triggerRefresh={triggerRefresh}
      />
      <TicketList
        refreshTrigger={refreshTrigger}
        triggerRefresh={triggerRefresh}
      />
    </Container>
  );
};


export default App;