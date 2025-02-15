import { Link } from "react-router-dom";

export default function TopHeader() {
  return (
    <div className="border-b flex justify-end mx-10 py-3 font-serif">
    <Link to='/signin' className="text-gray-500 semi-bold hover:text-gray-400 ml-4">
      Sign in
    </Link>
    <Link to='/signup' className="text-gray-500 semi-bold hover:text-gray-400 ml-4">
      Create an account
    </Link>
  </div>
  )
}




// <div className="relative">
// <a  id="dropdown" onClick={()=>setIsOpen(!isOpen)}
// className="text-gray-700 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-medium font-medium">
//   Shop
//  {isOpen ? <UpArrow/>:<DownArrow/>}
// </a>



// </div>