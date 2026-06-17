import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Tab = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedCategory, categories]);
  return (
    <ul
      style={{ scrollBehavior: "smooth" }}
      role="tablist"
      className="nav nav-tab fancy-subtabs"
      aria-label="Tabs"
    >
      <li
        ref={selectedCategory === "All" ? activeRef : null}
        className="active nav-item"
      >
        <a
          onClick={() => {
            navigate(`/sports/casino?product=All&category=All`);
          }}
          role="tab"
          className={`nav-link ${selectedCategory === "All" ? "active" : ""}`}
          aria-controls
          aria-selected="true"
          id
        >
          <span />
          <span id="parentTab-0"> all </span>
        </a>
      </li>
      {categories?.map((category) => {
        return (
          <li
            key={category}
            ref={category === selectedCategory ? activeRef : null}
            className="active nav-item"
          >
            <a
              onClick={() => {
                navigate(`/sports/casino?product=${category}&category=All`);
              }}
              role="tab"
              className={`nav-link ${selectedCategory === "All" ? "active" : ""}`}
              aria-controls
              aria-selected="true"
              id
            >
              <span />
              <span id="parentTab-0"> {category} </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab;
