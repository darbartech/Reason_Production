export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-accent/20 rounded-full animate-spin border-t-accent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-primary rounded-lg animate-pulse"></div>
        </div>
      </div>
      <p className="mt-8 text-primary font-bold tracking-widest uppercase text-xs animate-pulse">
        Reason Education
      </p>
    </div>
  );
}
