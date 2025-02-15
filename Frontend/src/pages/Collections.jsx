import { useEffect, useState } from "react";
import axios from "axios";
import ProductLoadingSkeleton from "../components/ProductLoadingSkeleton";
import { Link } from "react-router-dom";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState({
    men: false,
    women: false,
    kids: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) => {
      const updatedCategories = { ...prevState, [category]: !prevState[category] };
      filterByCategories(updatedCategories);
      return updatedCategories;
    });
  };

  const filterByCategories = (categories) => {
    const selectedKeys = Object.keys(categories).filter((key) => categories[key]);
    if (selectedKeys.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.subCategory.some((cat) => selectedKeys.includes(cat.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-8">
        {/* Sidebar Toggle (Small Screens) */}
        <button
          className="lg:hidden mb-4 px-4 py-2 bg-gray-800 text-white rounded-md shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } lg:block w-full lg:w-1/4 bg-white p-4 rounded-md shadow-md`}
          >
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.men}
                      onChange={() => handleCategoryChange("men")}
                    />
                    <span className="text-gray-700">Men</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.women}
                      onChange={() => handleCategoryChange("women")}
                    />
                    <span className="text-gray-700">Women</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.kids}
                      onChange={() => handleCategoryChange("kids")}
                    />
                    <span className="text-gray-700">Kids</span>
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* Products Section */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">All Collections</h2>
            </div>

            {isLoading && <ProductLoadingSkeleton />}

            <div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 -z-10"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              {filteredProducts.map((product) => (
                <Link
                  to={`/user/product/${product._id}`}
                  key={product._id}
                  className=" hover:shadow-sm lg:min-h-84 hover:scale-105 transition duration-300"
                >
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="h-[30vh]  lg:w-[100%] lg:h-64  p-2 object-cover mb-4 rounded-sm"
                    loading="lazy"
                  />
                  <h3 className="font-bold text-gray-800 truncate px-2">{product.name}</h3>
                  <p className="text-gray-600 px-2">${product.price}</p>
                </Link>
              ))}
            </div>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700">
                  No products found.
                </h3>
                <p className="text-gray-500">Try adjusting your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collections;
