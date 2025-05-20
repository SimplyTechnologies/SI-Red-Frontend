import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Checkbox } from '../ui/checkbox.tsx';
import { Label } from '../ui/label.tsx';

import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with actual login logic or API call
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-md space-y-6">
          <h1
            className="font-bold text-[36px] leading-[1.2] font-dm-sans"
            style={{
              maxWidth: '269px',
              letterSpacing: '0px',
              textTransform: 'none',
              color: '#192252',
            }}
          >
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2 w-full max-w-[450px]">
              <Label
                htmlFor="email"
                className={
                  'block mb-1 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 ' +
                  (email.length > 0 ? 'text-[#192252]' : 'text-[#636777]')
                }
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
      w-full h-[56px] rounded-[8px]
      border border-[#DBDDE1] bg-[#FFFFFF]
      focus:border-2 focus:border-[#3652E0] focus:outline-none
      transition-colors
      peer
    "
              />
            </div>
            <div className="mb-2 w-full max-w-[450px]">
              <Label
                htmlFor="password"
                className={
                  'block mb-1 text-left font-medium text-[14px] leading-[1.4] font-dm-sans transition-colors duration-200 ' +
                  (password.length > 0 ? 'text-[#192252]' : 'text-[#636777]')
                }
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
      w-full max-w-[450px] h-[56px] rounded-[8px]
      border border-[#DBDDE1] bg-[#FFFFFF]
      focus:border-2 focus:border-[#3652E0] focus:outline-none
      transition-colors
      peer
    "
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-[#1C1C3A] underline text-sm">
                Forgot password
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#3E368E] hover:bg-[#2F2B6A]"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img
          src="/auto.png"
          alt="Car Image"
          className="max-w-[774px] w-full h-auto object-cover"
          style={{
            maxHeight: '1161px',
            position: 'relative',
            top: '-91px',
            left: '0', // left is handled by flex/grid layout, not absolute here
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;

/*
function Signup() {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <img src="/auto.png" alt="Auto" style={{ width: "100%", marginBottom: 24 }} />
      <form>
        <label>Login</label>
        <Input type="email" placeholder="Email" name="email" style={{ marginBottom: 16 }} />
        <label>Password</label>
        <Input type="password" placeholder="Password" name="password" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <Checkbox id="terms" />
          <label htmlFor="terms" style={{ marginLeft: 8 }}>Remember me</label>
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default Signup;
*/
