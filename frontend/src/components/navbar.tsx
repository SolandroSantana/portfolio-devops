import { Link } from "react-router-dom";
import { CheckIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  if (localStorage.getItem("token")) {
    return (
    <header className="flex items-center justify-between dark:bg-gray-900 px-4 py-3 shadow-md md:px-6">
      <nav className="flex items-center space-x-4">
        <CheckIcon className="w-6 h-6" />
        <span>Todo</span>
      </nav>
      <div className="flex items-center space-x-4 gap-5">
          {localStorage.getItem("user") ? localStorage.getItem("user") : "User"}
        <ModeToggle />
      </div>
    </header>
    )
  } else {
    return(
      <header className="flex items-center justify-between dark:bg-gray-900 px-4 py-3 shadow-md md:px-6">
      <nav className="flex items-center space-x-4">
        <CheckIcon className="w-6 h-6" />
        <span>Todo</span>
      </nav>
      <div className="flex items-center space-x-4">
            <Link
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              to="#"
            >
              Sign Up
            </Link>
            <Link
              className="rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
              to="/auth/sign-in"
            >
              Sign In
            </Link>
          </div>
        <ModeToggle />
    </header>
    )
  }
}
