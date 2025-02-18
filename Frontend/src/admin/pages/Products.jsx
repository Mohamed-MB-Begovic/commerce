/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Textarea } from "../../components/ui/Textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Products() {
  const initialData = {
    name: "",
    description: "",
    category: "",
    subCategory: [],
    price: "",
    stockQuantity: "",
    warranty: "",
    returnPolicy: "",
    status: "in stock",
    thumbnail: null,
  };

  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        thumbnail: file,
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedCategories = checked
        ? [...prevState.subCategory, value]
        : prevState.subCategory.filter((category) => category !== value);
      return { ...prevState, subCategory: updatedCategories };
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.stockQuantity) newErrors.stockQuantity = "Stock Quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const appendData = (formData) => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("subCategory", formData.subCategory);
    data.append("price", formData.price);
    data.append("stockQuantity", formData.stockQuantity);
    data.append("warranty", formData.warranty);
    data.append("status", formData.status);
    data.append("returnPolicy", formData.returnPolicy);
    data.append("thumbnail", formData.thumbnail);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        const data = appendData(formData);
        await axios.post("/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully");
        setIsLoading(false);
        setFormData(initialData);
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to add product. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "border-red-500" : ""}
                rows="4"
              />
            </div>
{/* 
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>
              <Select name="category"  value={formData.category}
              onChange={handleChange}required>
                <SelectTrigger>{formData.category || '---choose category---'}</SelectTrigger> 
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Footware">Footware</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div> */}
              <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                    >
                        <option value="">--- Choose Category ---</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="kids">kids</option>
                        <option value="Footware">Footware</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Sub Category</label>
              <div className="relative">
                        <button
                            type="button"
                            className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            onClick={toggleDropdown}
                        >
                            choose category
                            {/* {formData.category.length === 0 ? 'Select Categories' : `${formData.category.length} selected`} */}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute w-full bg-white border p-2 rounded-md shadow-lg mt-1 z-10">
                              
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Shirts"
                                        checked={formData.subCategory.includes('Shirts')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Shirts
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Trousers"
                                        checked={formData.subCategory.includes('Trousers')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Trousers
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Outerwear"
                                        checked={formData.subCategory.includes('Outerwear')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Outerwear
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Dresses"
                                        checked={formData.subCategory.includes('Dresses')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Dresses
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Tops"
                                        checked={formData.subCategory.includes('Tops')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Tops
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Skirts"
                                        checked={formData.subCategory.includes('Skirts')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Skirts
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Sneakers"
                                        checked={formData.subCategory.includes('Sneakers')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Sneakers
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Boots"
                                        checked={formData.subCategory.includes('Boots')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Boots
                                </label>
                                <label className="block">
                                    <input
                                        type="checkbox"
                                        value="Sandals"
                                        checked={formData.subCategory.includes('Sandals')}
                                        onChange={handleCategoryChange}
                                        className="mr-2"
                                    />
                                    Sandals
                                </label>
                                {/* Add more categories as needed */}
                            </div>
                        )}
                    </div>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
            

            <div>
              <label className="block mb-2 text-sm font-medium">Price</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
                required
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Stock Quantity</label>
              <Input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className={errors.stockQuantity ? "border-red-500" : ""}
                required
              />
              {errors.stockQuantity && (
                <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Warranty</label>
              <Input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Return Policy</label>
              <Input
                type="text"
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        <option value="in stock">In Stock</option>
                        <option value="out of stock">Out of Stock</option>
                    </select>
                </div>

            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Product Thumbnail</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="col-span-2">
              <Button type="submit" variant="solid" className="w-full">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
