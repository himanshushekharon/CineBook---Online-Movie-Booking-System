import React, { useState } from 'react';
import { Mail, ArrowLeft, Film, CheckCircle } from 'lucide-react';

interface ResetPasswordProps {
  onClose: () => void;
  onBack: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onClose, onBack }) => {
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    setUserEmail(email);
    setStep('code');
    setErrors({});
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!verificationCode.trim()) {
      newErrors.code = 'Verification code is required';
    } else if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      newErrors.code = 'Please enter a valid 6-digit code';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    setStep('password');
    setErrors({});
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700 shadow-2xl text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset</h2>
            <p className="text-gray-400">Your password has been successfully reset!</p>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              You can now sign in with your new password.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          {step !== 'email' && (
            <button
              onClick={() => {
                if (step === 'code') setStep('email');
                if (step === 'password') setStep('code');
              }}
              className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-4 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <div className="flex items-center justify-center mb-4">
            <Film className="w-8 h-8 text-red-500 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              CineBook
            </h1>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-gray-400 text-sm">
            {step === 'email' && 'Enter your email address to receive a reset code'}
            {step === 'code' && 'Enter the verification code sent to your email'}
            {step === 'password' && 'Create a new password for your account'}
          </p>
        </div>

        {/* Email Step */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-400 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-600 focus:ring-red-500 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 transform mt-6 ${
                isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 active:scale-95 shadow-lg'
              }`}
            >
              {isLoading ? 'Sending Code...' : 'Send Reset Code'}
            </button>

            <p className="text-center text-sm text-gray-400 pt-4">
              <button
                onClick={onBack}
                className="text-red-500 hover:text-red-400 font-semibold transition-colors"
              >
                Back to Sign In
              </button>
            </p>
          </form>
        )}

        {/* Code Step */}
        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-400">
                A 6-digit code has been sent to <span className="font-semibold text-white">{userEmail}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                  if (errors.code) setErrors(prev => ({ ...prev, code: '' }));
                }}
                placeholder="000000"
                maxLength={6}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-400 text-center text-2xl tracking-widest font-mono ${
                  errors.code
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-red-500 focus:border-red-500'
                }`}
              />
              {errors.code && (
                <p className="text-red-400 text-xs mt-1">{errors.code}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 transform mt-6 ${
                isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 active:scale-95 shadow-lg'
              }`}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            <p className="text-center text-xs text-gray-400 pt-4">
              Didn't receive the code?{' '}
              <button
                onClick={() => handleEmailSubmit({ preventDefault: () => {} } as React.FormEvent)}
                className="text-red-500 hover:text-red-400 font-semibold transition-colors"
              >
                Resend
              </button>
            </p>
          </form>
        )}

        {/* Password Step */}
        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
                }}
                placeholder="Enter new password"
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-400 ${
                  errors.newPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-red-500 focus:border-red-500'
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">At least 8 characters required</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-400 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-red-500 focus:border-red-500'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 transform mt-6 ${
                isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 active:scale-95 shadow-lg'
              }`}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
