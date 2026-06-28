export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-5">
        {/* Animated Spinner */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-emerald-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>

        {/* Brand */}
        <div className="text-5xl animate-pulse"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-sm text-gray-400">Preparing your next great read</p>

        {/* Animated Progress Bar */}
        <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
