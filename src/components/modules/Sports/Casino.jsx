import { useEffect, useMemo, useState } from "react";
import Tab from "./Tab.jsx";
import Tab2 from "./Tab2.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIndexQuery } from "../../../hooks";

const Casino = () => {
  const { token } = useSelector((state) => state.auth);
  const { data } = useIndexQuery({
    type: "99_all_casino",
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const category = params.get("category");

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const allTables = data?.data?.allTables;
  // const tables = data?.data?.tables?.[100000];

  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
  };

  // const allGames =
  //   allTables &&
  //   Object.values(allTables).flatMap((provider) =>
  //     Object.values(provider).flat(),
  //   );
  const allGames = useMemo(() => {
    if (!allTables) return [];
    return Object.values(allTables).flatMap((provider) =>
      Object.values(provider).flat(),
    );
  }, [allTables]);
  // const tablesGames =
  //   tables &&
  //   Object.values(tables).flatMap((provider) => Object.values(provider).flat());

  const categories =
    allGames && Array.from(new Set(allGames?.map((game) => game?.product)));

  // const a =
  //   allGames && allGames?.find((game) => game.product === "BIKINI GAMES");
  // console.log(a);
  // console.log(categories);

  const subCategories = useMemo(() => {
    if (allGames && categories && product === "All") {
      return Array.from(new Set(allGames?.map((game) => game?.category)));
    }
    if (allGames && categories && product !== "All") {
      const allCategory = allGames?.filter((game) => game?.product === product);
      return Array.from(new Set(allCategory?.map((game) => game?.category)));
    }
  }, [categories, allGames, product]);

  const filteredData = useMemo(() => {
    if (allGames && categories && subCategories) {
      if (search) {
        return allGames?.filter((game) => game?.category?.includes(search));
      }
      if (!search) {
        if (product === "All" && category === "All") {
          return allGames;
        }
        if (product === "All" && category !== "All") {
          return allGames?.filter((game) => game?.category === category);
        }
        if (product !== "All" && category === "All") {
          return allGames?.filter((game) => game?.product === product);
        }
        if (product !== "All" && category !== "All") {
          return allGames?.filter(
            (game) => game?.product === product && game?.category === category,
          );
        }
      }
    }
  }, [allGames, categories, category, subCategories, product, search]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <main>
      <div className="container">
        <div>
          <div className="sportlist_div">
            <div type="nav sportlist_div_sub_tabs" className="tab-container">
              <div className="tab-content">
                <div
                  role="tabpanel"
                  aria-labelledby
                  className="tab-pane active"
                >
                  <div className="card-body card-content p-0">
                    <div className="title-header">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <span
                            style={{ color: "black" }}
                            className="list-sport-title"
                          >
                            <img
                              className="img-fluid game-icon-img"
                              src="/assets/icon-99998.svg"
                            />{" "}
                            Casino
                          </span>
                        </div>
                        <div className="col-8">
                          <div className="casino_searchbar">
                            <div className="input-group">
                              <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search Games..."
                                className="ng-untouched ng-pristine ng-valid"
                              />
                              <span className="input-group-text">
                                <img
                                  src="/assets/icon-search.svg"
                                  className="img-fluid game-icon-img"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bet-table-body">
                      <div className="home-products-container mt-1">
                        <div className="row row5">
                          <div className="col-md-12">
                            <div
                              type="tab fancy-subtabs"
                              className="casino_tabs_ul tab-container"
                            >
                              <Tab
                                categories={categories}
                                selectedCategory={product}
                              />
                              <div className="tab-content">
                                <tab
                                  role="tabpanel"
                                  aria-labelledby
                                  className="tab-pane active"
                                >
                                  <div
                                    type="tab new_icasino_tabs mt-2"
                                    className="casino_tabs_ul tab-container"
                                  >
                                    <Tab2
                                      product={product}
                                      selectedSubCategory={category}
                                      subCategories={subCategories}
                                    />
                                    <div className="tab-content">
                                      <tab
                                        id="tab1"
                                        role="tabpanel"
                                        aria-labelledby="tab1-link"
                                        className="tab-pane active"
                                      >
                                        <div className="row casino_divvv">
                                          {filteredData?.map((casino, i) => {
                                            return (
                                              <div
                                                onClick={() =>
                                                  handleNavigateToIFrame(casino)
                                                }
                                                key={`${casino?.id}-${casino?.category}-${casino?.product}-${i}`}
                                                className="col-md-2 col-6"
                                              >
                                                <img
                                                  className="img-fluid  ng-lazyloaded"
                                                  src={casino?.url_thumb}
                                                />
                                                <div className="casino-name">
                                                  {casino?.name}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </tab>
                                    </div>
                                  </div>
                                </tab>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Casino;
