import { useState } from "react";
import { LeftFilters } from "../sections/LeftFilters";

export function NavBar(props) {
  const [showFilter, setShowFilter] = useState(false);
  function ToggleShow() {
    setShowFilter((prev) => !prev);
  }
  return (
    <>
      <nav class="bg-white">
        <div class="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
              onClick={ToggleShow}
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
              <div class="flex-shrink-0 flex items-center text-blue-500 font-bold">
               
                HEALTH EXPLORE
              </div>
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    class="text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Jobs
                  </a>
                  <a
                    href="#"
                    class="text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Professional Networks
                  </a>
                  <a
                    href="#"
                    class="text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Lounge
                  </a>

                  <a
                    href="#"
                    class="text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Salary
                  </a>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
              <button className=" rounded-lg px-2 py-1 bg-white text-blue-500  hover:text-blue-900 border-solid border-2 border-blue-500 hidden sm:block ">
                CREATE JOB
              </button>

              <div class="ml-3 relative ">
                <div>
                  <span className='p-3 bg-blue-400 text-white rounded-full border-solid border-blue-400'>
                      JO
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" sm:hidden">
          {showFilter ? (
            <div class="px-2 pt-2 pb-3 space-y-1">
              <LeftFilters handleFilter={props.handleFilter} />
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}
