const getExpenses = (req) => {
  return req.user.getExpenses({ where: { userId: req.user.id } });
};

module.exports = {
  getExpenses,
};
