function RollBtn({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`group relative overflow-hidden px-6 py-2 transition-all duration-500 delay-200 rounded hover:bg-[#12c2e9] ${
        className || ''
      }`}
    >
      <span className='absolute block shadow-[1px_1px_15px_0_rgba(50,50,50,0.9)] top-0 -left-full w-full h-0.5 bg-[#12c2e9] group-hover:left-0 group-last:transition-all duration-75 group-hover:delay-[0s]'></span>
      <span className='absolute block shadow-[1px_1px_15px_0_rgba(50,50,50,0.9)] -top-full right-0 w-0.5 h-full bg-[#12c2e9] group-hover:top-0 group-last:transition-all duration-75 group-hover:delay-[0.05s]'></span>
      <span className='absolute block shadow-[1px_1px_15px_0_rgba(50,50,50,0.9)] bottom-0 -right-full w-full h-0.5 bg-[#12c2e9] group-hover:right-0 group-last:transition-all duration-75 group-hover:delay-[0.1s]'></span>
      <span className='absolute block shadow-[1px_1px_15px_0_rgba(50,50,50,0.9)] -bottom-full left-0 w-0.5 h-full bg-[#12c2e9] group-hover:bottom-0 group-last:transition-all duration-75 group-hover:delay-[0.15s]'></span>
      {children}
    </button>
  );
}

export default RollBtn;
