import img2 from "./assets/sidebar-images/art2.jpg"
import messageIcon from "./assets/input-options/message.png"
import joinroom from "./assets/input-options/joinroom.png"
import leaveroom from "./assets/input-options/leaveroom.png"
import inviteIcon from "./assets/input-options/invite.png"
import speakerIcon from "./assets/input-options/speaker.png"
import { nanoid } from "nanoid"
import { useState,useEffect } from "react"
import socket from "./socket.js";
import clsx from "clsx";

export default function ChatOptions({userData,users,toggle,toggleSound,sound}){ //comp that contains the textarea where u type stuff and 
                                                              //the options in the toolbar

  const isObjectEmpty = (objectName) => {     //func to check if object is empty
      return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
      );
    };

  const [inARoom,setInARoom] = useState(false)

  useEffect(()=>{   //use effect to toggle the inARoom state
    if (isObjectEmpty(users) || !(Object.hasOwn(users,socket.id))) return 
      let usersRoom = users[socket.id].currentRoom || "lobby"    
      if(usersRoom !== "lobby"){
        setInARoom(true)
      }
  },[users])
  

  const{userName,theme,fontSize} = userData
  const size = clsx(fontSize === "medium" && "text-sm",       //clsx func to handle users font size preference
                      fontSize === "default" && "text-[11px]",
                      fontSize === "large" && "text-xl"
                    )

  function handleMessage(formData){         //handler which sends user message to the server
    const  message= formData.get("message")
    if(message){
      socket.emit("chat-message", {
          user: userName,
          text: message,
          systemMessage:false
        });
  }}

  function handleJoinRoom(){      //handles the joining room functionality. will work only if user is in the lobby
    if(!inARoom){
      socket.emit("create-room",nanoid())
      setInARoom(true)
    }
  }

  function handleLeaveRoom(){   //handles leaving the room functionality. will work only if user is in a private room
    if(inARoom){
      socket.emit("leave-room")
      setInARoom(false)
    }
  }

  function handleInviteUsers(){     //called when the invite people option is clicked.. will return the settings tab
    if(inARoom){                //opened to the people section
      toggle('people')
    }
  }

  

  return(     //yes the text area is in a form... not the best way to do it but idc. contains clsx stuff to handle user preferences and an action attribute which calls the handleMessage func on submitting form 
    <form action={handleMessage} noValidate>  
      <div className="w-[99%] flex h-[200px] m-1 mt-[10px] gap-1">
        <img src={img2} className="w-[104px]" />
        <div className="h-[100%] flex-1 flex flex-col  gap-3">
          <div className="h-[30px] w-[100%]  shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray] flex items-center justify-start gap-2">
            <button className="ml-1 relative group cursor-pointer focus:outline-none" type="submit">
              <img src={messageIcon} className="h-[16px]"/>     
              <div className="pointer-events-none absolute bottom-[-18px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">send message</div>               
            </button>
            <button className="relative group cursor-pointer w-fit focus:outline-none" type="button" onClick={()=>toggleSound()}>
              <img src={speakerIcon} className={clsx(!sound ? "grayscale" : "","h-[16px]")}/>     
              <div className="pointer-events-none absolute bottom-[-18px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">{sound ? "set sound off" : "set sound on"}</div>               
            </button>
            <button className="relative group cursor-pointer focus:outline-none" type="button" onClick={()=>handleJoinRoom()}>
              <img src={joinroom} className={clsx(inARoom ? "grayscale" : "","h-[16px] ")}/>     
              <div className="pointer-events-none absolute bottom-[-18px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">join a room</div>               
            </button>
            <button className="relative group cursor-pointer w-fit focus:outline-none" type="button" onClick={()=>handleLeaveRoom()}>
              <img src={leaveroom} className={clsx(!inARoom ? "grayscale" : "","h-[16px]")}/>     
              <div className="pointer-events-none absolute bottom-[-18px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">leave room</div>               
            </button>
            <button className="relative group cursor-pointer w-fit focus:outline-none" type="button" onClick={()=>handleInviteUsers()}>
              <img src={inviteIcon} className={clsx(!inARoom ? "grayscale" : "","h-[16px]")}/>     
              <div className="pointer-events-none absolute bottom-[-18px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">invite users</div>               
            </button> 
          </div>
          <div className={clsx("w-full flex-1 flex items-center justify-center relative  shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_#000]",
            theme === "retro-future" && "bg-[#F15A24]",
            theme === "terminal" && "bg-[#000]",
            theme === "vaporwave" && "bg-[#131432]",
            ["pixel-art","weirdcore","default"].includes(theme) && "bg-[white]")}
          >
            <div className="w-[99%] h-[96%] flex items-center justify-center ">
              <textarea
                id="TextArea"
                name="message"
                required
                noValidate
                spellCheck="false"
                placeholder="start typing your message here! use the send button in the toolbar above to send your message!"
                className={clsx("focus:outline-none resize-none box-border w-full h-full overflow-y-auto pt-[2px]",
                  size,
                  theme === "retro-future" && "font-[Atomic_Age]",
                  theme === "vaporwave" && "font-[Syncopate] text-[#D81D76]",
                  theme === "weirdcore" && "font-[Comic_Neue]",
                  theme === "terminal" && "font-[Inconsolata] text-[#22F417]",
                  theme === "pixel-art" && "font-[Tiny5]"
                )}
              />
            </div>
            
          </div>
        </div> 
      </div>
    </form>
  )
}