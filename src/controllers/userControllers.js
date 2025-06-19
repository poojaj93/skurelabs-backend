import userDataSchema from "../schemas/userDataSchema.js";
import User from "../models/user.js";

export const postData = async (req, res) => {
  try {
    // Validate the request body against the imported schema
    const { error, value: validatedData } = userDataSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
    }

    // Check for existing email or phone
    const existingUser = await User.findOne({
      $or: [
        { email: validatedData.email.toLowerCase() },
        { phoneNumber: validatedData.phoneNumber }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Duplicate entry",
        field: existingUser.email === validatedData.email ? "email" : "phoneNumber"
      });
    }

    // Create a new user document
      const newUser = await User.create(validatedData);

    return res.status(201).json({
      message: "User data received, validated, and stored successfully",
      data: newUser,
    });

  }  catch (err) {
    console.error("Error in postData:", err);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
};
 