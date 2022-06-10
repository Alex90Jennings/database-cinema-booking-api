const prisma = require("../utils/prisma");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  const createdCustomer = await prisma.customer.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email,
        },
      },
    },
    include: {
      contact: true,
    },
  });

  res.json({ data: createdCustomer });
};

const updateCustomer = async (req, res) => {
  const id = Number(req.params.id);

  const customer = await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: customer });
};

module.exports = {
  createCustomer,
  updateCustomer,
};
