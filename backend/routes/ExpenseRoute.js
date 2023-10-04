const express = require("express");

const router = express.Router();

//importing controllers from 'products.js' file.
const addExpenseController = require("../controller/ExpenseController");

router.post("/user/addexpense", addExpenseController.postAddExpense);

router.get("/user/getexpense", addExpenseController.getExpense);

module.exports = router;
