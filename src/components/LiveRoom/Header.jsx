import React, { useMemo } from "react";
import { FaMinusCircle, FaMicrophone, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({
  roomInfo,
  members,
  currentUserId,
  onLeave,
  onToggleMembers,
}) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/live");
  };

  const displayMembers = useMemo(() => {
    if (!members || members.length === 0) return [];

    // Find the current user
    const currentUser = members.find(
      (member) => member.user_id === currentUserId,
    );

    // Filter out the current user from other members and shuffle the array
    const otherMembers = members
      .filter((member) => member.user_id !== currentUserId)
      .sort(() => 0.5 - Math.random());

    // Combine current user with up to two random members
    const result = currentUser
      ? [currentUser, ...otherMembers.slice(0, 2)]
      : otherMembers.slice(0, 3);

    return result;
  }, [members, currentUserId]);

  const additionalMembersCount = Math.max(0, members?.length - 3);

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 bg-opacity-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-b border-gray-600 shadow-lg z-10 h-20 sm:h-24 rounded-b-3xl">
      <div className="flex flex-col items-start">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center px-3 py-1 rounded-full text-white text-14 font-bold shadow-md">
          <FaMicrophone className="mr-1" size={14} />
          {roomInfo?.session_title || "Community Chat"}
        </div>
        <div className="flex items-center mt-1 sm:mt-2">
          <div className="flex -space-x-2">
            {displayMembers.map((member, index) => (
              <img
                key={member.user_id}
                src={member.avatar_url || `/default-avatar-${index + 1}.png`}
                alt={`${member.username}'s avatar`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-800 shadow-md"
              />
            ))}
            {additionalMembersCount > 0 && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 border-2 border-gray-800 shadow-md flex items-center justify-center text-white text-xs font-bold">
                +{additionalMembersCount}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center bg-gray-700/60 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md ml-2">
            <FaUsers className="mr-1" size={10} />
            {members?.length}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center items-end space-x-2 sm:space-x-4">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={onToggleMembers}
          >
            Members
          </button>
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-red-700 transition duration-300 shadow-md"
            onClick={onLeave}
          >
            Leave
          </button>
          <button className="text-gray-300 px-3 sm:px-4 sm:py-2 hover:text-white transition duration-300">
            <FaMinusCircle size={20} onClick={onClose} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
