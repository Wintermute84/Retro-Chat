import clsx from "clsx"
import {generateUsername} from "unique-username-generator"
import { useState } from "react"
import inviteIcon from "./assets/input-options/invite.png"
import importantIcon from "./assets/general/important.png"
import { nanoid } from "nanoid"
import socket from "./socket.js";

export default function Settings(props){      ///way too big of a comp
  
  const[invitePopup,setInvitePopup] = useState(false)
  function toggleInvitePopup(show){
      setInvitePopup(show)
    }
  

  function Profile(){
    const[userProfile,setUserProfile] = useState(props.userData)  

    function handleSubmit(formData){
      let data = {userName : formData.get("userName"),
            palette : formData.get("palette"),
            theme : formData.get("theme"),
            fontSize: formData.get("fontSize")
          }                  
          props.togglePopups()
          props.setUserSettings(data)
     }
  
    function returnRandomName(){
      setUserProfile(prev => ({...prev,userName:generateUsername("_",1,15)}))
    }

    function handleUserProfile(event){
      const {name,value} = event.currentTarget
      setUserProfile(prev =>({
        ...prev,
        [name] : value
      }))
    }

    function SettingsAppliedPopup(){    //settings applied comp on pressing apply on the settings tab
      return(
        <div className="w-[fit] p-[3px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] absolute left-[1%] top-[25%]">
              <header className="text-white dialog-window shadow-inherit text-[0.75rem] font-bold flex items-center justify-between">
                <p className="select-none">Settings</p>
                <button 
                  className="mr-1 cursor-pointer text-black bg-[#C0C0C0] px-[6px]  shadow-[inset_-1px_-1px_#000,inset_2px_1px_white,inset_-2px_-2px_gray,inset_2px_2px_#C0C0C0] text-[10px]"
                  onClick={()=>props.togglePopups()}
                >
                  X
                </button>
              </header>
              <div className="p-4">
                <div className='flex flex-col items-center'>
                  <div className="flex items-center gap-[5px]">
                    <img src={importantIcon} className='h-[64px]'/>
                    <p className="text-gray-800 text-[0.7rem]">
                      User settings successfully applied! Some settings may require you to reconnect to fully apply.
                    </p>
                  </div>
                  <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>props.togglePopups()}>OK</button>
                </div>
              </div>
        </div>
      )
    }

    return( //again with the weird form thingy
      <form action={handleSubmit} className="relative"> 
        {props.popups && props.setting === "profile" && <SettingsAppliedPopup />}        
        <div className="flex gap-2 items-center">
            <label className="m-4 text-xs"><u>U</u>sername:<input type="text" maxLength="15"  onChange={handleUserProfile}  value={userProfile.userName} name="userName" required className="bg-white shadow-[inset_-1px_-1px_white,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_black] p-1 ml-[2px] focus:outline-none"/></label>
          <button className="text-xs shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] w-fit h-fit p-1 px-2 cursor-pointer" onClick={returnRandomName} type="button">R<u>a</u>ndomize</button>
        </div>
        
        <fieldset className="border-[1px] border-[#808080] border-r-[white] border-b-[white] bg-[#C0C0C0] h-fit m-4 p-4 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] w-[350px]">
          <legend className="text-xs font-[MS_Sans_Serif] px-1  bg-[#C0C0C0] w-fit h-fit">Color Palette</legend>
          <select value={userProfile.palette} onChange={handleUserProfile}  name="palette" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none">
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="#008282">Default(Teal)</option>
            <option value="#800080">Purple</option>
            <option value="#000080">Navy</option>
            <option value="#800000">Maroon</option>
            <option value="#000000">Black</option>                        
            <option value="#C0C0C0">silver</option>
          </select>
        </fieldset>
        
        <fieldset className="border-[1px] border-[#808080] border-r-[white] border-b-[white] bg-[#C0C0C0] h-fit m-4 p-4 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] w-[350px]">
          <legend className="text-xs font-[MS_Sans_Serif] px-1  bg-[#C0C0C0] w-fit h-fit">Font Size</legend>
          <select value={userProfile.fontSize} onChange={handleUserProfile} name="fontSize" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none ">
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="default">Default</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
          </select>
        </fieldset>
        
        <fieldset className="border-[1px] border-[#808080] border-r-[white] border-b-[white] bg-[#C0C0C0] h-fit m-4 p-4 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] w-[350px]">
          <legend className="text-xs font-[MS_Sans_Serif] px-1  bg-[#C0C0C0] w-fit h-fit">Theme</legend>
          <select value={userProfile.theme} onChange={handleUserProfile} name="theme" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none ">
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="default">Default</option>
            <option value="vaporwave">Vaporwave</option>
            <option value="weirdcore">Weirdcore</option>
            <option value="terminal">Terminal</option>
            <option value="retro-future">Retro Future</option>
            <option value="pixel-art">Pixel Art</option>
          </select>
        </fieldset> 
        <div className="absolute right-[0px] bottom-[-55px] flex gap-2">
          <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="submit"><u>A</u>pply</button>
          <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>props.toggle('close')}>OK</button>
        </div>                      
      </form>
    )
  }


  function Help(){
    return (
      <div className="w-[90%] h-[90%] text-[0.9rem] p-2 border-[1px] bg-[#FFFFE7] border-[#808080] border-r-[white] border-b-[white] shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] m-auto overflow-y-auto">
        <p className="block mb-1">Hey there! This is short guide on how to use retro-chat.</p>
        <p className="block mb-1">
          First things first, you can start typing your message on the little text area at the bottom of the main window. 
          To send your message, you'll have to click the little 'message' icon in the toolbar right above the text area.
        </p>
        <p className="block mb-1">
          You can also join/create private rooms by clicking the appropriate button on the toolbar. By doing so, your messages can only be seen by users in the room.
        </p>
        <p className="block mb-1">  
          You can invite other users to the room by either clicking the invite button on the toolbar or by navigating to the people section of the settings tab.
        </p>
        <p className="block mb-1">
          You can also leave the private room and return to the lobby at any time by pressing the leave room icon on the toolbar.
        </p>
        <p className="block mb-1">
          To customize your user experience, you can set a variety of options in the profile section of the settings tab. Changes to usernames will only be reflected once you disconnect and then reconnect back to the retro-chat lobby.
        </p>
      </div>
    )
  }

  function About(){
    return (
      <div className="w-[90%] h-[90%] text-[0.9rem] p-2 border-[1px] bg-[#FFFFE7] border-[#808080] border-r-[white] border-b-[white] shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] m-auto overflow-y-auto">
        <p className="block mb-1">Retro-Chat was a little project I did over the summer to learn React & Tailwindcss for the first time.</p>
        <p className="block mb-1">
          This project takes heavy inspo from the AOL/IM era chat applications of the early 2000's. 
          While it's more or less a novelty these days, for a while these chat applications along with retro forums were the only way to meet genuinely cool people from all over the world on the internet.
          Applications like AOL and IM walked so that something like Discord could run and it was really fun designing and making everything look and feel like one of those old chat apps.
        </p>
        <p className="block mb-1">
          The project also takes heavy inspo from late nineties to early noughties windows designs, especially windows 95.
          A lot of the assets were taken from preservation sites such as <a target="_blank" className="text-[#653379] underline" href="https://winclassic.github.io/resources">this.</a>
        </p>
        <p className="block mb-1">  
          <a href="https://github.com/Wintermute84/Retro-Chat/blob/main/src/userSettings.jsx" className="text-[#653379] underline">Link to the github repo</a>
        </p>
      </div>
    )
  }

  function People(){  //people tab in the settings comp
    
    function InviteSentPopup(){    //settings applied comp on pressing apply on the settings tab
      return(
        <div className="w-[350px] p-[3px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] z-10 absolute top-[15%]">
              <header className="text-white dialog-window shadow-inherit text-[0.75rem] font-bold flex items-center justify-between">
                <p className="select-none">Settings</p>
                <button 
                  className="mr-1 cursor-pointer text-black bg-[#C0C0C0] px-[6px]  shadow-[inset_-1px_-1px_#000,inset_2px_1px_white,inset_-2px_-2px_gray,inset_2px_2px_#C0C0C0] text-[10px]"
                  onClick={()=>toggleInvitePopup(false)}
                >
                  X
                </button>
              </header>
              <div className="p-4">
                <div className='flex flex-col items-center'>
                  <div className="flex items-center gap-[5px]">
                    <img src={importantIcon} className='h-[64px]'/>
                    <p className="text-gray-800 text-[0.7rem]">
                      Invitation successfully sent to user!  
                    </p>
                  </div>
                  <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>toggleInvitePopup(false)}>OK</button>
                </div>
              </div>
        </div>
      )
    }


    let currentUserRoom = props.users[props.socketId].currentRoom

    function handleInvite(userSocket){  //handles the invites
      socket.emit("invite-user",{socketId:userSocket,invitedRoom:currentUserRoom})
      toggleInvitePopup(true)
    }

    function LobbyUsers({userInfo,user}){ //comp for displaying lobby users
      return(   //will only contain an invite user option if the sender is in a private room themselves
        <div className="flex justify-between items-center p-1">
              <p>{userInfo.userName}</p>
            
              {!user && currentUserRoom!=="lobby" && <button onClick={()=>{
                handleInvite(userInfo.socketId)
              }} 
                  className="relative group mr-2 cursor-pointer bg-[#C0C0C0] w-[30px] h-[25px] flex items-center justify-center  shadow-[inset_-1px_-1px_#000,inset_2px_1px_silver,inset_-1px_-1px_gray,inset_1px_1px_#C0C0C0]" type="button" >
                <img src={inviteIcon}  />
                <div className="pointer-events-none absolute bottom-[-18px] left-[-100px] opacity-0 group-hover:opacity-100 w-fit text-nowrap transition-opacity duration-150 bg-[#FFFFE7] text-[9px] font-[Verdana] border-[1px] p-[1px] border-black">invite user to private room</div>
              </button>}
        </div>
      )
    }

    function RoomUser({userInfo}){  //comp for displaying people in private rooms
      return(
        <div className="flex justify-between items-center p-1">
              <p>{userInfo.userName}</p>
        </div>
      )
    }

    
    let users = Object.entries(props.users).map(([id, user]) => {
      return {socketId:id, userName:user.userName, room:user.currentRoom}
    });
    

    let lobbyUsers = users.map((userData) => {
     if(userData.room === "lobby"){
       return <LobbyUsers userInfo={userData} key={nanoid()} user={props.socketId === userData.socketId ? true : false}/>
     }
    })

    let roomUsers = users.map((userData) => {
     if(userData.room === currentUserRoom && currentUserRoom !== "lobby"){
       return <RoomUser userInfo={userData} key={nanoid()}/>
     }
    })
    return(
      <div className="flex flex-col justify-between gap-8 items-center relative">
        
        {invitePopup && <InviteSentPopup />}

        <div className="w-[360px] h-[150px] relative flex items-center justify-center bg-white shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_#000]">
          <p className="absolute top-[-20px] left-[2px] text-sm">Lobby Users:</p>
          <div className="w-[98%] h-[96%]  box-border overflow-y-auto break-words">
            {lobbyUsers}
          </div>
        </div>

        <div className="w-[360px] h-[150px] relative flex items-center justify-center bg-white shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_#000]">
          <p className="absolute top-[-20px] left-[2px] text-sm">Private Room Users:</p>
          <div className="w-[98%] h-[95%] box-border overflow-y-auto break-words">
            {roomUsers}
          </div>
        </div>

      </div>
      
    )
  }
  
  return( //returns the settings window
    <div className="w-[430px] h-[500px] p-[3px] pr-[5px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] absolute top-[-5%] left-[20%]">
      
      <header className="text-white bg-[#000080] shadow-inherit text-[0.75rem] font-bold p-[3px] flex items-center justify-between">
        <p className="select-none">Settings</p>
        <button 
          className="mr-1 cursor-pointer text-black bg-[#C0C0C0] px-[6px]  shadow-[inset_-1px_-1px_#000,inset_2px_1px_white,inset_-2px_-2px_gray,inset_2px_2px_#C0C0C0] text-[10px]"
          onClick={()=>props.toggle('close')}
        >
          X
        </button>
      </header>
      <div className="w-[400px] h-[400px] bg-[#C0C0C0] mx-auto mt-[30px] shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] relative flex  justify-center flex-col">
        <div className="absolute flex top-[-19px] left-[4px]">
          <div onClick={()=>props.toggle('profile')} className={clsx(clsx("select-none cursor-pointer text-[0.7rem] font-[sans-serif] text-center flex items-center py-2 px-3 rounded-t-[3px] bg-[#C0C0C0] shadow-[inset_-1px_0px_#000,inset_1px_1px_#fff,inset_1px_1px_#fff] border-b-1 border-[#C0C0C0]"),props.setting === "profile" ? "h-[22px]" : "h-[20px]")}>
            Profile
          </div>

          <div onClick={()=>props.toggle('people')} className={clsx(clsx("select-none cursor-pointer text-[0.7rem] font-[sans-serif] text-center flex items-center py-2 px-3 rounded-t-[3px] bg-[#C0C0C0] shadow-[inset_-1px_0px_#000,inset_1px_1px_#fff,inset_1px_1px_#fff] border-b-1 border-[#C0C0C0]"),props.setting === "people" ? "h-[22px]" : "h-[20px]")}>
            People
          </div>

          <div onClick={()=>props.toggle('help')} className={clsx(clsx("select-none cursor-pointer text-[0.7rem] font-[sans-serif] text-center flex items-center py-2 px-3 rounded-t-[3px] bg-[#C0C0C0] shadow-[inset_-1px_0px_#000,inset_1px_1px_#fff,inset_1px_1px_#fff] border-b-1 border-[#C0C0C0]"),props.setting === "help" ? "h-[22px]" : "h-[20px]")}>
            Help
          </div>

          <div onClick={()=>props.toggle('about')} className={clsx(clsx("select-none cursor-pointer text-[0.7rem] font-[sans-serif] text-center flex items-center py-2 px-3 rounded-t-[3px] bg-[#C0C0C0] shadow-[inset_-1px_0px_#000,inset_1px_1px_#fff,inset_1px_1px_#fff] border-b-1 border-[#C0C0C0]"),props.setting === "about" ? "h-[22px]" : "h-[20px]")}>
            About
          </div>
          
        </div>
        {props.setting === "profile" && <Profile />}
        {props.setting === "people" && <People />}
        {props.setting === "help" && <Help />}                
        {props.setting === "about" && <About />}
        {props.setting !== "profile" && <div className="absolute right-[0px] bottom-[-30px] flex gap-2">
          <button className=" shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="button" onClick={()=>props.toggle('close')}>OK</button>
        </div>}
      </div>  
    </div>
  )
}
