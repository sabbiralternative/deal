import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Tab2 = ({ subCategories, product, selectedSubCategory }) => {
  const activeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedSubCategory, subCategories, product]);
  return (
    <ul
      role="tablist"
      className="nav nav-tab new_icasino_tabs mt-2"
      aria-label="Tabs"
    >
      <li
        ref={selectedSubCategory === "All" ? activeRef : null}
        className="active nav-item"
      >
        <a
          onClick={() => {
            navigate(`/sports/casino?product=${product}&category=All`);
          }}
          role="tab"
          className={`nav-link ${
            selectedSubCategory === "All" ? "active " : ""
          }`}
          aria-controls="tab1"
          aria-selected="true"
          id="tab1-link"
        >
          <span />
          <span id="childTab-0-0">
            <img
              className="img-fluid"
              src="https://speedcdn.io/assets/int_tab_icons/others.png"
            />{" "}
            All
          </span>
        </a>
      </li>
      {subCategories?.map((category) => {
        return (
          <li
            key={category}
            ref={category === selectedSubCategory ? activeRef : null}
            className="nav-item"
          >
            <a
              onClick={() => {
                navigate(
                  `/sports/casino?product=${product}&category=${category}`,
                );
              }}
              role="tab"
              className={`nav-link ${
                selectedSubCategory === category ? "active" : ""
              }`}
              aria-controls="tab1"
              aria-selected="false"
              id="tab1-link"
            >
              <span />
              <span id="childTab-0-1">
                <img
                  className="img-fluid"
                  src={`/icon/${category
                    ?.split(" ")
                    .join("")
                    .toLowerCase()}.svg`}
                  onError={(e) => {
                    if (e.target.src.endsWith(".svg")) {
                      // Try webp only once after svg fails
                      e.target.src = `/d/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.webp`;
                    } else if (e.target.src.endsWith(".webp")) {
                      // Try webp only once after svg fails
                      e.target.src = `/d/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.png`;
                    } else {
                      // If webp fails, do nothing (leave broken img)
                      // e.target.onerror = null;
                      e.target.src = `/d/icon/all.svg`;
                    }
                  }}
                />{" "}
                {category}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab2;
