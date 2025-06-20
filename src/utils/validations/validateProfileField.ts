export function clearProfileFieldError(
  name: string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  setErrors((prev) => {
    const { [name]: removed, ...rest } = prev;
    return rest;
  });
}

export function validateProfileField(
  name: string,
  value: string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  switch (name) {
    case "firstName":
    case "lastName":
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${name === "firstName" ? "First" : "Last"} name is required`,
        }));
      } else if (value.trim().length < 2) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${
            name === "firstName" ? "First" : "Last"
          } name must be at least 2 characters`,
        }));
      } else {
        setErrors((prev) => {
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "phoneNumber":
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Phone number is required",
        }));
      } else if (!/^\+?\d{8,15}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Enter a valid phone number",
        }));
      } else {
        setErrors((prev) => {
          const { phoneNumber, ...rest } = prev;
          return rest;
        });
      }
      break;

    default:
      break;
  }
}
