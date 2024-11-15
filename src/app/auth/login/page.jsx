"use client"; // Marking this component as a Client Component

import {useState} from "react";
import {Button, Input, Spinner} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {login} from "@/app/auth/login/actions";
import WithoutAuthLayout from "@/app/without-auth-layout";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "yellhtut4@gmail.com",
    password: "admin123",
  });
  const router = useRouter();
  const [error, setError] = useState(""); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value, // Dynamically update state based on input name
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission
    setError("");
    if (!credentials.email || !credentials.password) {
      setError("Please fill the required credentials")
      return
    }
    const result = await login(credentials.email, credentials.password)
    console.log(result)
    // if (!result.error) {
    //   // Redirect to home or any other page on successful login
    //   setError("") // Update the error state
    //   router.push("/dashboard") // Redirect to a protected page after successful login
    // } else {
    //   // Handle error if authentication fails
    //   console.error(result.error)
    //   setError("Invalid credentials. Please try again.") // Update the error state
    //   alert("Invalid credentials. Please try again.")
    // }
  }

  // useEffect(() => {
  //
  // }, [credentials])

  return (
    <WithoutAuthLayout>
      <div className="flex items-center justify-center min-h-screen bg-background ">
        {/*<Spinner   label="Loading..." color="warning" />*/}
        <div className="w-full max-w-md p-8 space-y-6 rounded shadow-2xl bg-themeSecondary border-3 border-slate-700">
          <div className="flex flex-col justify-center items-center py-5">
            <div className="text-2xl font-bold text-start text-white">Sign in to account</div>
            <div className="text-small opacity-50 text-start text-white">Enter your email & password to login</div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                isRequired
                type="text" // Use type "text" for username
                name="email" // Add name attribute for handleChange to work correctly
                className="w-full"
                size="sm"
                label="Username"
                value={credentials.email} // Accessing username from state
                onChange={handleChange} // Use handleChange for input updates
                isInvalid={error}
                errorMessage={error}
              />
            </div>
            <div className="py-5">
              <Input
                isRequired
                type="password"
                name="password" // Add name attribute for handleChange to work correctly
                className="w-full"
                size="sm"
                label="Password"
                isInvalid={false}
                errorMessage="Please enter a valid password"
                value={credentials.password} // Accessing password from state
                onChange={handleChange} // Use handleChange for input updates
              />
            </div>
            <Button
              type="submit" // Specify type "submit" to trigger form submission
              className="w-full bg-indigo-700 text-white hover:text-white p-6"
              size="sm"
            >
              <h2>Login</h2>
            </Button>
          </form>
        </div>
      </div>
    </WithoutAuthLayout>
  )
}

export default Login
