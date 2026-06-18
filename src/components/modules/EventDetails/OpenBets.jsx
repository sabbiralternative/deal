const OpenBets = () => {
  return (
    <div>
      <div className="card mb-1 place-bet">
        <div className="card-body p-0">
          <div id="OpenBets">
            <div className="openBetsTabs accounts">
              <div
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenBets;
