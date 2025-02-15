/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom'

const RelatedProducts = ({ products }) => {
  return (
    <div className="container mx-auto my-12 px-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-68 object- object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-lg text-gray-600 mt-2">${product.price}</p>
              <Link to={`/user/product/${product._id}`} >
              <button   className="mt-4 w-full py-2 border border-lg text-black font-semibold rounded-md hover:bg-gray-300 transition duration-200">
                View Details
              </button>
              </Link >
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
