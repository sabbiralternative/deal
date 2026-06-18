import { useNavigate } from "react-router-dom";
import Banner from "../../components/modules/Home/Banner";
import useBannerImage from "../../hooks/banner.hook";
import WhatsApp from "../../components/modules/Home/WhatsApp";
import { useLotusHomeLobby } from "../../hooks/lotusHomeLobby";
import Originals from "../../components/modules/Home/Originals";
import IndianCardGames from "../../components/modules/Home/IndianCardGames";

const Home = () => {
  const { data: bannerImage } = useBannerImage();
  const navigate = useNavigate();
  const { data: lotusLobby } = useLotusHomeLobby();
  return (
    <main>
      <WhatsApp />
      <div className="container" style={{ maxWidth: "100%" }}>
        <div>
          <div id="carouselExampleIndicators" className="carousel slide">
            {bannerImage?.banner?.length > 0 && (
              <Banner bannerImage={bannerImage?.banner} />
            )}
          </div>
          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="sports_tab">
                <div className="sports_tabDiv">
                  <div className="tab-container">
                    <div className="tab-content">
                      <div
                        id="tab1"
                        role="tabpanel"
                        aria-labelledby="tab1-link"
                        className="tab-pane active"
                      >
                        <div className="sub_tabs">
                          <div className="row">
                            <div
                              onClick={() => navigate("/sports/4")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_4.png"
                              />
                              <div className="slg_content">
                                <span>Cricket</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sports/1")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_1.png"
                              />
                              <div className="slg_content">
                                <span>Football</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sports/2")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_2.png"
                              />
                              <div className="slg_content">
                                <span>Tennis</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sports/6")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_2378961.png"
                              />
                              <div className="slg_content">
                                <span>Politics</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/int-casino")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_99998.png"
                              />
                              <div className="slg_content">
                                <span>Int Casino</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sportsbook")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_99991.png"
                              />
                              <div className="slg_content">
                                <span>Sports book</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sports/7")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_7.png"
                              />
                              <div className="slg_content">
                                <span>Horse Racing</span>
                              </div>
                            </div>
                            <div
                              onClick={() => navigate("/sports/4339")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_4339.png"
                              />
                              <div className="slg_content">
                                <span>Greyhound Racing</span>
                              </div>
                            </div>

                            <div
                              onClick={() => navigate("/sports/5")}
                              className="sport_list_group col-md-4 col-12 slg_cricket"
                              tabIndex={0}
                            >
                              <img
                                className="img-fluid"
                                src="/assets/sport_99994.png"
                              />
                              <div className="slg_content">
                                <span>Kabaddi</span>
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
          <Originals trendingGames={lotusLobby?.trendingGames} />
          <IndianCardGames />
        </div>
      </div>
    </main>
  );
};

export default Home;
