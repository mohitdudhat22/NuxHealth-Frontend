import { useState } from "react";
import { useGlobal } from "@/hooks/useGlobal";
import { HMHeader, HMSidebar } from "@/components";

export const DashboardLayout = ({ children, items }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useGlobal();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-y-auto bg-gray-100">
      {/* Sidebar */}
      <HMSidebar
        items={items}
        isSidebarOpen={isSidebarOpen}
        handleClick={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col pl-0 flex-auto min-h-0">
        {/* Header */}
        <HMHeader handleClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto max-h-screen bg-gray-100">
          <div className="max-w-10xl mx-auto py-2">
            {searchTerm === "" ? children : <SearchResult />}
          </div>
        </main>
      </div>
    </div>
  );
};
