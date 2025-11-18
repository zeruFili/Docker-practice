import { UserRepository } from "../models/User.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = UserRepository.findAll();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = UserRepository.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message
    });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    const user = UserRepository.create({ name, email });
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = UserRepository.update(id, { name, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = UserRepository.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

