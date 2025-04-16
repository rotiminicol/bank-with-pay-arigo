import { useState, useEffect } from 'react';

const BankLoader = () => {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [animate]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setProgress(0);
        setAnimate(true);
      }, 1000);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="relative w-32 h-32">
        {/* Vault door base */}
        <div className="absolute inset-0 rounded-full border-8 border-blue-800 bg-blue-900 shadow-lg"></div>
        
        {/* Vault door handle */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 -ml-3 -mt-3 bg-blue-200 rounded-full z-20 shadow-md"></div>
        
        {/* Spinning vault mechanism */}
        <div 
          className="absolute inset-2 rounded-full border-8 border-dashed border-blue-500 bg-transparent"
          style={{ 
            animation: "spin 4s linear infinite",
            transformOrigin: "center"
          }}
        ></div>
        
        {/* Security bolts */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-4 h-4 bg-blue-300 rounded-full shadow-inner"
            style={{
              top: `${50 + 42 * Math.sin(i * Math.PI / 4)}%`,
              left: `${50 + 42 * Math.cos(i * Math.PI / 4)}%`,
              transform: "translate(-50%, -50%)",
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite alternate`
            }}
          ></div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600"
          style={{ width: `${progress}%`, transition: "width 0.1s ease-in-out" }}
        ></div>
      </div>
      
      {/* Loading text */}
      <div className="text-sm font-medium text-blue-700">
        {progress < 100 ? "Securing transaction..." : "Ready!"}
      </div>
      

    </div>
  );
};

export default BankLoader;