import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar?: string;
  date?: string;
}

const HomePageMain: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[]>([
    {
      id: "1",
      name: "Me (You)",
      message: "MFNXS75NUW21G1B43WY2M1...",
      time: "01-03-2025",
      avatar: "",
    },
    {
      id: "2",
      name: "Munavvir Newmans",
      message: "Yes",
      time: "09:12 AM",
      avatar: "",
    },
    {
      id: "3",
      name: "Cs",
      message: "Mananthavady aada",
      time: "09:11 AM",
      avatar: "",
    },
    {
      id: "4",
      name: "Mav parkics 🔶",
      message: "Adwaid Brocamp: 📋 Sticker",
      time: "07:14 AM",
      avatar: "",
    },
    {
      id: "5",
      name: "Sister",
      message: "Live location can't be displayed h...",
      time: "Yesterday",
      avatar: "",
    },
    {
      id: "6",
      name: "+91 94001 37383",
      message: "Hi",
      time: "Yesterday",
      avatar: "",
    },
    {
      id: "7",
      name: "Sreekuttan BsdK",
      message: "https://youtube.com/shorts/7c0p...",
      time: "01-03-2025",
      avatar: "",
    },
    {
      id: "8",
      name: "III B.A.Politics A",
      message: "~Simi, P. M: ⏱ This message was del...",
      time: "01-03-2025",
      avatar: "",
    },
    {
      id: "9",
      name: "Mebin Chachaan",
      message: "okm",
      time: "28-02-2025",
      avatar: "",
    },


  ]);

  const nevigate =useNavigate()

  return (
   // Responsive & Tailwind-converted Home Page Layout
<div className="flex flex-col h-screen w-screen max-w-[1536px] mx-auto overflow-hidden bg-[#f0f2f5]">
  {/* Header */}
  <div className="bg-[#272727] text-white">
    <div className="flex justify-between items-center px-4 py-2 bg-[#090909]">
      <span className="font-semibold text-sm">Talko</span>
      <div className="flex items-center gap-2">
        <button className="text-white text-base bg-[#090909]">&#9881;</button>
        <button className="text-white text-base bg-[#090909]">&#9734;</button>
        <button className="text-white text-base bg-[#090909]">&#128452;</button>
        <img
          className="w-[30px] h-[30px] mt-1 rounded-full"
          src="src/assets/images/userLogo.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Chat Header */}
    <div className="bg-[#090909] px-4 py-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white text-lg font-semibold">Chats</h2>
        <div className="flex gap-4">
          {[
            { icon: '💬', label: 'Chats' },
            { icon: '📷', label: 'Video call' },
            { icon: '☎️', label: 'Audio call' },
          ].map(({ icon, label }) => (
            <div key={label} className="relative group">
              <button className="text-[#aebac1] text-lg bg-[#090909]" >{icon}</button>
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-[#111b21] rounded px-3 py-2">
          <i className="text-[#aebac1] text-sm mr-2">🔍</i>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent border-none text-white text-sm w-full placeholder-[#8696a0] focus:outline-none"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
    {/* Sidebar */}
    <div className="w-full md:w-[40%] lg:w-[30%] max-w-[420px] bg-[#090909] border-r border-[#222d34] overflow-y-auto">
      {/* Chat items go here */}
    </div>

    {/* Empty Chat Window */}
    <div className="flex flex-1 items-center justify-center bg-[#090909] text-white">
      <div className="text-center max-w-[500px] p-5">
        <div className="flex justify-center mb-5">
          <img
            className="h-[150px] w-[150px] rounded-full"
            src="src/assets/images/file-MNLWh3Knn3VmdNXgBsDF41.webp"
            alt="Talko Logo"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl mb-5 font-light">Talko for Windows</h1>
        <p className="text-[#aebac1] mb-2 text-base">Send and receive messages without keeping your phone online.</p>
        <p className="text-[#8696a0] mb-5 text-sm">Use Talko on up to 4 linked devices and 1 phone at the same time.</p>
        <div className="text-[#8696a0] text-xs flex items-center justify-center">
          <span className="mr-1">🔒</span> End-to-end encrypted
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default HomePageMain;
