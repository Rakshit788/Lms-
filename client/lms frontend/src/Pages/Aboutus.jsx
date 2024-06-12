import Homelayout from "./Homelayout"

function Aboutus() {

    return (
        <Homelayout >
            <div className="flex flex-col w-full align-middle gap-20 ">
                <div className="flex flex-row  gap-16 mt-20 ">
                    <div className="flex flex-col w-[50%] items-center ml-11 mt-9">
                        <h1 className=" text-orange-500 font-semibold text-[50px]">Abot US </h1>
                        <p className="text-white text-[20px] ">
                            Welcome to [Company Name]! We're dedicated to offering high-quality online courses designed to help you excel. Our diverse range of programs, led by industry experts, ensures you acquire valuable skills for success. Join our community of learners today and unleash your potential with us!</p>
                    </div>

                    <img src="https://tse3.mm.bing.net/th?id=OIP.TzYqUOdoZZdGwU9S_tMuOQHaGY&pid=Api&P=0&h=220" className=" rounded-xl mt-2  shadow-lg text-pink-400" alt="" />
                </div>
                <div className="carousel w-[400px] h-[200px] ml-[220px]">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://1.bp.blogspot.com/-kcqAjYGtiBw/VDD3RtilhFI/AAAAAAAAFFE/Di2g-xKuK5w/s1600/steve.jpg" className="w-[50%] mx-auto rounded-full"   />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://4.bp.blogspot.com/-ZRs4iVyifv8/TrFc5YIlIMI/AAAAAAAABGA/8dHeb3GqQqQ/s1600/Dr+A+P+J+Abdul+Kalam%252C+former+Indian+President.jpg" className="w-[50%px] rounded-full  mx-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="http://www.thefamouspeople.com/profiles/images/elon-musk-1.jpg" className="w-[50%] mx-auto rounded-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-[50%] mx-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
            </div>
        </Homelayout>
    )
}

export default Aboutus