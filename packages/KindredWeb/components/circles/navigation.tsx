'use client'

export default function Navigation(){
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="circle-tabs" className="sr-only">Select a tab</label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select id="circle-tabs" name="tabs" className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option>Overview</option>
          <option>Vault</option>
          <option>Members</option>
          <option>Chat</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
            <a href="#" className="border-primary-700 text-primary-700 whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium" aria-current="page">Overview</a>
            <a href="./vault" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium">Vault</a>
            <a href="./members" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium">Members</a>
            <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium">Chat</a>
          </nav>
        </div>
      </div>
    </div>
  );
};