import React, { useState, useRef, useEffect, useMemo } from "react";
import Header from "../components/LiveRoom/Header";
import Chat from "../components/LiveRoom/LiveChat";
import ChatSendText from "../components/LiveRoom/ChatSendText";
import LiveSpeakers from "../components/LiveRoom/LiveSpeakers";
import LiveWelcome from "../components/LiveRoom/LiveWelcome";
import { useParams } from "react-router-dom";
import { useChatController } from "../hooks/useChatController";
import Api from "../services/Api";

const LiveStreamLayout = ({ minimize }) => {
  const { sessionId } = useParams();
  const [showMembers, setShowMembers] = useState(false);
  const [communityData, setCommunityData] = useState({});
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const chatRef = useRef(null);

  const { messages, ListAllChats, sendMessage, deleteMessage } =
    useChatController(sessionId, userId, token);

  if (messages.length < 1) {
    ListAllChats();
  }

  useEffect(() => {
    const fetchCommunityData = async () => {
      const [roomInfo, members] = await Promise.all([
        Api.getRoomInfo(sessionId),
        Api.getRoomMembers(sessionId),
      ]);

      // const isAdmin = members.some(
      //   (member) =>
      //     (member.user_id === userId && member.role === "admin") || "creator",
      // );

      setCommunityData({
        roomInfo,
        members,
      });

      // return {
      //   roomInfo,
      //   members,
      // };
    };
    fetchCommunityData();
  });

  const handleLeaveChat = async () => {
    try {
      await Api.leaveRoom(sessionId);
      navigate("/live");
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const { roomInfo, members } = communityData || {};

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <Header
        className="relative z-10"
        roomInfo={roomInfo}
        members={members}
        currentUserId={userId}
        onLeave={handleLeaveChat}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />

      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 w-full">
                <LiveWelcome
                  roomInfo={roomInfo}
                  membersCount={members?.length || 0}
                />
                <div className="bg-gray-800 p-4 rounded-lg w-full">
                  {messages.map((message) => (
                    <Chat
                      message={message}
                      communityData={communityData}
                      deleteMessage={deleteMessage}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-1/5 border-l border-gray-700 flex flex-col">
              <div className="flex-grow"></div>
              <div className="h-1/1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <LiveSpeakers
                  chatId={sessionId}
                  userId={userId}
                  token={token}
                />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full border-t border-gray-700">
            <ChatSendText onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamLayout;
