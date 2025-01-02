import React, { useState, useEffect, useRef } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import projectInfo from "../../../projectInfo";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{
        hideInChat: true,
        position: "left",
        role: "model",
        type: "text",
        text: projectInfo,
        date: new Date(),
    }]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null); // Reference for auto-scrolling
    const generateBotRepsonse = async (messages) => {
        // Update message list by removing Thinking...
        const updateMessageList = (text) => {
            setMessages(prev => 
                [
                    ...prev.filter(msg => msg.text !== "Thinking..."), 
                    {role: "model", position: "left", type: "text", text: text}
                ]
            );
        };
        // Format chat message for API request
        const formatMessages = messages.map(({role, position, type, text, date}) => ({role, parts: [{text}]}));
        console.log(formatMessages);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contents: formatMessages})
        }

        try {
            // Make API call to get Gemini response
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            console.log(data);
            if(!response.ok) {
                throw new Error(data.error.message || "Something went wrong!");
            }
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateMessageList(apiResponseText);

        } catch(error) {
            console.log(error);
        }
    };

    // Add the initial bot message when the chatbot opens
    useEffect(() => {
        if (isOpen && messages.length === 1) {
        setMessages((prevMessages) => [...prevMessages,
            {
            role: "model",
            position: "left",
            type: "text",
            text: "Hi Chef! How can I help?",
            date: new Date()
            },
        ]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== "") {
            // Add user's message
            const userMessage = {
                role: "user",
                position: "right",
                type: "text",
                text: inputValue,
                date: new Date(),
            };
    
            setMessages((prevMessages) => [...prevMessages, userMessage]);
        
            setInputValue("");

            // Add the "Thinking..." message
            const thinkingMessage = {
                role: "model",
                position: "left",
                type: "text",
                text: "Thinking...",
                date: new Date(),
            };
        
            setMessages((prevMessages) => [...prevMessages, thinkingMessage]);

            await generateBotRepsonse([...messages, 
                {
                    role: userMessage.role, 
                    position: userMessage.position, 
                    type: "text", text: `Using only details provided above, act as a friendly assistant and answer to this query from the user: ${userMessage.text}`, 
                    date: userMessage.date
                }
                ]
            );
        }
    };  

    // Auto-scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div>
        {/* Chat toggle button */}
        <button
            className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
        >
            💬
        </button>

        {/* Chat popup */}
        {isOpen && (
            <div className="fixed bottom-20 right-5 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg font-semibold">
                Chatbot
            </div>

            {/* Messages */}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages
                    .filter((message) => !message.hideInChat) // Exclude messages with hideInChat as true
                    .map((message, index) => (
                        <MessageBox
                            key={index}
                            position={message.position}
                            type={message.type}
                            text={message.text}
                            date={message.date}
                            title={message.position === "left" ? "Chef Bot" : "You"}
                            avatar={
                                message.position === "left"
                                    ? "https://cdn-icons-png.flaticon.com/512/7414/7414124.png"
                                    : undefined
                            }
                        />
                    ))}
                {/* Auto-scroll reference */}
                <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="flex items-center p-2 bg-gray-100 rounded-b-lg">
                <input
                type="text"
                placeholder="Message..."
                className="flex-grow p-2 border rounded-md focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600"
                >
                Send
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Chatbot;