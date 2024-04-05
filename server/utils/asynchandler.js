const  asynchandler =   (func) =>  async(req, resp , next) =>{
    try {
      return await  func(req,resp , next)
    } catch (error) {
        throw error ; 
    }
}



export  default asynchandler ; 
