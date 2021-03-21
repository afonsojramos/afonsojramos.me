import { faChild } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React from 'react';
import DarkModeToggle from './toggle';

export const links = ['home', 'about', 'contact'];

const DesktopNav = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="#d">
            <span className="sr-only">Workflow</span>
            <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open menu</span>
            {/* Heroicon name: outline/menu */}
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-10">
          <Link to="#d" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
            <FontAwesomeIcon className="self-center min-h-full" icon={faChild} />
            <p className="ml-4 text-base font-medium text-black">About</p>
          </Link>

          <Link to="#d" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
            {/* Heroicon name: outline/shield-check */}
            <svg
              className="flex-shrink-0 h-6 w-6 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="ml-4 text-base font-medium text-gray-900">Security</p>
          </Link>

          <Link to="#d" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
            {/* Heroicon name: outline/shield-check */}
            <svg
              className="flex-shrink-0 h-6 w-6 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="ml-4 text-base font-medium text-gray-900">Security</p>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
