import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";

const LiveRoomCard = ({ room }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  useEffect(() => {
    const Join = async () => {
      try {
        const responce = await Api.joinRoom(room.session_id);
        if (responce) {
          console.log(true, responce);
          navigate("/l/c/" + room.session_id);
        }
      } catch (err) {
        if (err.response.status === 404) {
          navigate("/l/c/" + room.session_id);
        } else {
          console.log("Error Joining Room:", err);
        }
      }
    };

    if (click) {
      Join();
    }
  });

  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-lg mb-2">{room.session_title}</h3>
        <p className="text-purple-100 text-sm mb-4">{room.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="flex items-center text-sm">
          <FaUsers className="mr-2" />
          {room.participant_count}
          {room.participant_count > 1 ? " Members" : " Member"}
        </span>
        <button
          className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-purple-100 transition-colors duration-300"
          onClick={() => setClick(true)}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default LiveRoomCard;
