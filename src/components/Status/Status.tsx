export default function Status() {
  return (
    <div className="flex items-center gap-x-2 lg:gap-2.5">
      <span
        className="w-1.75 h-1.75 lg:w-2 lg:h-2 bg-red-500 animate-pulse
        inline-block rounded-full shadow-[0_0_10px_#fb2c36]"
      ></span>
      <span className="text-secondary text-xs lg:text-sm">Not Ready</span>
    </div>
  );
}
