const nameRegex = /^[A-Za-z]{2,30}$/; // Only letters, min 2, max 30
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
export const isValidForm = (state) => {
  if (!nameRegex.test(state.firstName)) {
    return {
      message: "First name should only contain letters (min 2 characters).",
      error: true,
    };
  }
  if (!nameRegex.test(state.lastName)) {
    return {
      message: "Last name should only contain letters (min 2 characters).",
      error: true,
    };
  }
  if (!emailRegex.test(state.email)) {
    return { message: "Please enter a valid email address.", error: true };
  }
  if (!phoneRegex.test(state.phoneNumber)) {
    return { message: "Phone number must be 10 digits.", error: true };
  }
  if (state.message.trim() === "") {
    return { message: "Message is required.", error: true };
  }
  return { message: "", error: false };
};
