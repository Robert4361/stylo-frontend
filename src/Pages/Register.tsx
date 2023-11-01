import { Link } from "react-router-dom";
import Button from "../Components/atoms/Button";
import Input from "../Components/atoms/Input";
import { useState } from "react";
import sneakersImg1 from "../assets/images/sneakers1.png";
import sneakersImg2 from "../assets/images/sneakers2.png";
import * as Yup from "yup";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  interface Errors {
    [key: string]: string;
  }

  const validateForm = () => {
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Unesi ime!"),
      surname: Yup.string().required("Unesi prezime!"),
      email: Yup.string()
        .email("Unesi ispravni email")
        .required("Unesi email adresu!"),
      password: Yup.string().required("Unesi lozinku!"),
      username: Yup.string().required("Unesi korisničko ime!!"),
    });

    try {
      validationSchema.validateSync(userData, { abortEarly: false });
      setErrors({} as typeof errors);
      return true;
    } catch (error) {
      //catch variables have to be type of unknown
      const validationErrors: { [key: string]: string } = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleUserDataChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    handleUserDataChange(name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Validno je!");
      console.log(userData);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center w-screen h-screen px-4 bg-gradient-to-br from-white to-blue-700 relative">
      <img
        src={sneakersImg1}
        alt="sneakers-image"
        className="absolute left-8 bottom-16 rotate-12 opacity-20 hidden lg:block"
      />
      <img
        src={sneakersImg2}
        alt="sneakers-image"
        className="absolute right-8 top-8 -rotate-12 opacity-20 hidden lg:block"
      />

      <div
        className="register-form-wrapper bg-white-light w-full px-6 py-9 rounded-lg mb-2 max-w-lg z-10  flex flex-col lg:py-16 lg:gap-8"
        style={{ boxShadow: "0 0 12px #1443BB" }}
      >
        <h2 className="text-2xl text-center">Izradi račun</h2>

        <form
          className="flex flex-col gap-3.5 my-5 "
          onSubmit={handleSubmit}
          id="registerForm"
        >
          <Input
            value={userData.name}
            error={errors.name}
            name="name"
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Ime*"
          />
          <Input
            value={userData.surname}
            error={errors.surname}
            name="surname"
            onChange={(e) => handleInputChange(e, "surname")}
            placeholder="Prezime*"
          />{" "}
          <Input
            value={userData.email}
            error={errors.email}
            name="email"
            onChange={(e) => handleInputChange(e, "email")}
            placeholder="Email*"
          />{" "}
          <Input
            value={userData.username}
            error={errors.username}
            name="username"
            onChange={(e) => handleInputChange(e, "username")}
            placeholder="Korisničko ime*"
          />{" "}
          <Input
            value={userData.password}
            error={errors.password}
            name="password"
            onChange={(e) => handleInputChange(e, "password")}
            placeholder="Lozinka*"
            type="password"
          />
        </form>
        <Button onClick={() => {}} type="submit" form="registerForm">
          Registriraj se
        </Button>
      </div>
      <p className="text-white-light block gap-1 tracking-wider px-4 text-center lg:flex">
        Već imaš račun?
        <span>
          <Link
            to={"/login"}
            className="text-underline"
            style={{ textDecoration: "underline" }}
          >
            Prijavi se
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
