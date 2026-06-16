const AccountStatement = () => {
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
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>soccer</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>tennis</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>FIFA CUP WINNER</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>WINNER CUP</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>ELECTION</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>Kabaddi </span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="collapsed" aria-expanded="false">
                      <span>Election</span>
                      <span className="menu-arrow">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right-side-bar-main-sec px-2">
              <div className="right-side-bar-main-sec">
                <div className="userTables">
                  <div className="statementFilter row gx-1 my-2 mx-0">
                    <div className="statementFilter-fild col-6">
                      <label>From Date</label>
                      <input type="date" className="form-control" min max />
                    </div>
                    <div className="statementFilter-fild col-6">
                      <label>To Date</label>
                      <input type="date" className="form-control" min max />
                    </div>

                    <div className="statementFilter-fild col-6">
                      <label>Select Type</label>
                      <select className="form-select">
                        <option value="all">All</option>
                        <option value="dw">Deposit/Withdrawal</option>
                        <option value="sport">Sports</option>
                      </select>
                    </div>
                    <div className="statementFilter-fild col-6">
                      <label>Select Subtype</label>
                      <select className="form-select subtype" disabled>
                        <option selected>All</option>
                      </select>
                    </div>
                    <div className="statementFilter-fild col-12">
                      <div className="row gx-1 align-items-end mx-auto">
                        <div className="col-6">
                          <label>Search</label>
                          <div className="input_icon_field">
                            <input
                              type="text"
                              placeholder="Search"
                              className="form-control search_field pe-4"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="statementFilter-button statementFilter-full">
                            <button type="submit" className="btn btn-gets">
                              Submit
                            </button>
                            <div>
                              <button
                                className="btn downlode_btn downlode_btn dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <img src="/assets/download-aILIEDZm.svg" />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item downl_file">
                                    Download as Excel
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item downl_file">
                                    Download as PDF
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-accent-primary mx-0">
                    <div className="userTables-head">
                      <h2>Account Statement</h2>
                    </div>
                    <div className="p-1">
                      <div className="table-responsive table_style_1 fix_font_size">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="sort-head">
                                <div className="data-cmn-h">
                                  <span>Profit &amp; Loss</span>
                                </div>
                                <div className="tableSorting-container">
                                  <div className="sortIcon disabled-btn">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 0L5.5 5H0.5L3 0Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                  <div className="sortIcon">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 5L0.5 0H5.5L3 5Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </th>
                              <th className="sort-head">
                                <div className="data-cmn-h">
                                  <span>Description</span>
                                </div>
                                <div className="tableSorting-container">
                                  <div className="sortIcon disabled-btn">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 0L5.5 5H0.5L3 0Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                  <div className="sortIcon">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 5L0.5 0H5.5L3 5Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </th>
                              <th className="sort-head">
                                <div className="data-cmn-h">
                                  <span>Balance</span>
                                </div>
                                <div className="tableSorting-container">
                                  <div className="sortIcon disabled-btn">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 0L5.5 5H0.5L3 0Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                  <div className="sortIcon">
                                    <svg
                                      width={6}
                                      height={5}
                                      viewBox="0 0 6 5"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3 5L0.5 0H5.5L3 5Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={9}>
                                <div className="noDatafound-txt">
                                  <span>No Data Found</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal"
              id="statementInfoModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header headerTheme">
                    <h5 className="modal-title">Statement Info</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="fa fa-close" />
                    </button>
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

export default AccountStatement;
