import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  /* filter the search value */
  useEffect(() => {
    const categories = Array.from(new Set(data.map((item) => item.eventType)));

    setCategories(categories);
  }, [data]);

  /* hide the search modal */
  const handleHideDropdown = (item) => {
    const link = `/event-details/${item?.eventTypeId}/${item?.eventId}`;
    navigate(link);
    setSearchText("");
    setData([]);
  };
  return (
    <div className="searchbar">
      <div className="input-group">
        <span className="input-group-text">
          <i data-feather="search" className="align-middle" />
        </span>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search"
          className="form-control ng-untouched ng-pristine ng-valid"
          aria-expanded="false"
          aria-autocomplete="list"
        />
        {data?.length > 0 && searchText?.length > 2 && (
          <div
            className="typeahead-container dropdown open bottom ng-tns-c45-0 dropdown-menu ng-star-inserted"
            style={{
              position: "absolute",
              display: "block",
              visibility: "visible",
              willChange: "transform",
              top: "0px",
              left: "0px",
              transform: "translate3d(9px, 27px, 0px)",
              height: "147.268px",
            }}
            id="ngb-typeahead-0"
            role="listbox"
          >
            {categories.map((category) => (
              <>
                <button
                  role="option"
                  className="dropdown-item ng-tns-c45-0 ng-trigger ng-trigger-typeaheadAnimation ng-star-inserted "
                  id="ngb-typeahead-0-0"
                >
                  <a
                    id="menu-link-redi"
                    className="searchAnchor ng-star-inserted"
                    style={{}}
                  >
                    {" "}
                    {category}
                  </a>
                </button>
                {data
                  .filter((item) => item.eventType === category)
                  .map((item, i) => (
                    <button
                      onClick={() => handleHideDropdown(item)}
                      key={i}
                      role="option"
                      className="dropdown-item ng-tns-c45-0 ng-trigger ng-trigger-typeaheadAnimation ng-star-inserted "
                      id="ngb-typeahead-0-0"
                    >
                      <a
                        id="menu-link-redi"
                        className="searchAnchor ng-star-inserted"
                        style={{}}
                      >
                        {" "}
                        {item?.name}
                      </a>
                    </button>
                  ))}
              </>
            ))}
          </div>
        )}
        {data?.length === 0 && searchText?.length > 4 && (
          <div
            className="typeahead-container dropdown open bottom ng-tns-c45-0 dropdown-menu ng-star-inserted"
            style={{
              position: "absolute",
              display: "block",
              visibility: "visible",
              willChange: "transform",
              top: "0px",
              left: "0px",
              transform: "translate3d(9px, 27px, 0px)",
              height: "147.268px",
            }}
            id="ngb-typeahead-0"
            role="listbox"
          >
            <button
              role="option"
              className="dropdown-item ng-tns-c45-0 ng-trigger ng-trigger-typeaheadAnimation ng-star-inserted"
              id="ngb-typeahead-0-0"
            >
              <a
                href="javascript:void(0);"
                id="menu-link-redi"
                className="searchAnchor ng-star-inserted"
                style={{}}
              >
                {" "}
                No data found
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
