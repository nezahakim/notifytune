// // import React, { useState } from "react";
// // import { FaMicrophone, FaPlus, FaUserPlus } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";

// // const speakers = [
// //   { id: 1, name: "Alice", isCreator: true, profilePic: "/vite.svg" },
// //   { id: 2, name: "Bob", isCreator: false, profilePic: "/vite.svg" },
// //   { id: 3, name: "Charlie", isCreator: false, profilePic: "/vite.svg" },
// //   { id: 4, name: "David", isCreator: false, profilePic: "/vite.svg" },
// //   { id: 5, name: "Eve", isCreator: false, profilePic: "/vite.svg" },
// // ];

// // const LiveSpeakers = () => {
// //   const [isFollowing, setIsFollowing] = useState(false);
// //   const [showAllSpeakers, setShowAllSpeakers] = useState(false);

// //   const toggleFollow = () => setIsFollowing(!isFollowing);
// //   const creator = speakers.find((speaker) => speaker.isCreator);
// //   const nonCreators = speakers.filter((speaker) => !speaker.isCreator);

// //   return (
// //     <div className="flex flex-col items-end items-center space-y-2 p-2">
// //       {/* Creator */}
// //       <motion.div
// //         className="relative"
// //         initial={{ scale: 0.8, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         <img
// //           src={creator.profilePic}
// //           alt={`Creator's profile`}
// //           className="w-14 h-14 rounded-full object-cover border-2 border-white"
// //         />
// //         <motion.button
// //           className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
// //             isFollowing ? "bg-gray-500" : "bg-red-500"
// //           }`}
// //           whileHover={{ scale: 1.1 }}
// //           whileTap={{ scale: 0.9 }}
// //           onClick={toggleFollow}
// //         >
// //           {isFollowing ? <FaUserPlus size={12} /> : <FaPlus size={12} />}
// //         </motion.button>
// //       </motion.div>

// //       {/* Spacer */}
// //       <div className="h-1"></div>

// //       {/* Non-Creators */}
// //       <div className="shadow-sm bg-gray-100 py-2 px-1 rounded-full flex flex-col items-end items-center space-y-2">
// //         <AnimatePresence>
// //           {nonCreators
// //             .slice(0, showAllSpeakers ? undefined : 3)
// //             .map((speaker, index) => (
// //               <motion.div
// //                 key={speaker.id}
// //                 className="relative"
// //                 initial={{ scale: 0, opacity: 0 }}
// //                 animate={{ scale: 1, opacity: 1 }}
// //                 exit={{ scale: 0, opacity: 0 }}
// //                 transition={{ duration: 0.2, delay: index * 0.1 }}
// //               >
// //                 <img
// //                   src={speaker.profilePic}
// //                   alt={`Speaker's profile`}
// //                   className="w-14 h-14 rounded-full object-cover border-2 border-gray-800"
// //                 />
// //                 <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// //                   {index + 1}
// //                 </div>
// //               </motion.div>
// //             ))}
// //         </AnimatePresence>
// //         {nonCreators.length > 3 && (
// //           <motion.button
// //             className="text-sm text-blue-500 font-semibold"
// //             onClick={() => setShowAllSpeakers(!showAllSpeakers)}
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             {showAllSpeakers ? "<<" : `+${nonCreators.length - 3}`}
// //           </motion.button>
// //         )}
// //       </div>
// //       {/* Spacer */}
// //       <div className="h-1"></div>

// //       {/* Request Mic Button */}
// //       <motion.div
// //         className="relative mt-2"
// //         whileHover={{ scale: 1.05 }}
// //         whileTap={{ scale: 0.95 }}
// //       >
// //         <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
// //           <FaPlus size={14} className="text-gray-600" />
// //         </div>
// //         <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// //           <FaMicrophone size={10} />
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default LiveSpeakers;

// import React, { useState } from "react";
// import {
//   FaMicrophone,
//   FaPlus,
//   FaUserPlus,
//   FaMicrophoneSlash,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useChatController } from "../../hooks/useChatController";

// const LiveSpeakers = ({ chatId, userId, token }) => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [showAllSpeakers, setShowAllSpeakers] = useState(false);

//   const {
//     participants,
//     isAudioEnabled,
//     isMuted,
//     activeSpeaker,
//     startAudio,
//     stopAudio,
//     toggleMute,
//   } = useChatController(chatId, userId, token);

//   const toggleFollow = () => setIsFollowing(!isFollowing);

//   const creator = participants.find((participant) => participant.is_creator);
//   const nonCreators = participants.filter(
//     (participant) => !participant.is_creator,
//   );

//   console.log(creator);

//   return (
//     <div className="flex flex-col items-end items-center space-y-2 p-2">
//       {/* Creator */}
//       <motion.div
//         className="relative"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <span
//           className={`w-14 h-14 rounded-full object-cover ${
//             activeSpeaker === creator?.id ? "border-green-500" : "border-white"
//           } text-4xl border-4 bg-gray-100 flex items-center justify-center -top-12 left-0 shadow-lg `}
//         >
//           🌸
//         </span>
//         {/* <img
//           src={creator.profilePic}
//           alt={`Creator's profile`}
//           className={`w-14 h-14 rounded-full object-cover border-2 ${
//             activeSpeaker === creator.id ? "border-green-500" : "border-white"
//           }`}
//         /> */}
//         <motion.button
//           className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
//             isFollowing ? "bg-gray-500" : "bg-red-500"
//           }`}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={toggleFollow}
//         >
//           {isFollowing ? <FaUserPlus size={12} /> : <FaPlus size={12} />}
//         </motion.button>
//         {creator?.id === userId && (
//           <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             {isMuted ? (
//               <FaMicrophoneSlash size={8} />
//             ) : (
//               <FaMicrophone size={8} />
//             )}
//           </div>
//         )}
//       </motion.div>

//       {/* Spacer */}
//       <div className="h-1"></div>

//       {/* Non-Creators */}
//       <div className="shadow-sm bg-gray-100 py-2 px-1 rounded-full flex flex-col items-end items-center space-y-2">
//         <AnimatePresence>
//           {nonCreators
//             .slice(0, showAllSpeakers ? undefined : 3)
//             .map((speaker, index) => (
//               <motion.div
//                 key={speaker?.id}
//                 className="relative"
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0, opacity: 0 }}
//                 transition={{ duration: 0.2, delay: index * 0.1 }}
//               >
//                 <img
//                   src={speaker?.profilePic}
//                   alt={`Speaker's profile`}
//                   className={`w-14 h-14 rounded-full object-cover border-2 ${
//                     activeSpeaker === speaker.id
//                       ? "border-green-500"
//                       : "border-gray-800"
//                   }`}
//                 />
//                 <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                   {index + 1}
//                 </div>
//                 {speaker.id === userId && (
//                   <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {isMuted ? (
//                       <FaMicrophoneSlash size={8} />
//                     ) : (
//                       <FaMicrophone size={8} />
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//         </AnimatePresence>
//         {nonCreators.length > 3 && (
//           <motion.button
//             className="text-sm text-blue-500 font-semibold"
//             onClick={() => setShowAllSpeakers(!showAllSpeakers)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {showAllSpeakers ? "<<" : `+${nonCreators.length - 3}`}
//           </motion.button>
//         )}
//       </div>

//       {/* Spacer */}
//       <div className="h-1"></div>

//       {/* Audio Control Button */}
//       <motion.div
//         className="relative mt-2"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => (isAudioEnabled ? stopAudio() : startAudio())}
//       >
//         <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
//           {isAudioEnabled ? (
//             <FaMicrophone size={14} className="text-gray-600" />
//           ) : (
//             <FaPlus size={14} className="text-gray-600" />
//           )}
//         </div>
//         {isAudioEnabled && (
//           <div
//             className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleMute();
//             }}
//           >
//             {isMuted ? (
//               <FaMicrophoneSlash size={10} />
//             ) : (
//               <FaMicrophone size={10} />
//             )}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default LiveSpeakers;

import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaPlus,
  FaUserPlus,
  FaMicrophoneSlash,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useChatController } from "../../hooks/useChatController";

const LiveSpeakers = ({ chatId, userId, token }) => {
  const {
    participants,
    speakers,
    isCreator,
    micRequests,
    isMuted,
    activeSpeaker,
    requestMic,
    approveMicRequest,
    denyMicRequest,
    removeSpeaker,
    toggleMute,
  } = useChatController(chatId, userId, token);

  const [showAllSpeakers, setShowAllSpeakers] = useState(false);
  const isUserSpeaker = speakers.includes(userId);

  useEffect(() => {
    // Fetch initial data when component mounts
    // This could be done in useChatController as well
  }, []);

  return (
    <div className="flex flex-col items-end items-center space-y-2 p-2">
      {/* Speakers */}
      <div className="shadow-sm bg-gray-100 py-2 px-1 rounded-full flex flex-col items-end items-center space-y-2">
        <AnimatePresence>
          {speakers
            .slice(0, showAllSpeakers ? undefined : 5)
            .map((speakerId, index) => {
              const speaker = participants.find((p) => p.id === speakerId);
              return (
                <motion.div
                  key={speakerId}
                  className="relative"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <span
                    className={`w-14 h-14 rounded-full object-cover border-2 ${
                      activeSpeaker === speakerId
                        ? "border-green-500"
                        : "border-gray-800"
                    } text-4xl border-4 bg-gray-100 flex items-center justify-center -top-12 left-0 shadow-lg `}
                  >
                    {speaker?.username?.charAt(0).toUpperCase() || "🌸"}
                  </span>
                  <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </div>
                  {speakerId === userId && (
                    <div
                      className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <FaMicrophoneSlash size={8} />
                      ) : (
                        <FaMicrophone size={8} />
                      )}
                    </div>
                  )}
                  {isCreator && speakerId !== userId && (
                    <div
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                      onClick={() => removeSpeaker(speakerId)}
                    >
                      <FaTimes size={8} />
                    </div>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>
        {speakers.length > 5 && (
          <motion.button
            className="text-sm text-blue-500 font-semibold"
            onClick={() => setShowAllSpeakers(!showAllSpeakers)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllSpeakers ? "Show Less" : `+${speakers.length - 5} More`}
          </motion.button>
        )}
      </div>

      {/* Mic Request Button */}
      {!isUserSpeaker && (
        <motion.div
          className="relative mt-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={requestMic}
        >
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <FaPlus size={14} className="text-gray-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            <FaMicrophone size={10} />
          </div>
        </motion.div>
      )}

      {/* Mic Requests (Only visible to creator) */}
      {isCreator && micRequests.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Mic Requests:</h3>
          {micRequests.map((requesterId) => {
            const requester = participants.find((p) => p.id === requesterId);
            return (
              <div
                key={requesterId}
                className="flex items-center space-x-2 mb-2"
              >
                <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                  {requester?.username?.charAt(0).toUpperCase() || "?"}
                </span>
                <span className="text-sm">
                  {requester?.username || "Unknown User"}
                </span>
                <button
                  className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => approveMicRequest(requesterId)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => denyMicRequest(requesterId)}
                >
                  Deny
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveSpeakers;
