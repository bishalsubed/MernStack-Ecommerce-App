import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Lock, LogIn, Mail, ArrowRight, Loader, EyeIcon, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUserStore } from '../stores/useUserStore'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("")

  const { login, loading } = useUserStore()
  const inputRef = useRef()

  const togglePassword = () => {
    if (inputRef.current) {
      if (inputRef.current.type == "password") {
        inputRef.current.type = "text"
      } else {
        inputRef.current.type = "password"
      }
      setIsPasswordVisible(!isPasswordVisible)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  }
  return (
    <div className='flex flex-col justify-center py-8 sm:px-6 lg:px-8'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-orange-400'>Login to your account</h2>
      </motion.div>
      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 py-7 px-3 sm:rounded-lg sm:px-10'>
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                Email
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                  placeholder='your@example.com'
                />
              </div>
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  ref={inputRef}
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                  placeholder='••••••••'
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={togglePassword}>
                {isPasswordVisible ? <EyeIcon className="size-5 text-orange-500" /> : <EyeOff className="size-5 text-orange-500" />}
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to={'/forgot-password'} className='text-sm text-orange-400 hover:underline'>Forgot Password?</Link>
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-orange-600
							 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-orange-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                  Login
                </>
              )}
            </button>
          </form>
          <p className='mt-8 text-center text-sm text-gray-400'>
            Not a Member?{" "}
            <Link to='/signup' className='font-medium text-orange-400 hover:text-orange-300'>
              Sign Up here <ArrowRight className='inline h-4 w-4' />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage