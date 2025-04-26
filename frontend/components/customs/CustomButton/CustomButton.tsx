import React from 'react';

type CustomButtonProps = {
    text: string;
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;  // Add isLoading prop
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, className, onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`${className} bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 w-fit rounded-md text-white px-4 py-1 cursor-pointer disabled:opacity-50`} 
      disabled={isLoading} // Disable the button when loading
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path fill="currentColor" d="M4 12c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2s-.9 2-2 2H6c-1.1 0-2-.9-2-2z" />
          </svg>
          Loading...
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
