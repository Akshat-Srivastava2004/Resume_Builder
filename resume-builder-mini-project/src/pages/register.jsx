import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, EyeOff } from "lucide-react"
import Navbar from "@/Component/navbar"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", // Changed Name to name (lowercase)
    email: "", // Changed Email to email (lowercase)
    password: "", // Changed Password to password (lowercase)
    confirmPassword: "", // Changed confirmPassword to confirmPassword (lowercase)
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target // Changed Name to name here
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Ensures the correct property is updated in the state
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users/Userregister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (response.ok) {
          // Successfully created an account
          console.log("Account created:", result)
          // Redirect to login page or dashboard
          window.location.href = "/login"
        } else {
          // Handle errors from the API
          console.error("Error creating account:", result)
          setErrors(result.errors || {})
        }
      } catch (error) {
        console.error("Network error:", error)
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name" // Changed Name to name (lowercase)
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email" // Changed Email to email (lowercase)
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password" // Changed Password to password (lowercase)
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword" // Changed confirmPassword to confirmPassword (lowercase)
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
