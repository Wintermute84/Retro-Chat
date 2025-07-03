export default function ChatHeader(props){    //chat header duhhh..
  return (
    <>
       <div className="text-white dialog-window select-none shadow-inherit text-[0.75rem] font-bold">
                Retro Chat
        </div>

        <div className="flex gap-1 text-[0.7rem] p-[2px]">
          <span className=" select-none hover:bg-[#000080] hover:text-white cursor-pointer p-[3px]" onClick={()=>props.toggle("profile")}>
            <u>P</u>rofile  
          </span>
          
          <span className="select-none hover:bg-[#000080] hover:text-white cursor-pointer p-[3px]" onClick={()=>props.toggle("people")}>
            <u>P</u>eople
          </span>
          
          <span className="select-none hover:bg-[#000080] hover:text-white cursor-pointer p-[3px]" onClick={()=>props.toggle("help")}>
            H<u>e</u>lp
          </span>

          <span className="select-none hover:bg-[#000080] hover:text-white cursor-pointer p-[3px]" onClick={()=>props.toggle("about")}>
            <u>A</u>bout
          </span>

        </div>

        <div className="w-full border-y-[1px] border-t-[rgb(128_128_128)] border-b-white mb-[2px]"></div>
    </>
  )
}