import { Request, Response } from 'express';
import User from '../models/User'; 
import bcrypt from 'bcryptjs'

const userController = {
  async signUp(req: Request, res: Response) {
      const {username,password,email,city,phoneNumber,address,status}   = req.body;
      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username: username,
        password: hash,
        email:email,
        city: city,
        phoneNumber: phoneNumber,
        address: address,
        status: status,
      });
      await newUser.save();
      res.status(200).send({ data: "user has been created" });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while signing up.' });
    }

  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const { page , perPage , isAdmin, sortByDueDate, sortByCompleted } = req.query;

      const query = isAdmin !== undefined ? { isAdmin: isAdmin === 'true' } : {};

      const sortOptions: any = {};
      if (sortByDueDate) sortOptions.dueDate = sortByDueDate === 'asc' ? 1 : -1;
      if (sortByCompleted) sortOptions.completed = sortByCompleted === 'asc' ? 1 : -1;

      const users = await User.find(query,{ _id: 0 }).lean()
        .sort(sortOptions)
        .skip((+page - 1) *+perPage)
        .limit(+perPage);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'user not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
  },

  async updateUser (req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
  },

  async deleteUser (req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.json({ message: 'User deleted successfully'});
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  },

};

export default userController;