import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  username: String,
  name: String,
  address: String,
  birthdate: {
    type: Date,
    default: Date.now(),
  },
  email: String,
  accounts: [Number],
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
