import Option from "../models/Option.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all options, oldest first (so the list order matches when they were added)
// @route   GET /api/options
export const getOptions = asyncHandler(async (req, res) => {
  const options = await Option.find().sort({ createdAt: 1 });
  res.json(options);
});

// @desc    Add an option
// @route   POST /api/options
export const createOption = asyncHandler(async (req, res) => {
  const { category, name, income, growth, stress } = req.body;

  const option = await Option.create({ category, name, income, growth, stress });
  res.status(201).json(option);
});

// @desc    Remove an option
// @route   DELETE /api/options/:id
export const deleteOption = asyncHandler(async (req, res) => {
  const option = await Option.findById(req.params.id);
  if (!option) {
    res.status(404);
    throw new Error("Option not found");
  }
  await option.deleteOne();
  res.json({ id: req.params.id });
});
