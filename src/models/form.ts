import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  // Step 1
  country: String,
  duration: Number,
  module: String,
  

  // Step 2
  salutation: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthDate: Date,
  nationality: String,
  address: String,
  postalCode: String,
  city: String,
  countryOfResidence: String,
  phone: String,
  email: String,

  // Step 3
  // languageSkills: {
  //   english: String,
  //   german: String,
  //   spanish: String,
  //   french: String,
  //   other: String,
  // },
  experience: String,
  motivation: String,
  insurance: String,

  // Step 4
  accommodation: String,
  diet: String,
  allergies: String,
  emergencyContact: {
    name: String,
    relation: String,
    phone: String,
    email: String,
  },
  termsAccepted: Boolean,
}, { timestamps: true });

export default mongoose.models.FormData || mongoose.model("FormData", FormSchema);
