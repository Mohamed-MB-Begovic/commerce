import { BriefcaseIcon, GlobeAltIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/outline';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Redefining Online Shopping
            </h1>
            <p className="text-xl text-indigo-200 mb-8">
              Where Quality Meets Convenience
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2015, SomCom began as a small team of passionate individuals 
                determined to transform the online shopping experience. What started as 
                a modest marketplace has blossomed into a trusted destination for 
                millions of customers worldwide.
              </p>
              <p className="text-gray-600">
                We pride ourselves on curating exceptional products while maintaining 
                the highest standards of customer service. Our commitment to innovation 
                and sustainability drives every decision we make.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f" 
                alt="Our team working"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <BriefcaseIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10M+</h3>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <GlobeAltIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <UserGroupIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">2M+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders driving innovation and excellence at LuxeCart
            </p>
          </div>
          <div 
  className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-center justify-center  text-center gap-8 p-4"
>
  <div className=" bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <img 
      src="/ceo.jpeg" 
      alt="Team member"
      className="w-full h-74 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">Mohamed MB</h3>
      <p className="text-indigo-600 mb-2">CEO & Founder</p>
      <p className="text-gray-600 text-sm">
        15+ years experience in e-commerce and technology
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">LinkedIn</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">Twitter</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">Facebook</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.337v21.326C0 23.4.599 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116c.726 0 1.325-.6 1.325-1.337V1.337C24 .6 23.401 0 22.675 0z"/>
</svg>

        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">WhatsApp</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M17.472 14.382c-.297-.149-1.758-.868-2.028-.968-.27-.099-.47-.148-.67.149-.197.297-.768.968-.942 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-0.347.446-0.52.149-0.174.198-0.297.298-0.495.099-0.198.05-0.371-.025-0.52-.075-0.149-.67-1.611-.92-2.206-.242-0.579-.487-0.5-.67-0.51-0.174-0.008-0.371-0.01-0.57-0.01-0.198 0-0.52 0.074-0.79 0.371-0.27 0.297-1.03 1.005-1.03 2.449 0 1.443 1.055 2.834 1.203 3.034.149 0.198 2.095 3.2 5.077 4.487 0.709 0.306 1.262 0.489 1.694 0.625 0.712 0.227 1.36 0.195 1.87 0.118 0.57-0.085 1.758-0.718 2.006-1.411 0.248-0.694 0.248-1.287 0.173-1.411-.074-0.123-0.27-0.198-0.567-0.347zM12.004 2C6.477 2 2 6.477 2 12.004c0 2.108 0.553 4.096 1.524 5.83L2 22l4.293-1.523C7.934 21.446 9.936 22 12.004 22c5.527 0 10.004-4.477 10.004-10.004C22.008 6.477 17.531 2 12.004 2z" />
</svg>

        </a>
      </div>
    </div>
  </div>

  <div className=" bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <img 
      src="/ceo-2.jpeg" 
      alt="Team member"
      className="w-full h-74 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">Sulieman Salpa</h3>
      <p className="text-indigo-600 mb-2">CEO & Founder</p>
      <p className="text-gray-600 text-sm">
        15+ years experience in e-commerce and technology
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">LinkedIn</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">Twitter</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">Facebook</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.337v21.326C0 23.4.599 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116c.726 0 1.325-.6 1.325-1.337V1.337C24 .6 23.401 0 22.675 0z"/>
</svg>

        </a>
        <a href="#" className="text-gray-400 hover:text-indigo-600">
          <span className="sr-only">WhatsApp</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M17.472 14.382c-.297-.149-1.758-.868-2.028-.968-.27-.099-.47-.148-.67.149-.197.297-.768.968-.942 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-0.347.446-0.52.149-0.174.198-0.297.298-0.495.099-0.198.05-0.371-.025-0.52-.075-0.149-.67-1.611-.92-2.206-.242-0.579-.487-0.5-.67-0.51-0.174-0.008-0.371-0.01-0.57-0.01-0.198 0-0.52 0.074-0.79 0.371-0.27 0.297-1.03 1.005-1.03 2.449 0 1.443 1.055 2.834 1.203 3.034.149 0.198 2.095 3.2 5.077 4.487 0.709 0.306 1.262 0.489 1.694 0.625 0.712 0.227 1.36 0.195 1.87 0.118 0.57-0.085 1.758-0.718 2.006-1.411 0.248-0.694 0.248-1.287 0.173-1.411-.074-0.123-0.27-0.198-0.567-0.347zM12.004 2C6.477 2 2 6.477 2 12.004c0 2.108 0.553 4.096 1.524 5.83L2 22l4.293-1.523C7.934 21.446 9.936 22 12.004 22c5.527 0 10.004-4.477 10.004-10.004C22.008 6.477 17.531 2 12.004 2z" />
</svg>

        </a>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <HeartIcon className="h-12 w-12 text-indigo-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Customer Obsession</h3>
              <p className="text-gray-600">
                We start with the customer and work backwards. Your satisfaction 
                drives our innovation and service excellence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <GlobeAltIcon className="h-12 w-12 text-indigo-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Committed to eco-friendly practices and ethical sourcing. We aim 
                to leave the planet better than we found it.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <BriefcaseIcon className="h-12 w-12 text-indigo-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries to deliver cutting-edge solutions 
                and exceptional shopping experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Be part of our journey to redefine online shopping. Sign up for exclusive 
            updates and special offers.
          </p>
          <div className="max-w-md mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;