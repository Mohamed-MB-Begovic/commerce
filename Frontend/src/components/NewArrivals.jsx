import Love from "./Icons/Love";

export default function NewArrivals() {
  return (
    <div className="mt-10" data-aos="fade-up" data-aos-delay-200 data-aos-duration="1000">
<h2 className="text-center font-medium font-sans text-[1.3rem] mb-5"><span className="text-orange-400">N</span>ew <span className="text-orange-400">A</span>rrivals</h2>      
{/* the container */}
<div className="grid items-center justify-center mx-32 md:grid-cols-2 lg:grid-cols-4 ">
    <div className=" hover:cursor-pointer p-4">
        <img src="./n1.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-1 mt-3 flex gap-[12rem]  items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n2.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-1 mt-3 flex gap-[12rem]  items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n3.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-1 mt-3 flex gap-[12rem]  items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n4.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-1 mt-3 flex gap-[12rem]  items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
 
 
   
 
</div>
    </div>
  )
}
