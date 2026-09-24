export default function Intro() {
  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-primary text-xs uppercase font-semibold tracking-widest">
        Image compression
      </span>

      <h1
        className="text-[30px] md:text-[40px] font-black text-ec max-w-80
        md:max-w-100"
      >
        Compress images. Keep them clean.
      </h1>

      <p className="text-secondary text-sm leading-6.5 max-w-150">
        Reduce image file size without unnecessary complexity. Upload an image,
        choose the quality, and download the optimized file.
      </p>
    </div>
  );
}
