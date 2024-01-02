import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      succeeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: error.message,
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      // Compare the input password with the hashed password stored in the database
      same = await bcrypt.compare(password, user.password);
      console.log('same', same);
    } else {
      return res.status(401).json({
        succeeded: false,
        error: 'There is no such user',
      });
    }

    if (same) {
      res.status(200).send('You are logged in');
    } else {
      res.status(401).json({
        succeeded: false,
        error: 'Passwords do not match',
      });
    }
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      error: error.message,
    });
  }
};

export { createUser, loginUser };
