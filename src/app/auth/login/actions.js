import {createSession} from "@/app/lib/session";
import {redirect} from "next/navigation";

const users = [
  {id: 1, name: "Yell Htut", username: "yellhtut", email: "yellhtut4@gmail.com", password: "admin123"},
  {id: 2, name: "Tun Min", username: "tunmin", email: "tunmin4@gmail.com", password: "admin123"},
];

export async function login(state, formData) {
  // setLoading(true)
  // setError("")
  const user = users.find(
    (user) =>
      user.email === formData.get('email') &&
      user.password === formData.get('password')
  );
  console.table(user)
  if (!user) {
    // setError("Invalid credentials")
    // setLoading(false)
    console.log("Invalid credentials")
    return false
  }
  const result = await createSession(user.id)
  console.table(result)
  if (result)
  {
    // Redirect to home or any other page on successful login
    // setError("") // Update the error state
    // setLoading(false)
    redirect("/dashboard")
  }
  // return result // Return the result of the signIn
}

