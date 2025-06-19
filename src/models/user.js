// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, 
    required: true, unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phoneNumber: { type: String,
     required: true, unique: true,
     validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`}
    },
  companyName: { type: String, required: true },
  jobTitle:    { type: String, required: true },
  country:     { type: String, required: true },
  updates: {
    type: Boolean,
    default: true, // Default to true for receiving updates
  },
}, {
  timestamps: true,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;


