const asyncHandler = require("express-async-handler");
const Goal = require("../model/goal-model");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
// @desc Create goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({ text });
  res.status(200).json(goal);
});
// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});
// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);

  console.log(goal);

  if (!goal) {
    res.status(400);
    throw new Error("Please add a valid id parameter");
  }

  await goal.deleteOne();

  res.status(200).json({ id });
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
