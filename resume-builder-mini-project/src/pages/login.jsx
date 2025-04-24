import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Eye, EyeOff } from "lucide-react";
import Navbar from "@/Component/navbar";

export default function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Correcting the field name to "Email" (not "email")
    if (!formData.Email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.Password.trim()) {  // Correct the field name here as well
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users/loginuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send only "Email" and "Password" in the request body
          body: JSON.stringify({
            email: formData.Email, // sending Name as Email (if required by your backend)
            Password: formData.Password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Login successful:", result);
          localStorage.setItem("data", result.data); // Example: Save token in localStorage
          window.location.href = "/";
        } else {
          console.error("Error logging in:", result);
          setErrors(result.errors || {});
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="Email" // Name should be "Email" here
                    type="email"
                    placeholder="john@example.com"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="Password" // Name should be "Password" here
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.Password}
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: checked,
                      }));
                    }}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
