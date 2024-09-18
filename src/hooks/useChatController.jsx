import { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";

// const SOCKET_SERVER_URL =
//   "https://0d3a37b3-590d-4da3-892e-347bbc5cb91e-00-1gsjkthjnxlbp.spock.replit.dev/";
const SOCKET_SERVER_URL = "https://talkie-backend-pobo.onrender.com";

export const useChatController = (chatId, userId, token) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [micRequests, setMicRequests] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const peerConnectionsRef = useRef({});
  const localStreamRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const newSocket = io.connect(SOCKET_SERVER_URL, {
      auth: { token },
      query: { chatId },
    });

    setSocket(newSocket);

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("ListAllChats", (message) => {
      setMessages(message);
    });

    newSocket.on("messageDeleted", ({ messageId }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId),
      );
    });

    // WebRTC related events
    newSocket.on("userJoined", handleUserJoined);
    newSocket.on("userLeft", handleUserLeft);
    newSocket.on("offer", handleOffer);
    newSocket.on("answer", handleAnswer);
    newSocket.on("ice-candidate", handleIceCandidate);
    newSocket.on("micRequestApproved", handleMicRequestApproved);
    newSocket.on("micRequestDenied", handleMicRequestDenied);
    newSocket.on("speakerRemoved", handleSpeakerRemoved);
    newSocket.on("creatorStatus", ({ isCreator }) => setIsCreator(isCreator));

    return () => {
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      newSocket.close();
    };
  }, [chatId, token]);

  const sendMessage = useCallback(
    (content) => {
      if (socket) {
        socket.emit("sendMessage", { chatId, message: content });
      }
    },
    [socket, chatId],
  );

  const ListAllChats = useCallback(() => {
    if (socket) {
      socket.emit("listAllChats", { chatId });
    }
  }, [socket, chatId]);

  const deleteMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("deleteMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  const pinMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("pinMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  const unpinMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("unpinMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  // WebRTC related functions
  const requestMic = () => {
    if (socket) {
      socket.emit("requestMic", { chatId, userId });
    }
  };

  const approveMicRequest = (requesterId) => {
    if (socket && isCreator) {
      socket.emit("approveMicRequest", { chatId, requesterId });
    }
  };

  const denyMicRequest = (requesterId) => {
    if (socket && isCreator) {
      socket.emit("denyMicRequest", { chatId, requesterId });
    }
  };

  const removeSpeaker = (speakerId) => {
    if (socket && isCreator) {
      socket.emit("removeSpeaker", { chatId, speakerId });
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const handleUserJoined = ({ userId }) => {
    setParticipants((prev) => [...prev, userId]);
  };

  const handleUserLeft = ({ userId }) => {
    setParticipants((prev) => prev.filter((id) => id !== userId));
    setSpeakers((prev) => prev.filter((id) => id !== userId));
    if (peerConnectionsRef.current[userId]) {
      peerConnectionsRef.current[userId].close();
      delete peerConnectionsRef.current[userId];
    }
  };

  const handleMicRequestApproved = ({ userId }) => {
    setSpeakers((prev) => [...prev, userId]);
    setMicRequests((prev) => prev.filter((id) => id !== userId));
    if (userId === socket.id) {
      startLocalStream();
    } else {
      createPeerConnection(userId);
    }
  };

  const handleMicRequestDenied = ({ userId }) => {
    setMicRequests((prev) => prev.filter((id) => id !== userId));
  };

  const handleSpeakerRemoved = ({ userId }) => {
    setSpeakers((prev) => prev.filter((id) => id !== userId));
    if (userId === socket.id) {
      stopLocalStream();
    } else if (peerConnectionsRef.current[userId]) {
      peerConnectionsRef.current[userId].close();
      delete peerConnectionsRef.current[userId];
    }
  };

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      setIsMuted(false);

      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      source.connect(analyser);

      const checkAudioLevel = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        if (average > 30) {
          // Adjust this threshold as needed
          setActiveSpeaker(socket.id);
        } else if (activeSpeaker === socket.id) {
          setActiveSpeaker(null);
        }
        requestAnimationFrame(checkAudioLevel);
      };
      checkAudioLevel();

      Object.values(peerConnectionsRef.current).forEach((pc) => {
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopLocalStream = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setIsMuted(true);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const createPeerConnection = (userId) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          chatId,
          userId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      // Create audio element and play the stream
      const audioElement = new Audio();
      audioElement.srcObject = remoteStream;
      audioElement.play();

      // Set up audio analysis for the remote stream
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(remoteStream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);

      const checkAudioLevel = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        if (average > 30) {
          // Adjust this threshold as needed
          setActiveSpeaker(userId);
        } else if (activeSpeaker === userId) {
          setActiveSpeaker(null);
        }
        requestAnimationFrame(checkAudioLevel);
      };
      checkAudioLevel();
    };

    if (localStreamRef.current) {
      localStreamRef.current
        .getTracks()
        .forEach((track) =>
          peerConnection.addTrack(track, localStreamRef.current),
        );
    }

    peerConnectionsRef.current[userId] = peerConnection;
    return peerConnection;
  };

  const handleOffer = async ({ userId, offer }) => {
    const peerConnection = createPeerConnection(userId);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { chatId, userId, answer });
  };

  const handleAnswer = async ({ userId, answer }) => {
    const peerConnection = peerConnectionsRef.current[userId];
    if (peerConnection) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    }
  };

  const handleIceCandidate = ({ userId, candidate }) => {
    const peerConnection = peerConnectionsRef.current[userId];
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return {
    messages,
    sendMessage,
    deleteMessage,
    pinMessage,
    unpinMessage,
    ListAllChats,
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
  };
};
