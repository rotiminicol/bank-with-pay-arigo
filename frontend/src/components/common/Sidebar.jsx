import { 
  FaHome, 
  FaUser, 
  FaSignOutAlt, 
  FaExchangeAlt, 
  FaHistory, 
  FaFileInvoice, 
  FaGraduationCap, 
  FaGlobe, 
  FaChartLine, 
  FaMoneyCheckAlt, 
  FaCreditCard, 
  FaCog,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BankSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();
  const location = useLocation();
  
  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const navItems = [
    { icon: <FaHome className="w-6 h-6" />, label: "Dashboard", path: "/", color: "text-blue-500" },
    { icon: <FaExchangeAlt className="w-6 h-6" />, label: "Transfers", path: "/transfers", color: "text-green-500" },
    { icon: <FaHistory className="w-6 h-6" />, label: "Transactions", path: "/transactions", color: "text-purple-500" },
    { icon: <FaFileInvoice className="w-6 h-6" />, label: "Bills", path: "/bills", color: "text-orange-500" },
    { icon: <FaGraduationCap className="w-6 h-6" />, label: "School Fees", path: "/school-fees", color: "text-yellow-500" },
    { icon: <FaGlobe className="w-6 h-6" />, label: "International", path: "/international", color: "text-teal-500" },
    { icon: <FaChartLine className="w-6 h-6" />, label: "Investments", path: "/investments", color: "text-indigo-500" },
    { icon: <FaMoneyCheckAlt className="w-6 h-6" />, label: "Loans", path: "/loans", color: "text-red-500" },
    { icon: <FaCreditCard className="w-6 h-6" />, label: "Cards", path: "/cards", color: "text-pink-500" },
    { icon: <FaUser className="w-6 h-6" />, label: "Account", path: `/profile/${authUser?.username}`, color: "text-blue-400" },
    { icon: <FaCog className="w-6 h-6" />, label: "Settings", path: "/settings", color: "text-gray-500" },
  ];

  return (
    <motion.div 
      className={`relative bg-gradient-to-b from-blue-50 to-white shadow-xl h-screen ${isExpanded ? 'w-72' : 'w-24'} transition-all duration-300 ease-in-out flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ width: isExpanded ? 288 : 96 }}
      animate={{ width: isExpanded ? 288 : 96 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sticky top-0 left-0 h-full flex flex-col overflow-hidden">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-blue-100">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-blue-600 whitespace-nowrap flex items-center"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold">AP</span>
                </div>
                Arigo Pay
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-full hover:bg-blue-100 transition-all duration-200 ${isHovered || isExpanded ? 'opacity-100' : 'opacity-0'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? (
              <FaChevronLeft className="text-blue-600 w-4 h-4" />
            ) : (
              <FaChevronRight className="text-blue-600 w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col gap-1 mt-6 px-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to={item.path}
                className={`flex items-center transition-all duration-200 rounded-xl py-3 ${
                  isExpanded ? 'px-5' : 'px-4 justify-center'
                } ${
                  location.pathname === item.path 
                    ? 'bg-blue-100 text-blue-600 shadow-inner' 
                    : 'hover:bg-blue-50 text-gray-700'
                }`}
              >
                <motion.span 
                  className={item.color}
                  animate={{
                    scale: location.pathname === item.path ? 1.1 : 1
                  }}
                >
                  {item.icon}
                </motion.span>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.05 * index }}
                      className="ml-4 text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* User Profile */}
        {authUser && (
          <motion.div 
            className="mt-auto mb-6 mx-3 p-3 bg-white rounded-xl shadow-sm border border-blue-100"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={`/profile/${authUser.username}`}
              className="flex items-center"
            >
              <motion.div 
                className="avatar"
                whileHover={{ rotate: 5 }}
              >
                <div className="w-12 rounded-full ring-2 ring-blue-200">
                  <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
                </div>
              </motion.div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="ml-3 flex-1 overflow-hidden"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-800 font-semibold text-sm truncate">{authUser?.fullName}</p>
                    <p className="text-gray-500 text-xs">@{authUser?.username}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button 
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className={`p-2 rounded-full hover:bg-blue-100 ${isExpanded ? 'ml-2' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSignOutAlt className="text-blue-600 w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>

    
    </motion.div>
  );
};

export default BankSidebar;