const MemberLoading = () => {
  return (
    <div className="flex items-center p-4 h-[132px] sm:w-2/5 w-full md:w-[20rem] border border-[#e5e7eb] m-4 rounded-lg animate-pulse">
      <div className="flex items-center">
        <div
          className="rounded-full bg-gray-300"
          style={{
            width: 98,
            height: 98,
          }}
        ></div>
      </div>
      <div className="text-center flex flex-col gap-2 md:items-center justify-end md:justify-center w-full">
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
