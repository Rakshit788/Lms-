import Homelayout from "./Homelayout"


function  ChangePassword(){

    return (
    <Homelayout>
     <div className=" flex  flex-col  gap-4 shadow-lg w-[300px] h-[350px] shadow-lg mx-auto mt-[80px] ">

        <div className=" flex flex-col">
            <label htmlFor="oldpass"> Old Password </label>
            <input type="password" id="oldpass" className=" border-[1px] mt-[4px]  border-black w-[90%]" />
        </div>
        <div className=" flex flex-col">
            <label htmlFor="newpass"> New  Password </label>
            <input type="password" id="newpass"  className=" border-[1px] mt-[4px]  border-black w-[90%]" />
        </div>

        <div>
            <button className=" mt-[5px]  bg-yellow-300 text-white hover:bg-yellow-500  mx-[70px] rounded-[26px] w-[136px] h-[43px]">Change password</button>
        </div>
        

     </div>
    </Homelayout>
  
    )
}




export  default ChangePassword