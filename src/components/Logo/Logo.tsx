export default function Logo() {
  return (
    <div className="flex items-center gap-x-4 lg:gap-x-5">
      <div
        className="border border-secondary/20 w-9 h-9 rounded flex items-center
        justify-center text-xs text-primary font-bold bg-box lg:h-11 lg:w-11
        lg:text-sm"
      >
        404
      </div>
      <span className="text-ec font-semibold lg:text-lg">
        Compress
        <span className="text-secondary text-xs ml-4 lg:ml-5">v0.1</span>
      </span>
    </div>
  );
}
