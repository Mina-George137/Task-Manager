import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { isEmail, isStrongPassword, required } from "../lib/validators.ts";
import type { AxiosError } from "axios";
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from "../types.ts";

export default function SignIn() {
  const navigate = useNavigate();
  const { loginWithResponse } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!required(email) || !isEmail(email))
      return setError("Please enter a valid email");
    if (!required(password)) return setError("Password is required");
    if (!isStrongPassword(password)) return setError("Password Must be ≥ 8 chars and include a letter, number, and special character.")

    setLoading(true);
    try {
      const { token } = await signIn({ email, password });
      const decoded = jwtDecode<JwtPayload>(token);

      loginWithResponse({
        token,
        user: {
          id: decoded.userId,
          fullName: decoded.fullName,
          email: decoded.email,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(axiosErr.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-zinc-600 mb-6">
          Welcome back! Please enter your details.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input
              className="input mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-zinc-600 mt-4">
          No account?{" "}
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
