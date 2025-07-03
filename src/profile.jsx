import { useState } from "react"
import {generateUsername} from "unique-username-generator"

export default function SetProfile(props){
  const[userName,setUserName] = useState(generateUsername("_",2,15))  

  function returnRandomName(){  //returns a random name duhhh
    setUserName(generateUsername("_",2,15))
  }

  function handleUserName(event){
    const {value} = event.currentTarget
    setUserName(value)
  }

  function handleSubmit(formData){    //handles results from the user profile form
    let data = {userName : formData.get("username"),
            palette : formData.get("palette"),
            theme : formData.get("theme"),
            fontSize: formData.get("font-size")
    }
    props.toggle(data)
  }
      // form contains a weird yet only way to style select element using a button and selectedcontent. look up the mdn doc for future ref
  return(
    <div className="w-[430px] h-[500px] p-[3px] pr-[5px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff]" id="mydiv">
      
      <header className="text-white bg-[#000080] shadow-inherit text-[0.75rem] font-bold p-[3px]">
        Settings
      </header>
      
      <form action={handleSubmit} className="w-[400px] h-[400px] bg-[#C0C0C0] mx-auto mt-[30px] shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] relative flex items-start justify-center flex-col">
        
        <div className=" h-[20px] absolute top-[-17px]  text-[0.7rem] font-[sans-serif] text-center left-[3px] flex items-center py-2 px-3 rounded-t-[3px] bg-[#C0C0C0] shadow-[inset_-1px_0px_#000,inset_1px_1px_#fff,inset_1px_1px_#fff] border-b-1 border-[#C0C0C0]">
          Profile
        </div>
        
        <div className="flex gap-2 items-center">
          <label className="m-4 text-xs"><u>U</u>sername:<input type="text" onChange={handleUserName} value={userName} maxLength="15" name="username" required className="bg-white shadow-[inset_-1px_-1px_white,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_black] p-1 ml-[2px] focus:outline-none"/></label>
          <button className="text-xs shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] w-fit h-fit p-1 px-2 cursor-pointer" onClick={returnRandomName} type="button">R<u>a</u>ndomize</button>
        </div>
        
        <fieldset className="border-[1px] border-[#808080] border-r-[white] border-b-[white] bg-[#C0C0C0] h-fit m-4 p-4 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white] w-[350px]">
          <legend className="text-xs font-[MS_Sans_Serif] px-1  bg-[#C0C0C0] w-fit h-fit">Color Palette</legend>
          <select name="palette" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none">
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
          <select name="font-size" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none ">
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
          <select name="theme" className="w-full text-xs font-[MS_Sans_Serif] shadow-[inset_-2px_-2px_#fff,inset_1px_1px_#808080,inset_-3px_-3px_silver,inset_3px_3px_black] bg-blue-950 p-1 text-white focus:outline-none ">
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
        
        <button className="absolute right-[0px] bottom-[-30px] shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff] text-xs p-1 px-2 w-[100px] cursor-pointer" type="submit"><u>A</u>pply</button>
      
      </form>
    
    </div>
  )
}