// Authentication related validations. Keeping validations separate makes controllers cleaner.

const validateSignupData = ({ name, email, password, address }) => {
  if (!name || !email || !password || !address) {
    return "All fields are required";
  }

  if (name.length < 20 || name.length > 60) {
    return "Name must be between 20 and 60 characters";
  }

  if (address.length > 400) {
    return "Address cannot exceed 400 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be 8-16 characters and include one uppercase letter and one special character";
  }

  return null;
};

module.exports = {
  validateSignupData,
};
