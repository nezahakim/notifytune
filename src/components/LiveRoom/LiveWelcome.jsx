import React, { useEffect, useState } from "react";
import { FaUsers, FaStar, FaInfoCircle } from "react-icons/fa";
import { format } from "date-fns";
import { motion } from "framer-motion";

const LiveWelcome = ({ roomInfo, membersCount }) => {
  const [CreateDate, setCreateDate] = useState(null);
  useEffect(() => {
    if (roomInfo) {
      setCreateDate(format(new Date(roomInfo?.started_at), "MMM d, yyyy"));
    }
  });
  const getRandomEmoji = () => {
    const emojis = [
      "🚀",
      "🌟",
      "🎉",
      "🎊",
      "🔥",
      "💡",
      "🦄",
      "🍕",
      "🎸",
      "🏆",
      "🌺",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-6 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-6xl mb-4 text-center" variants={itemVariants}>
        {getRandomEmoji()}
      </motion.div>
      <motion.h2
        className="text-3xl font-bold text-white text-center mb-4"
        variants={itemVariants}
      >
        Welcome to {roomInfo?.session_title}!
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center">
          <FaUsers className="mr-2" />
          <span>{membersCount} members</span>
        </div>
        <div className="flex items-center justify-center">
          <FaStar className="mr-2" />
          <span>Level {roomInfo?.level || 1}</span>
        </div>
        <div className="flex items-center justify-center">
          <FaInfoCircle className="mr-2" />
          <span>Created on {CreateDate}</span>
        </div>
      </motion.div>
      <motion.p
        className="text-gray-200 mt-4 text-center"
        variants={itemVariants}
      >
        {roomInfo?.description}
      </motion.p>
    </motion.div>
  );
};

export default LiveWelcome;
