import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const UserCardPage = () => {
  const [users] = useState([
    { id: 1, name: 'Alex Johnson', role: 'Product Manager', avatar: '/api/placeholder/150/150', badges: 3, projects: 4, tasks: 45 },
    { id: 2, name: 'Jamie Smith', role: 'Senior Developer', avatar: '/api/placeholder/150/150', badges: 7, projects: 6, tasks: 72 },
    { id: 3, name: 'Taylor Brown', role: 'UX Designer', avatar: '/api/placeholder/150/150', badges: 5, projects: 3, tasks: 38 },
    { id: 4, name: 'Casey Wilson', role: 'Marketing Specialist', avatar: '/api/placeholder/150/150', badges: 2, projects: 5, tasks: 29 },
    { id: 5, name: 'Morgan Lee', role: 'Data Analyst', avatar: '/api/placeholder/150/150', badges: 4, projects: 2, tasks: 53 },
    { id: 6, name: 'Riley Cooper', role: 'Content Writer', avatar: '/api/placeholder/150/150', badges: 3, projects: 3, tasks: 41 },
  ]);

  const [visible, setVisible] = useState([]);

  useEffect(() => {
    users.forEach((user, index) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, user.id]);
      }, 200 * index);
    });
  }, [users]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center">
          Our Exceptional Team
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Discover the brilliant minds driving innovation and excellence at our bank.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: visible.includes(user.id) ? 1 : 0,
                y: visible.includes(user.id) ? 0 : 50,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <UserCard user={user} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center mb-6">
          <motion.div
            className="h-20 w-20 rounded-full overflow-hidden border-4 border-indigo-500"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white">{user.name}</h3>
            <p className="text-indigo-200">{user.role}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="bg-gray-700 rounded-lg p-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-sm text-gray-300">Active Projects</p>
            <p className="text-lg font-bold text-white">{user.projects}</p>
          </motion.div>
          <motion.div
            className="bg-gray-700 rounded-lg p-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-sm text-gray-300">Completed Tasks</p>
            <p className="text-lg font-bold text-white">{user.tasks}</p>
          </motion.div>
        </div>

        {/* Badges and Button */}
        <div className="flex items-center justify-between">
          <motion.span
            className="bg-indigo-500 text-white text-sm font-medium px-3 py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {user.badges} {user.badges === 1 ? 'Badge' : 'Badges'}
          </motion.span>
          <motion.button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium"
            whileHover={{ backgroundColor: '#4f46e5', scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View Profile
          </motion.button>
        </div>
      </div>

      {/* Decorative Element */}
      <motion.div
        className="absolute top-0 right-0 h-32 w-32 bg-indigo-500 rounded-full opacity-20"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.4 }}
        style={{ filter: 'blur(50px)' }}
      />
    </motion.div>
  );
};

export default UserCardPage;