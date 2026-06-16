const BetHistory = () => {
  return (
    <div data-v-2f3cedbb>
      <section
        data-v-2f3cedbb
        className="simplebar-content-wrapper dashbord-p-top mb-3"
        loading="lazy"
      >
        <div className="contan">
          <div className="user-box">
            <div className="sidebar-menu">
              <div className="left-side-menu" id="sidebar-menu">
                <ul className="scroll-manu-side" id="side-menu">
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>cricket</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>soccer</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>tennis</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>FIFA CUP WINNER</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>WINNER CUP</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>ELECTION</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>Kabaddi </span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>Election</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                    {/**/}
                  </li>
                </ul>
              </div>
            </div>
            <div
              data-v-1b74d76b
              className="change-password p-2 my-bets-fluid st_ac"
            >
              <div data-v-1b74d76b className="userTables">
                <div
                  data-v-1b74d76b
                  className="statementFilter row gx-1 my-2 mx-0"
                  type="BETS"
                >
                  <div className="statementFilter-fild col-6">
                    <label>From Date</label>
                    <input
                      type="date"
                      formcontrolname="start_date"
                      className="form-control"
                      min
                      max
                    />
                  </div>
                  <div className="statementFilter-fild col-6">
                    <label>To Date</label>
                    <input
                      type="date"
                      formcontrolname="end_date"
                      className="form-control"
                      min
                      max
                    />
                  </div>
                  {/**/}
                  <div className="col-6 statementFilter-fild form-group">
                    <label>Type</label>
                    <select className="form-control form-select">
                      <option value={4}>Cricket</option>
                      <option value={1}>Soccer</option>
                      <option value={2}>Tennis</option>
                      <option value="sportsbook">Sportsbook</option>
                      <option value="matka">Matka</option>
                      <option value="fantasy_cricket">Fantasy cricket</option>
                      <option value="casino">Casino</option>
                      <option value="premium">Premium</option>
                      <option value="virtual_sport">Virtual sports</option>
                      <option value={4343}>FIFA CUP WINNER</option>
                      <option value={4344}>WINNER CUP</option>
                      <option value={4345}>ELECTION</option>
                      <option value={27454572}>Kabaddi </option>
                      <option value={27454577}>Election</option>
                      <option value={27454571}>Esports</option>
                      <option value={26420387}>Mixed Martial Arts</option>
                      <option value={2152880}>Gaelic Games</option>
                      <option value={998917}>Volleyball</option>
                      <option value={468328}>Handball</option>
                      <option value={61420}>Australian Rules</option>
                      <option value={7524}>Ice Hockey</option>
                      <option value={7522}>Basketball</option>
                      <option value={7511}>Baseball</option>
                      <option value={6423}>American Football</option>
                      <option value={6422}>Snooker</option>
                      <option value={27454574}>Table tennis</option>
                    </select>
                  </div>
                  <div className="statementFilter-fild col-6">
                    <label>Bet Type</label>
                    <select className="form-select">
                      <option value="Settle Bets">Settle Bets</option>
                      <option value="Void">Void</option>
                      <option value="Invalid">Invalid</option>
                    </select>
                  </div>
                  {/**/}
                  {/**/}
                  <div className="statementFilter-fild col-12">
                    <div className="row gx-1 align-items-end mx-auto">
                      {/**/}
                      <div className="col-12 px-0">
                        <div className="statementFilter-button statementFilter-full">
                          <button type="submit" className="btn btn-gets">
                            Get History
                          </button>
                          {/**/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-v-1b74d76b className="userTables-head heade_rounded">
                  <h2 data-v-1b74d76b>Bet History</h2>
                </div>
                <div data-v-1b74d76b className="sattle-bet-list pt-0">
                  <div
                    data-v-1b74d76b
                    className="accordion border-0 accordion-flush bg-white p-1 rounded-1"
                    id="accordionFlushExample"
                  >
                    <div data-v-1b74d76b className="nodata m-0">
                      <span data-v-1b74d76b>No Data Found</span>
                    </div>
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BetHistory;
