// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import api from '../utils/axios';
// import { toast } from 'react-toastify';

// const Login = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       api.get('/api/protected')
//         .then(() => {
//           setIsAuthenticated(true);
//           navigate('/', { replace: true });
//         })
//         .catch(() => {
//           Cookies.remove('token');
//         });
//     }
//   }, [setIsAuthenticated, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (isRegistering && formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       toast.error('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await api.post(
//         `/api/auth/${isRegistering ? 'register' : 'login'}`,
//         { email: formData.email, password: formData.password }
//       );

//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         setIsAuthenticated(true);
//         toast.success(`Successfully ${isRegistering ? 'registered' : 'logged in'}!`);
//         navigate('/', { replace: true });
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || 'Authentication failed';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative bg-theme">
//       {/* Background Image */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background"
//         style={{
//           backgroundImage: 'url(/bg-world.png)',
//         }}
//       />
      
//       {/* Login Form Container */}
//       <div className="relative w-full max-w-md p-8 m-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.01] card-theme">
//         {/* Decorative Elements */}
//         <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/50 rounded-full blur-xl"></div>
//         <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200/50 rounded-full blur-xl"></div>
        
//         {/* Form Content */}
//         <div className="relative">
//           <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//             {isRegistering ? 'Create Account' : 'Welcome Back'}
//           </h2>
          
//           {error && (
//             <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
//               <p className="text-sm font-medium">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 input-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border input-theme border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 required
//               />
//             </div>

//             {isRegistering && (
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 input-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required={isRegistering}
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 px-4 rounded-lg text-white font-medium 
//                 ${isLoading 
//                   ? 'bg-gray-400 cursor-not-allowed' 
//                   : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-yellow-800'
//                 } transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
//                   {isRegistering ? 'Creating Account...' : 'Signing In...'}
//                 </div>
//               ) : (
//                 <>{isRegistering ? 'Create Account' : 'Login'}</>
//               )}
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <button
//               onClick={() => {
//                 setIsRegistering(!isRegistering);
//                 setError('');
//                 setFormData({ email: '', password: '', confirmPassword: '' });
//               }}
//               className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//             >
//               {isRegistering 
//                 ? 'Already have an account? Login' 
//                 : "Don't have an account? Register"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../utils/axios';
import { toast } from 'react-toastify';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      api.get('/api/protected')
        .then(() => {
          setIsAuthenticated(true);
          navigate('/', { replace: true });
        })
        .catch(() => {
          Cookies.remove('token');
        });
    }
  }, [setIsAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isRegistering && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post(
        `/api/auth/${isRegistering ? 'register' : 'login'}`,
        { email: formData.email, password: formData.password }
      );

      if (isRegistering) {
        // For registration success
        toast.success('Registration successful! Please login with your credentials');
        setIsRegistering(false);
        setFormData({ email: formData.email, password: '', confirmPassword: '' }); // Keep email filled
      } else {
        // For login success
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setIsAuthenticated(true);
          toast.success('Logged in successfully!');
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Authentication failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-theme">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background"
        style={{
          backgroundImage: 'url(/bg-world.png)',
        }}
      />
      
      {/* Login Form Container */}
      <div className="relative w-full max-w-md p-8 m-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.01] card-theme">
        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/50 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200/50 rounded-full blur-xl"></div>
        
        {/* Form Content */}
        <div className="relative">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 input-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border input-theme border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 input-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required={isRegistering}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium 
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-yellow-800'
                } transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  {isRegistering ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                <>{isRegistering ? 'Create Account' : 'Login'}</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setFormData({ email: '', password: '', confirmPassword: '' });
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              {isRegistering 
                ? 'Already have an account? Login' 
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;