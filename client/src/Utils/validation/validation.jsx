export const validateData = (data, category) => {
  let dataError = [false, ""];

  switch (category) {
    case "LOGIN":
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        dataError = [true, "Must be a valid email"];
      }
      if (data.password.length < 6) {
        dataError = [true, "password must be more than 6 caracters"];
      }
      break;

    case "REGISTER":
      if (data.firstName.length == 0) {
        return (dataError = [true, "first name is required"]);
      }
      if (data.lastName.length == 0) {
        return (dataError = [true, "last name is required"]);
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        return (dataError = [true, "Must be a valid email"]);
      }
      if (data.password !== data.confirmPassword) {
        return (dataError = [true, "Password Not match"]);
      }
      if (data.password.length < 6) {
        return (dataError = [true, "password must be at least 6 caracters"]);
      }
    default:
      return dataError;
  }

  return dataError;
};
