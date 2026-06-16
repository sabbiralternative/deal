const RightSidebar = () => {
  return (
    <div className="dtl_second">
      <div className="live_streaming">
        <h4>live streaming</h4>
        <div
          id="collapseBasic"
          aria-hidden="true"
          className="collapse"
          style={{ display: "none" }}
        >
          <iframe id="tvStr" className="embed-responsive-item w-100" src />
        </div>
      </div>
      <div className="bet_placing">
        <h4>bet placing</h4>
        <app-bet-slip _nghost-sah-c80></app-bet-slip>
      </div>
      <div className="open_bets">
        <h4>open bets</h4>
        <app-bet-list _nghost-sah-c87>
          <div className="card mb-1 place-bet">
            <div className="card-body p-0">
              <div id="OpenBets">
                <div className="openBetsTabs accounts">
                  <tabset
                    type="tab nav-tabs-bordered nav-justified"
                    className="tab-container"
                  >
                    <ul
                      role="tablist"
                      className="nav nav-tab nav-tabs-bordered nav-justified"
                      aria-label="Tabs"
                    >
                      <li className="active nav-item">
                        <a
                          href="javascript:void(0);"
                          role="tab"
                          className="nav-link active"
                          aria-controls="tab1"
                          aria-selected="true"
                          id="tab1-link"
                        >
                          <span>Matched</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="javascript:void(0);"
                          role="tab"
                          className="nav-link"
                          aria-controls
                          aria-selected="false"
                          id
                        >
                          <span>UnMatched</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="javascript:void(0);"
                          role="tab"
                          className="nav-link"
                          aria-controls
                          aria-selected="false"
                          id
                        >
                          <span>Fancy</span>
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <tab
                        id="tab1"
                        role="tabpanel"
                        aria-labelledby="tab1-link"
                        className="tab-pane active"
                      >
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <td>Selname</td>
                                <td>Odds</td>
                                <td>Stake</td>
                                <td>Date/Time</td>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </tab>
                      <tab role="tabpanel" aria-labelledby className="tab-pane">
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <td>Selname</td>
                                <td>Odds</td>
                                <td>Stake</td>
                                <td>Date/Time</td>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </tab>
                      <tab role="tabpanel" aria-labelledby className="tab-pane">
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <td>Selname</td>
                                <td>Odds</td>
                                <td>Stake</td>
                                <td>Date/Time</td>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </tab>
                    </div>
                  </tabset>
                </div>
              </div>
            </div>
          </div>
        </app-bet-list>
      </div>
    </div>
  );
};

export default RightSidebar;
