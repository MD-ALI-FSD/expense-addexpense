const expenseModel = require("../models/expenseModel");

exports.postAddExpense = async (req, res, next) => {
  try {
    console.log("inside add backend");
    const amount = req.body.amount;
    const description = req.body.discription;
    const category = req.body.category;

    console.log(amount, description, category);

    const data = await expenseModel.create({
      amount: amount,
      description: description,
      category: category,
    });

    res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
    res.status(500).json(err);
  }
  // catch (err) {
  //     res.status(500).json({ error: err });
  //   }
};

exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await expenseModel.findAll();
    // console.log(users);
    res.status(200).json({ allExpenses: expenses });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
