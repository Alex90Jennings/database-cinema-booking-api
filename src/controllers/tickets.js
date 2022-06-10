const prisma = require("../utils/prisma");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      screening: {
        connect: { id: screeningId },
      },
      customer: {
        connect: { id: customerId },
      },
    },
  });

  res.json({ data: ticket });
};

module.exports = { createTicket };
