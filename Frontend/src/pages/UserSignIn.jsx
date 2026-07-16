import { Link } from 'react-router-dom'
import { useState } from 'react'

function UserSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-5 py-6 sm:px-12 sm:py-8 select-none">
      
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center sm:justify-start sm:mt-12">
        
        <div className="mb-8 sm:mb-10">
          <img 
            className="h-6 w-auto object-contain sm:h-7" 
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
            alt="Uber logo" 
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            What's your email?
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Sign in to your user account.
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={
          (e) => {
            e.preventDefault(); 
            setUserData({
              email: email,
              password: password
            });
            setEmail('');
            setPassword('');
          }
        }>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase sm:hidden">Email</span>
            </div>
            <input 
              required 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 text-base focus:outline-none focus:border-black focus:bg-white transition-all duration-200"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase sm:hidden">Password</span>
            </div>
            <input 
              required 
              type="password" 
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 text-base focus:outline-none focus:border-black focus:bg-white transition-all duration-200"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className="w-full bg-black text-white py-3.5 px-4 rounded-lg font-medium text-base hover:bg-neutral-800 transition-colors duration-200 cursor-pointer shadow-sm active:scale-[0.98] mt-2 touch-manipulation">
            Next
          </button>
        </form>
        <p className="text-center text-sm text-neutral-600 mt-6 sm:text-left">
          New to Uber?{' '}
          <Link to="/user/signup" className="text-black font-medium underline underline-offset-4 hover:text-neutral-700 transition-colors">
            Create an account
          </Link>
        </p>
      </div>

      <div className="w-full max-w-md mx-auto pt-4 border-t border-neutral-100 mt-8 sm:mt-12">
        <Link to='/captain/signin' className="flex items-center justify-center w-full bg-neutral-900 text-white sm:bg-neutral-100 sm:text-neutral-900 py-3.5 px-4 rounded-lg font-medium text-base hover:bg-black sm:hover:bg-neutral-200 transition-colors duration-200 cursor-pointer active:scale-[0.98] touch-manipulation">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserSignin