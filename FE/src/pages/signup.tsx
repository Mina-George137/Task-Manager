import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../api/auth'
import { isEmail, isStrongPassword, required } from '../lib/validators'
import type { AxiosError } from 'axios'

/*************  ✨ Windsurf Command ⭐  *************/
/*******  f70ba801-464c-47ea-91a3-7713ee27b134  *******/
export default function SignUp() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!required(fullName)) return setError('Full name is required')
    if (!required(email) || !isEmail(email)) return setError('Please enter a valid email')
    if (!isStrongPassword(password)) return setError('Password must be ≥ 8 chars and include a letter, number, and special character')

    setLoading(true)
    try {
      await signUp({ fullName, email, password })
      navigate('/signin')
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setError(axiosErr.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-sm text-zinc-600 mb-6">Sign up to start managing your tasks.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">Full name</label>
            <input className="input mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <p className="text-xs text-zinc-500 mt-1">Must be ≥ 8 chars and include a letter, number, and special character.</p>
          </div>
          {error && <p className="error">{error}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-50" type="submit">Sign up</button>
        </form>
        <p className="text-sm text-zinc-600 mt-4">Already have an account? <Link className="underline" to="/signin">Sign in</Link></p>
      </div>
    </div>
  )
}