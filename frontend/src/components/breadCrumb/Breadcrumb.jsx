import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../src/Breadcrump.css"; // Ensure the correct file path

const Breadcrumb = () => {
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState([]);

  useEffect(() => {
    // Get the current path from the location
    const currentPath = location.pathname;
    
    // Get previously visited pages from sessionStorage
    const storedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];

    // Add the current path to the history (if it's not already present)
    if (!storedPages.includes(currentPath)) {
      storedPages.push(currentPath);
    }

    // Save the updated history to sessionStorage
    sessionStorage.setItem('visitedPages', JSON.stringify(storedPages));

    // Set the visited pages state to the updated list
    setVisitedPages(storedPages);
  }, [location]);

  // Get the last visited page (excluding the current page)
  const breadcrumbs = visitedPages.slice(0, visitedPages.length - 1);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {breadcrumbs.map((page, index) => {
          const to = page; // Get the path of the visited page
          const isLast = index === breadcrumbs.length - 1; // Check if it's the last breadcrumb

          return (
            <li
              key={to}
              className={`breadcrumb-item ${isLast ? "active" : ""}`} // Correct class name assignment
              aria-current={isLast ? "page" : undefined} // Set current page for last breadcrumb
            >
              {!isLast ? <Link to={to}>{page.split("/").pop()}</Link> : page.split("/").pop()} {/* Render Link or plain text */}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
