/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

export default function Collections() {
  return (
    <section
      className="px-4 md:px-20 mt-14"
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="1000"
    >
      <h2 className="text-center font-medium font-sans text-[1.3rem] mb-4">
        <span className="text-orange-400">C</span>ollections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
        <div className="flex relative">
          <img
            src="./footware.jpg"
            alt="Footwear"
            className="relative overflow-hidden w-full"
          />
          <div className="absolute top-10 left-4 text-black">
            <h3 className="font-semibold text-lg">FOOTWEAR</h3>
            <Link to="/user/collections" className="text-blue-300">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex relative">
          <img
            src="./accessories.jpg"
            alt="Accessories"
            className="relative overflow-hidden w-full"
          />
          <div className="absolute top-10 left-4 text-black">
            <h3 className="font-semibold text-lg">ACCESSORIES</h3>
            <Link to="/user/collections" className="text-blue-300">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex relative">
          <img
            src="./mens.jpg"
            alt="Men's"
            className="relative overflow-hidden w-full"
          />
          <div className="absolute top-10 left-4 text-black">
            <h3 className="font-semibold text-lg">MEN'S</h3>
            <Link to="/user/men" className="text-blue-300">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex relative">
          <img
            src="./womens.jpg"
            alt="Women's"
            className="relative overflow-hidden w-full"
          />
          <div className="absolute top-10 left-4 text-black">
            <h3 className="font-semibold text-lg">WOMEN'S</h3>
            <Link to="/user/womens" className="text-blue-300">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
