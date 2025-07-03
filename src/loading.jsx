import networkIcon from './assets/general/network-icon.png'

export default function LoadingScreen(){    //loading screen comp duhh
  return(
    <div className="w-[360px] p-[3px] bg-[#C0C0C0] border-none shadow-[inset_-1px_-1px_#000,inset_1px_1px_silver,inset_-2px_-2px_gray,inset_2px_2px_#fff]">
      <div className="text-white dialog-window shadow-inherit text-[0.75rem] font-bold">
        Connecting to Server...
      </div>
      <div className="p-4">
        <div className='flex gap-[5px] items-center'>
          <img src={networkIcon} className='h-[70px]'/>
          <p className="text-gray-800 text-[0.7rem] text-wrap">
            Please wait while the connection is being established.
          </p>
        </div>
        
        <div className="w-[95%] h-4 overflow-hidden relative mt-1 mx-auto bg-[#C0C0C0] shadow-[inset_-1px_-1px_#fff,inset_1px_1px_gray]">
          <div className="absolute h-full w-1/3 bg-[#010683] animate-loaderBar" />
        </div>
      </div>
    </div>
  )
}