import PaymentIcon from '../components/Icons/PaymentIcon';
import SupportIcon from '../components/Icons/SupportIcon';
import Return from '../components/Icons/Return';
import MailIcon from '../components/Icons/MailIcon';

export default function Newsletter() {
  return (
    <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
      {/* Subscribe Section */}
      <div
        className="bg-cover bg-center h-80 mt-10 w-[90%] lg:w-[70%] mx-auto rounded-lg flex flex-col items-center"
        style={{ backgroundImage: 'url(./b-3.jpeg)' }}
      >
        <MailIcon />
        <h3 className="text-xl md:text-2xl font-bold text-white mt-6 md:mt-10 text-center">
          SUBSCRIBE FOR OUR NEWSLETTER
        </h3>
        <p className="text-white mb-4 text-center text-sm md:text-base">
          Learn about new offers and get more deals by joining our newsletter
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            type="email"
            className="p-2 rounded-sm w-[90%] md:w-96 outline-none text-sm"
            placeholder="Enter your Email Address"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-9 w-[90%] lg:w-[70%] mx-auto mt-10"
      >
        <div className="flex items-center gap-5">
          <PaymentIcon />
          <div>
            <h4 className="font-semibold text-sm md:text-base">
              Payment & Delivery
            </h4>
            <p className="text-sm">Free shipping for orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Return />
          <div>
            <h4 className="font-semibold text-sm md:text-base">
              Return & Refund
            </h4>
            <p className="text-sm">Free 100% money-back guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <SupportIcon />
          <div>
            <h4 className="font-semibold text-sm md:text-base">
              Quality Support
            </h4>
            <p className="text-sm">Always online feedback 24/7</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <MailIcon />
          <div>
            <h4 className="font-semibold text-sm md:text-base">
              Join our Newsletter
            </h4>
            <p className="text-sm">
              10% off by subscribing to our newsletter
            </p>
          </div>
        </div>
      </div>

      {/* Instagram Store */}
      <div
        className="mt-20 w-[90%] lg:w-[70%] mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        <h2 className="text-center font-medium font-sans text-[1.2rem] md:text-[1.4rem] mb-10">
          <span className="text-orange-400">I</span>nstagram{' '}
          <span className="text-orange-400">S</span>tore
        </h2>
        <div 
         data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
             className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-2">
          <img
            src="./banner-1.jpg"
            alt="Instagram 1"
            className="w-full h-auto"
           
          />
          <img
            src="./banner-7.jpg"
            alt="Instagram 1"
            className="w-full h-auto"
             
          />
          <img
            src="./banner-4.jpg"
            alt="Instagram 1"
            className="w-full h-auto col-span-2 lg:col-span-1"
            
          />
          <img
            src="./banner-3.jpg"
            alt="Instagram 1"
            className="row-span-2 col-span-2 h-full w-full object-cover"
            
          />
          <img
            src="./banner-8.jpg"
            alt="Instagram 1"
            className="w-full h-auto"
            
          />
          <img
            src="./banner-9.jpg"
            alt="Instagram 1"
            className="w-full h-auto"
            
          />
          <img
            src="./b-3.jpeg"
            alt="Instagram 2"
            // className="h-full object-cover w-full"
            className="w-full h-[100%] object-cover col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </div>
  );
}
