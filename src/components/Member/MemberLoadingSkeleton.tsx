import React from 'react';

const MemberLoading = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center p-4 h-auto sm:h-[132px] w-full sm:w-2/5 md:w-[20rem] border border-gray-200 m-2 sm:m-4 rounded-lg animate-pulse">
      <div className="flex justify-center items-center mb-4 sm:mb-0 sm:mr-4">
        <div
          className="rounded-full bg-gray-300"
          style={{
            width: 98,
            height: 98,
          }}
        ></div>
      </div>
      <div className="text-center flex flex-col gap-2 items-center justify-center w-full">
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
        <div className="flex gap-10 justify-center mt-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const MemberLoadingSkeleton = ({ count = 12 }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {Array.from({ length: count }).map((_, index) => (
        <MemberLoading key={index} />
      ))}
    </div>
  );
};

export default MemberLoadingSkeleton;