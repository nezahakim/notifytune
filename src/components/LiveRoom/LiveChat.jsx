import React, { useMemo } from "react";
import { format } from "date-fns";
import { FaThumbtack } from "react-icons/fa";

const Chat = ({ message, communityData, deleteMessage }) => {
  const userId = localStorage.getItem("user_id");
  const isAdmin = !true;

  const userColors = useMemo(() => {
    const colors = {};
    const colorOptions = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F67280",
      "#C06C84",
      "#6C5B7B",
      "#355C7D",
      "#99B898",
    ];
    communityData?.members?.forEach((member, index) => {
      colors[member.user_id] = colorOptions[index % colorOptions.length];
    });
    return colors;
  }, [communityData?.members]);

  const getRandomEmoji = () => {
    const emojis = [
      "😀",
      "😍",
      "🚀",
      "🎉",
      "🦄",
      "🍕",
      "🎸",
      "🏆",
      "💡",
      "🌸",
      "🎙️",
      "✈️",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <div
      key={message.created_at}
      className="flex items-start space-x-3 mb-2 w-full"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
        {getRandomEmoji()}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <FaThumbtack className="text-yellow-500 text-xs" />
          <span
            className="text-xs font-semibold"
            style={{ color: userColors[message.user_id] }}
          >
            {message.user_id === userId ? "You" : message.full_name}
          </span>
        </div>
        <p className="text-white mt-1">{message.message}</p>
        <span className="text-xs text-gray-400">
          {format(new Date(message.created_at), "MMM d, yyyy HH:mm")}
        </span>
      </div>
      {isAdmin && (
        <div>
          <button
            onClick={() => deleteMessage(message.id)}
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
