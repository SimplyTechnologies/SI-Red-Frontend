export function clearFieldError(
  name: string,
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  console.log(name);
  setFieldErrors((prev) => {
    console.log("prev >>>", prev);
    const { [name]: removed, ...rest } = prev;
    console.log("rest>>>",rest);
    return rest;
  });
}

export function validateField(
  name: string,
  value: string,
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  switch (name) {
    case "make_id":
      if (!value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          make_id: "Make is required",
        }));
      } else {
        setFieldErrors((prev) => {
          const { make_id, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "model_id":
      if (!value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          model_id: "Model is required",
        }));
      } else {
        setFieldErrors((prev) => {
          const { model_id, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "vin":
      if (!value.trim()) {
        setFieldErrors((prev) => ({ ...prev, vin: "VIN is required" }));
      } else if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          vin: "VIN must be 17 valid alphanumeric characters.",
        }));
      } else {
        setFieldErrors((prev) => {
          const { vin, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "year":
      if (!value.trim()) {
        setFieldErrors((prev) => ({ ...prev, year: "Year is required" }));
      } else if (
        !/^\d{4}$/.test(value) ||
        Number(value) < 1986 ||
        Number(value) > new Date().getFullYear()
      ) {
        setFieldErrors((prev) => ({
          ...prev,
          year: "Enter a valid year",
        }));
      } else {
        setFieldErrors((prev) => {
          const { year, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "location":
      if (!value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          location: "Location is required",
        }));
      } else {
        setFieldErrors((prev) => {
          const { location, ...rest } = prev;
          return rest;
        });
      }
      break;

    case "street":
    case "city":
    case "state":
    case "country":
      if (!value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: `${name[0].toUpperCase() + name.slice(1)} is required`,
        }));
      } else {
        setFieldErrors((prev) => {
          const { [name]: removed, ...rest } = prev;
          return rest;
        });
      }
      break;
    case "zipcode":
      if (!value.trim()) {
        setFieldErrors((prev) => ({
          ...prev,
          zipcode: "Zip Code is required",
        }));
      } else if (!/^\d{4,6}$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          zipcode: "Zip Code must be 4 to 6 digits",
        }));
      } else {
        setFieldErrors((prev) => {
          const { zipcode, ...rest } = prev;
          return rest;
        });
      }
      break;

    default:
      break;
  }
}
