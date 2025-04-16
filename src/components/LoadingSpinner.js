import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-amber-50 bg-opacity-75 flex flex-col gap-4 items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      <p className="text-amber-900 font-serif">{message}</p>
    </div>
  );
};

export default LoadingSpinner;


// How to implement it into anther page
// import LoadingSpinner from '../components/LoadingSpinner';

// Inside your component:
// const YourComponent = () => {
//   const [isLoading, setIsLoading] = useState(true);

  // return (
  //   <>
  //     {isLoading && <LoadingSpinner />}
      {/* rest of your component */}
//     </>
//   );
// };