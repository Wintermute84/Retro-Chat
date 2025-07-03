import ChatHeader from "./chatHeader.jsx"
import ChatLog from "./chatLog.jsx"
import ChatOptions from "./chatOptions.jsx"
import socket from "./socket.js"
import Settings from "./userSettings.jsx"
import { useState, useEffect} from "react";
import {Howl} from "howler"
import soundeffects from "./assets/soundeffects/ding.mp3"
import importantIcon from "./assets/general/important.png"

export default function ChatArea({userData,popups,toggle,users,socketId,invitation,toggleInvite,togglePopups}){

var sound = new Howl({
    src: [soundeffects],
    volume:0.01
  });

  const [messages, setMessages] = useState([]);   
  const [showSettings, setShowSettings] = useState(false)
  const [soundefx,setSoundefx] = useState(false)

  const isObjectEmpty = (objectName) => {
      return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
      );
    };

  useEffect(() => {   //handles incoming messages
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("chat-message");
  }, []);

  useEffect(() =>{
    if(soundefx){   //play ding sound effect if sound is set true
        sound.play();
      }
  },[messages])

  
  function handleShowSettings(props){     //used for handling different tabs in the settings tab
    if(props === 'close') {
      setShowSettings({show:false,setting:""})
      if(popups){
        togglePopups()
      }}
    else{ 
      setShowSettings({show:true,setting:props})
    }
  }

  function toggleSoundefx(){
    setSoundefx(prev=>!prev)
  }

  function handleInvitation(result){    //used for handling Invitation to private rooms
    if(result === 'Yes'){
      socket.emit("join-room",users[invitation.host].currentRoom)
    }
    toggleInvite()
  }

  function Invite(){    //invite popup which gets displayed when the user receives an invite
     if(Object.hasOwn(users,invitation.host)){
       return(
        <div className="w-[fit] p-[3px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] absolute left-[15%] right-[15%] top-[35%]">
          <header className="text-white dialog-window shadow-inherit text-[0.75rem] font-bold flex items-center justify-between">
            <p className="select-none">Invitation</p>
          </header>
          <div className="p-4">
            <div className='flex flex-col items-center'>
              <div className="flex items-center gap-[5px]">
                <img src={importantIcon} className='h-[64px]'/>
                <p className="text-gray-800 text-[0.7rem]">
                  You have received an invitation to join a private room from user {users[invitation.host].userName}. Do you wish to accept this invitaiton?
                </p>
              </div>
              <div className="flex gap-3">
                <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>{handleInvitation('Yes')}}>Yes</button>
                <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>{handleInvitation('No')}}>No</button>
              </div>  
            </div>
          </div>
        </div>
      )}
    }


  return(
    <div className="w-[680px] p-[3px] pr-[5px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] relative">
      <ChatHeader toggle={handleShowSettings} /> 
      <ChatLog messages={messages} userData={userData}/>
      <ChatOptions userData={userData} users={users} toggle={handleShowSettings} toggleSound={toggleSoundefx} sound={soundefx}/>
      { showSettings.show && <Settings toggle={handleShowSettings} userData={userData} togglePopups={togglePopups} popups={popups} setting={showSettings.setting} setUserSettings={toggle} users={users} socketId={socketId}/> }
      {!isObjectEmpty(invitation) && Object.hasOwn(users,invitation.host) && <Invite />}
    </div>
  )
}