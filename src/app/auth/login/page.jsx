"use client" // Marking this component as a Client Component

import {useState} from "react"
import {Button, Input} from "@nextui-org/react"
import {redirect} from "next/navigation"; // don't add try catch block when you are redirecting
import {login} from "@/app/auth/login/actions"
import WithoutAuthLayout from "@/app/without-auth-layout"
import {useAuth} from "@/app/lib/authContext";
import {Alert} from "@nextui-org/alert";

const Login = () => {

  const [credentials, setCredentials] = useState({
    email: "admin@yellhtut.com",
    password: "password",
  })
  const {setAuthUser} = useAuth()
  const [usernameError, setUsernameError] = useState("") // State to hold error messages
  const [passwordError, setPasswordError] = useState("") // State to hold error messages
  const [loading, setLoading] = useState(false) // State to hold loading state

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value, // Dynamically update state based on input name
    }))
  }

  const handleSubmit = async (e) => {
    setLoading(true) // Update loading state to true
    setUsernameError("")
    e.preventDefault() // Prevent the default form submission
    if (!credentials.email || !credentials.password) {
      setUsernameError("Please fill the required credentials")
      setLoading(false)
      return
    }
    const result = await login(credentials.email, credentials.password)
    // console.table(result)
    if (result.status !== 200){
      setUsernameError(result.data.errors.email[0])
      // setPasswordError(result.data.errors.password[0])
      setLoading(false)
      return;
    }
    setAuthUser(result) // user data
    setUsernameError('')
    setPasswordError('')
    setLoading(false)
    redirect("/dashboard")
  }

  return (
    <WithoutAuthLayout>
      <div className="flex items-center justify-center min-h-screen bg-background ">
        {/*<Spinner   label="Loading..." color="warning" />*/}
        <div className="w-full max-w-md p-8 space-y-6 rounded shadow-2xl bg-themeSecondary border-3 border-slate-700">
          {/*{usernameError &&*/}
          {/*  <Alert*/}
          {/*    color={"danger"}*/}
          {/*    title={usernameError}*/}
          {/*    isClosable={true}*/}
          {/*  />*/}
          {/*}*/}
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
                isInvalid={usernameError}
                errorMessage={usernameError}
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
                value={credentials.password} // Accessing password from state
                onChange={handleChange} // Use handleChange for input updates
                isInvalid={passwordError}
                errorMessage={passwordError}
              />
            </div>
            <Button
              type="submit" // Specify type "submit" to trigger form submission
              className="w-full bg-indigo-700 text-white hover:text-white p-6"
              size="sm"
              disabled={loading}
            >
              <h2>{loading ? 'Loading' : 'Login'}</h2>
            </Button>
            <div className="text-right pt-4">
              <a
                href="/" // Link to your forgot password page
                className="text-sm text-indigo-600 hover:underline"
              >
                Home ?
              </a>
            </div>
          </form>
        </div>
      </div>
    </WithoutAuthLayout>
  )
}

export default Login
