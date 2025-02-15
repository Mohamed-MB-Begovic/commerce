import {Link} from 'react-router-dom'
export default function HeroSection() {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="1000"
      className="h-[82vh]  mt-5 flex flex-col-reverse md:flex-row justify-center md:space-x-[12rem] items-center px-4 md:px-10"
    >
      {/* content div */}
      <div className=" md:ml-20 text-center md:text-left">
        <h2 className="font-bold text-[2rem] md:text-[3rem] uppercase font-sans">
          be the best of <span className="text-orange-400">you</span>
        </h2>
        <p className="w-full md:w-[400px] text-[1.2rem] md:text-[1.5rem] mx-auto md:mx-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem! Ipsum, accusamus!
        </p>
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9 items-center justify-center md:justify-start">
          <Link to="/user/about" className="bg-orange-300 p-2 font-medium shadow-lg rounded-sm w-[140px] md:w-auto">
           {/* <Link "> */}
           About Us 
           {/* </Link> */}
          </Link>
          <button onClick={()=>{
           window.scrollTo({
            top:650,
            behavior:"smooth"
          })
            console.log('object')
          }}className="p-2 shadow-lg border rounded-sm font-medium hover:bg-orange-300 transition duration-200 w-[140px] md:w-auto">
            View More
          </button>
        </div>
      </div>
      {/* image div */}
      <div>
        <img
          src="./e-commerce-girl.png"
          alt="hero img"
          className="h-[40vh] md:h-[70vh] object-contain"
        />
      </div>
    </div>
  );
}
