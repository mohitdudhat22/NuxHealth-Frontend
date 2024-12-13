import { lazy } from "react";

export const lazyLoader = (componentPath) => {
  return lazy(() => {
    // Ensure we're using the correct path format for imports
    const formattedPath = componentPath.startsWith("./")
      ? componentPath
      : `../${componentPath}`;
    return import(/* @vite-ignore */ formattedPath).catch((error) => {
      console.error(`Error loading component: ${componentPath}`, error);
      // Return a default export with an error component
      return {
        default: () => (
          <div>Error loading component. Please try refreshing the page.</div>
        ),
      };
    });
  });
};
