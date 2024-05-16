function createTicket(id, title, description, contact, status, createdAt, updatedAt) {
  return {
    id,
    title,
    description,
    contact,
    status,
    createdAt,
    updatedAt,
  };
}

module.exports = { createTicket };
