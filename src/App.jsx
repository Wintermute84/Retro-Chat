import { useState, useEffect } from 'react'
import SetProfile from './profile.jsx'
import LoadingScreen from './loading.jsx'
import ChatArea from './chat.jsx'
import socket from "./socket.js"

function App() {
  
  let userData = JSON.parse(localStorage.getItem("userData")) || {}   //get the userprofile info from loc storage.
                                                                      //returns empty object otherwise
  
  const isObjectEmpty = (objectName) => {   //func to check if object is empty                            
      return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
      );
    };

  const[isConnected,setIsConnected] = useState(false)  
  const[userProfile,setUserProfile] = useState(userData)
  const[users,setUsers] = useState({})
  const[invite,setInvite] = useState({})
  const[popups,setPopups] = useState(false)

    //useStates got way outta hand

  let {userName,palette} = userProfile

  useEffect(()=>{   //use effect that runs only after the userProfile is set by the user
    if (isObjectEmpty(userProfile)) return

    function handleConnect(){
      setTimeout(() => {
        socket.emit("set-username", userName);    //sets username in the server to teh corresponding socket id
        {!isConnected && socket.emit("announce-arrival")} //announces arrival to the server once user connects
        setIsConnected(true);  
      }, 3000); //timeout of 3s so that people can stare at a fake retro loading screen :/
    };

    socket.on("connect", handleConnect); 

    if (socket.connected && !isConnected) {
      handleConnect();
    }

    return () => socket.off("connect")
  },[userProfile])

  useEffect(()=>{                             //use effect that handles operations once user gets disconnects 
    if (isObjectEmpty(userProfile)) return
      socket.on("disconnect",()=>{
          setIsConnected(false)
      })
  return () => socket.off("disconnect")
},[userProfile])
  
 function handleUserSettings(userData){ //handles initial user profile settings
  localStorage.setItem("userData",JSON.stringify(userData))
  setUserProfile(userData)
  console.log(userData)
 }

 function handleUserProfileUpdate(userData){  //handles user profile changes after connection is set to true
  localStorage.setItem("userData",JSON.stringify(userData)) //sets userprofile data to local storage
  setUserProfile((prevState) => ({...prevState, //everything except userName gets updated in state 
    palette:userData.palette,                    //username is not updated until user reconnects  
    theme:userData.theme,
    fontSize:userData.fontSize
  }))
  setPopups(true)
 }
 
 function handlePopups(){   //toggles popups (mainly the popup on the settings applied tab)
  setPopups(prevState => !prevState)
 }

  useEffect(() => {   //useEffect to listen for calls regarding lobby-users
    if (isObjectEmpty(userProfile)) return
    
    socket.on("lobby-users", (users) => {
      setUsers(users)   //sets user info which is received from server whenever anyone joins or disconnects
    });
    return () => socket.off("lobby-users");
  }, [userProfile]);

  useEffect(() => {     //handles invitations to private rooms 
    if (isObjectEmpty(userProfile)) return
    
    socket.on("invitation", (invitation) => {
      setInvite(invitation)
    });
    return () => socket.off("invitation");
  }, [userProfile]);

  function toggleInvite(){  //toggle for setting invite to empty after declining an invite
    setInvite({})
  }

 return (
  <div style={{backgroundColor:palette}} className="flex h-screen items-center justify-center">

    {             
      isObjectEmpty(userProfile) ? (      //shows userProfile tab if it's the users first time
        <SetProfile toggle={(userData)=>{ 
          handleUserSettings(userData)
        }} />
      ) : (!isConnected || isObjectEmpty(users)) ? (  //returns loading screen once user profile is set
        <LoadingScreen />
      ) : (                                   //returns chatarea after connection is established (isConnected set to true)
        <ChatArea userData={userProfile} socketId={socket.id} invitation={invite} toggleInvite={toggleInvite} togglePopups={handlePopups} popups={popups}  users={users} toggle={(userData)=>{
          handleUserProfileUpdate(userData)
        }} />
      )
    }

  </div>
)}

export default App
