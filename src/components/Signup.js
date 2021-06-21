import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./TextField";

export const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };

  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, "Too short")
      .max(15, "Must be max 15 char")
      .required("Required"),

    lastName: Yup.string()
      .min(2, "Too short")
      .max(25, "Must be max 15 char")
      .required("Required"),

    email: Yup.string().email("Email is invalid").required("Required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 char or more")
      .matches(/\d+/, "Password must have a number")
      .matches(/[a-z]+/, "Password must have a lowercase")
      .matches(/[A-Z]+/, "Password must have a uppercase")
      .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char")
      .test("Password", "Password is an invalid", (value) => !/\s+/.test(value))
      .required("Required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirming password is required"),

    aggreeToTerms: Yup.string()
      .label("Terms")
      .test(
        "aggreeToTerms",
        "Must agree to terms to continue",
        (value) => value === true
      ),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <TextField
              label="I accept terms & conditions"
              name="aggreeToTerms"
              type="checkbox"
            />
            <button className="btn btn-dark mt-3">Register</button>
            <button className="btn btn-danger mt-3 ml-3">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
