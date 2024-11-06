"use client"; // Marking this component as a Client Component

import { useFormState, useFormStatus } from 'react-dom'
import {Button, Input, Progress, Spinner} from "@nextui-org/react";
import {login } from "./actions"

const Login = () => {
  const [state, loginAction] = useFormState(login, undefined)
  return (
    <div className="flex items-center justify-center min-h-screen bg-themeBg ">
      <div className="w-96 max-w-md p-5  rounded shadow-2xl bg-themeSecondary border-3 border-slate-700">
        <div className="flex flex-col justify-center items-center py-5">
          <div className="text-2xl font-bold text-start text-white">Sign in to account</div>
          <div className="text-small opacity-50 text-start text-white">Enter your email & password to login</div>
        </div>
        <form action={loginAction} className="space-y-4 pb-7" >
          <div>
            <Input
              isRequired
              type="text" // Use type "text" for username
              name="email" // Add name attribute for handleChange to work correctly
              className="w-full"
              size="sm"
              label="Email"
              isInvalid={false}
              // errorMessage={'Email address is invalid'}
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
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
            />
            {state?.errors?.password && <p>{state.errors.password}</p>}
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
  )
}

export default Login
