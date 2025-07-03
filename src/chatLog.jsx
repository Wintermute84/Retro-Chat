import img1 from "./assets/sidebar-images/art1.jpg"
import {nanoid} from "nanoid"
import { useRef ,useEffect} from "react"
import clsx from "clsx"

export default function ChatLog({messages,userData}){
  
  let {theme,fontSize} = userData
  const size = clsx(fontSize === "medium" && "text-sm",
                    fontSize === "default" && "",
                    fontSize === "large" && "text-xl"
                  )

  const chatlog = messages.map((message) => {
    const user = clsx((theme === "default" || theme === "weirdcore" || theme === "pixel-art") && clsx({
      system: message.systemMessage,
      user: !message.systemMessage,
    }),'text-message',
    theme === "retro-future" && "text-[#F0DCA0]",
    theme === "vaporwave" && "text-[#E75E4C]",
    theme === "terminal" && "text-[#12820C]"
  )
    
    return (
      <p className={
        clsx("p-1 font-[400] overflow-hidden",
              size,
              theme === "retro-future" && "font-[Atomic_Age]",
              theme === "vaporwave" && "font-[Syncopate] text-[#D81D76]",
              theme === "weirdcore" && "font-[Comic_Neue]",
              theme === "terminal" && "font-[Inconsolata] text-[#22F417]",
              theme === "pixel-art" && "font-[Tiny5]"
        )} 
        key={nanoid()}>
        <span className={user}>{message.user}:</span>
        {message.text}
      </p>
    )
  })

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return(
    <div className="w-[99%] flex h-[200px] m-1 gap-1">
      <img src={img1} className="w-[104px]"/>
      <div className={
        clsx("flex-1 h-min-[90%] h-max-[96%] w-max-full flex items-center justify-center  border-none shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray,inset_-2px_-2px_silver,inset_2px_2px_#000]  box-border overflow-y-auto break-words",
            theme === "retro-future" && "bg-[#F15A24]",
            theme === "terminal" && "bg-[#000]",
            theme === "vaporwave" && "bg-[#131432]",
            ["pixel-art","weirdcore","default"].includes(theme) && "bg-[white]"
        )}>
        <div className="w-[99%] h-[98%] bg-inherit box-border overflow-y-auto break-words">
          
        {chatlog}
        <div ref={scrollRef}></div>
      </div>

      </div>
    </div>
  )
}