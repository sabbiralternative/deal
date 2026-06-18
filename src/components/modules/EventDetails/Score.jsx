import "./score.css";
const Score = ({ iscore }) => {
  return (
    <div className="scorecard_div">
      <div className="sc_cw-main-container">
        <div className="sc_cw-header" style={{ background: "transparent" }}>
          <div className="sc_cw-header-desktop">
            <div className="sc_cw-header-grid-desktop">
              <div className="sc_cw-header-container-desktop sc_cw-header-grid-row-desktop">
                <span className="sc_cw-header-team-name-desktop">
                  {iscore?.teamName}
                </span>
              </div>
              <div className="sc_cw-header-mid-section-desktop">
                <div className="sc_cw-header-primary-comment-desktop">
                  {iscore?.status}
                </div>
                <div className="sc_cs-header-target-desktop"></div>
              </div>
              <div
                className="sc_cw-header-container-desktop sc_cw-header-grid-row-desktop"
                style={{ justifyContent: "end" }}
              >
                {/* <span className="sc_cw-header-team-name-desktop">AA</span> */}
              </div>
              {/* LEFT SCORE */}
              <div className="sc_cw-header-score-container-left-desktop">
                <div className="sc_cw-header-score-bg-desktop">
                  <span className="sc_cw-header-score-big-desktop">
                    {iscore?.teamRun}
                  </span>
                  <span className="sc_cw-header-score-small-desktop">
                    ({iscore?.teamOver})
                  </span>
                </div>
                <div />
                {iscore?.crr && (
                  <div>
                    <span className="sc_cw-header-score-small-desktop">
                      CRR: <span>{iscore?.crr}</span>
                    </span>
                  </div>
                )}

                <div />
              </div>
              {/* RIGHT SCORE */}
              {/* <div className="sc_cw-header-score-container-right-desktop">
                <div>
                  <span className="sc_cw-header-score-small-desktop">
                    RRR: <span>00</span>
                  </span>
                </div>

                <div>
                  <span className="sc_cw-header-score-small-desktop">
                    CRR: <span>000</span>
                  </span>
                </div>

                <div className="sc_cw-header-score-bg-desktop">
                  <span className="sc_cw-header-score-big-desktop">0/0</span>
                  <span className="sc_cw-header-score-small-desktop">
                    (0.0)
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="sc_cw-header-mobile">
            <div className="sc_cw-header-grid-mobile">
              {/* ROW-1 COL-1 */}
              <div className="sc_cw-header-container-mobile sc_cw-header-grid-row-mobile">
                <span className="sc_cw-header-team-name-mobile">
                  {" "}
                  {iscore?.teamName}
                </span>
              </div>
              {/* ROW-1 COL-1 */}
              {/* ROW-1 COL-2 */}
              <div className="sc_cw-header-mid-section-mobile">
                <div className="sc_cw-header-primary-comment-mobile">
                  {iscore?.status}
                </div>
                <div className="sc_cw-header-rates-mobile">
                  {iscore?.crr && (
                    <span className="sc_cw-header-rates-mobile">
                      CRR: <span>{iscore?.crr}</span>
                    </span>
                  )}
                  {iscore?.rrr && (
                    <span className="sc_cw-header-rates-mobile">
                      RRR: <span>{iscore?.rrr}</span>
                    </span>
                  )}
                </div>
                <div className="sc_cs-header-target-mobile"></div>
              </div>
              {/* ROW-1 COL-2 */}
              {/* ROW-1 COL-3 */}
              <div
                className="sc_cw-header-container-mobile sc_cw-header-grid-row-mobile"
                style={{ justifyContent: "end" }}
              >
                {/* <span className="sc_cw-header-team-name-mobile">AA</span> */}
              </div>
              {/* ROW-1 COL-3 */}
              {/* ROW-2 COL-1 LEFT SCORE */}
              <div className="sc_cw-header-score-container-left-mobile">
                <div className="sc_cw-header-score-bg-mobile">
                  <span className="sc_cw-header-score-big-mobile">
                    {iscore?.teamRun}
                  </span>
                  <span className="sc_cw-header-score-small-mobile">
                    ({iscore?.teamOver})
                  </span>
                </div>
              </div>
              {/* ROW-2 COL-1 LEFT SCORE */}
              {/* ROW-2 COL-3 RIGHT SCORE */}
              {/* <div className="sc_cw-header-score-container-right-mobile">
                <div className="sc_cw-header-score-bg-mobile">
                  <span className="sc_cw-header-score-big-mobile">0/0</span>
                  <span className="sc_cw-header-score-small-mobile">(0.0)</span>
                </div>
              </div> */}
              {/* ROW-2 COL-3 RIGHT SCORE */}
              <div />
            </div>
          </div>
        </div>

        {/* Target mobile */}
        <div className="sc_cw-custom-comments-mobile">
          <div className="sc_cw-custom-comments-container-mobile">
            <span>{iscore?.status2}</span>
          </div>
        </div>

        {/* Partnership, target,  last wicket desktop  */}
        <div className="sc_cw-info-section-desktop">
          <div className="sc_cw-info-container-desktop">
            <div className="sc_cw-info-part-desktop">
              <span>Partnership:&nbsp;</span>
              <span>
                {iscore?.partnership_runs}&nbsp;({iscore?.partnership_balls})
              </span>
            </div>
            <div className="sc_cw-info-part-desktop">
              <span>{iscore?.status}</span>
            </div>
            <div className="sc_cw-info-part-desktop">
              <span>Last Wicket:&nbsp;{iscore?.last_wicket}</span>
              <span />
            </div>
          </div>
        </div>

        {/* Partnership, last wicket mobile  */}
        <div className="sc_cw-info-section-mobile">
          <div className="sc_cw-info-container-mobile">
            <div className="sc_cw-info-part-mobile">
              <span>Partnership:&nbsp;</span>
              <span>
                {iscore?.partnership_runs}&nbsp;({iscore?.partnership_balls})
              </span>
            </div>
            <div className="sc_cw-info-part-mobile">
              <span>Last Wicket:&nbsp;{iscore?.last_wicket}</span>
              <span />
            </div>
          </div>
        </div>

        {/* Pervious and current over desktop */}
        <div className="sc_cw-over-desktop">
          <div className="sc_cw-over-container-desktop">
            <div
              className="sc_cw-current-over-desktop"
              style={{ marginRight: "20px" }}
            >
              <div className="sc_cw-over-part-name-desktop">Previous Over</div>
              <div className="sc_cw-over-part-balls-container-desktop">
                {iscore?.previousOver?.map((over, idx) => (
                  <span key={idx} className="sc_cw-over-part-balls">
                    {over}
                  </span>
                ))}
              </div>
            </div>
            <div className="sc_cw-current-over-desktop">
              <div className="sc_cw-over-part-name-desktop">Current Over</div>
              <div className="sc_cw-over-part-balls-container-desktop">
                {iscore?.currentOver?.map((over, idx) => (
                  <span key={idx} className="sc_cw-over-part-balls">
                    {over}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Pervious and current over mobile */}
        <div className="sc_cw-over-mobile">
          <div className="sc_cw-over-container-mobile">
            <div className="sc_cw-over-arrows-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M14.03 7.47a.75.75 0 0 1 0 1.06L10.56 12l3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="sc_cw-over-inner-container-mobile">
              <div className="sc_cw-over-part-mobile">
                <div
                  className="sc_cw-current-over-mobile"
                  style={{ marginRight: "20px" }}
                >
                  <div className="sc_cw-over-part-name-mobile">
                    Previous Over
                  </div>
                  <div className="sc_cw-over-part-balls-container-mobile">
                    {iscore?.previousOver?.map((over, idx) => (
                      <span key={idx} className="sc_cw-over-part-balls">
                        {over}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sc_cw-over-part-mobile">
                <div className="sc_cw-current-over-mobile">
                  <div className="sc_cw-over-part-name-mobile">
                    Current Over
                  </div>
                  <div className="sc_cw-over-part-balls-container-mobile">
                    {iscore?.currentOver?.map((over, idx) => (
                      <span key={idx} className="sc_cw-over-part-balls">
                        {over}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="sc_cw-over-arrows-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M9.97 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L13.44 12L9.97 8.53a.75.75 0 0 1 0-1.06"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Batsmen Desktop */}
        <div className="sc_cw-table-desktop">
          <div className="sc_cw-table-container-desktop">
            <table className="sc_cw-table-structure-desktop">
              <thead>
                <tr>
                  <th>Batsmen</th>
                  <th className="sc_cw-table-structure-desktop-align">R</th>
                  <th className="sc_cw-table-structure-desktop-align">B</th>
                  <th className="sc_cw-table-structure-desktop-align">4s</th>
                  <th className="sc_cw-table-structure-desktop-align">6s</th>
                  <th className="sc_cw-table-structure-desktop-align">SR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_2"
                      data-name="Layer 2"
                      height="12px"
                      width="12px"
                      viewBox="0 0 12 10.18"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <g>
                            <path
                              className="cls-21"
                              d="M9.88.32h0c.38.38.38,1.01,0,1.39L1.76,9.83h-.01c-.34-.35-.62-.72-.84-1.11C-.2,6.77.08,4.24,1.75,2.57c1.42-1.42,3.46-1.83,5.24-1.24.63.21,1.33.11,1.87-.28l1.03-.73Z"
                            />
                            <g>
                              <circle cx="7.14" cy="4.43" r=".23" />
                              <path d="M10.05,1.89l-1.99,1.99c-.1.1-.25.1-.35,0s-.1-.25,0-.35l1.99-1.99c.24-.24.28-.6.12-.88l-.84.59c-.6.43-1.39.55-2.09.31-1.76-.58-3.67-.13-4.98,1.18C.38,4.29.05,6.7,1.12,8.6c.18.32.39.61.64.88l4.45-4.45c.1-.1.25-.1.35,0s.1.25,0,.35L1.76,10.18l-.19-.19c-.35-.35-.64-.73-.88-1.15C-.49,6.75-.13,4.1,1.57,2.4c.72-.72,1.62-1.21,2.6-1.44.96-.22,1.96-.17,2.89.14.56.18,1.17.09,1.65-.25l1.2-.85.15.15c.48.48.48,1.26,0,1.74Z" />
                              <path d="M3.6,5.25c.11-.11.28-.11.39,0s.11.28,0,.39l-1.28,1.28c-.11.11-.28.11-.39,0s-.11-.28,0-.39l1.28-1.28M3.25,4.9l-1.28,1.28c-.3.3-.3.79,0,1.09h0c.3.3.79.3,1.09,0l1.28-1.28c.3-.3.3-.79,0-1.09h0c-.3-.3-.79-.3-1.09,0h0Z" />
                              <path d="M11.91,9.74l-4.85.18c-.74.03-1.47-.15-2.11-.52l-1.7-.97c-.12-.07-.16-.22-.09-.34s.22-.16.34-.09l1.7.97c.56.32,1.2.48,1.85.46l4.42-.16c.15-1.87-.06-3.5-.65-4.95l-4.02,3.73c-.1.09-.26.09-.35-.01-.09-.1-.09-.25,0-.34,0,0,0,0,0,0l4.53-4.2.14.31c.76,1.66,1.02,3.54.81,5.73l-.02.22Z" />
                              <path d="M7.88,9.83s-.03.02-.04.03c-.11.07-.27.04-.34-.07l-2.22-3.44c-.07-.11-.04-.27.07-.34.11-.07.27-.04.34.07l2.22,3.44c.06.1.05.23-.03.31Z" />
                              <path d="M5.37,9.44c-.08.08-.19.1-.29.04-.12-.06-.17-.21-.1-.33l1.02-1.91c.06-.12.21-.17.33-.1.12.06.17.21.1.33l-1.02,1.91s-.03.04-.04.06Z" />
                              <path d="M11.48,7s-.04.04-.07.05l-4.19,1.9c-.12.06-.27,0-.33-.12-.06-.12,0-.27.12-.33l4.19-1.9c.12-.06.27,0,.33.12.04.1.02.21-.05.28Z" />
                            </g>
                          </g>
                          <rect
                            className="cls-11"
                            x={0}
                            width={12}
                            height="10.18"
                          />
                        </g>
                      </g>
                    </svg>
                    <span> &nbsp;&nbsp;{iscore?.player_1_name}</span>
                    {iscore?.strike === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_2"
                        data-name="Layer 2"
                        height="12px"
                        width="12px"
                        viewBox="0 0 10.07 10.07"
                      >
                        <defs></defs>
                        <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                            <g>
                              <path
                                className="cls-1b"
                                d="M7.38,4.2l-5.3,5.3c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52Z"
                              />
                              <g>
                                <path d="M7.72,4.06l-1.71-1.71c-.08-.08-.21-.08-.29,0L.32,7.74c-.43.43-.43,1.13,0,1.56l.44.44c.43.43,1.13.43,1.56,0l5.39-5.39c.08-.08.08-.21,0-.29ZM2.08,9.5c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52-5.3,5.3Z" />
                                <path d="M9.23,0l-3.04,3.04-1.5,2.29s.02.07.05.05l2.29-1.5,3.04-3.04-.83-.83Z" />
                              </g>
                              <g>
                                <rect
                                  className="cls-4b"
                                  x={9}
                                  y=".57"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.28 -6.36) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="8.46"
                                  y="1.1"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.5 -5.82) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="7.92"
                                  y="1.64"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.72 -5.29) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="7.39"
                                  y="2.17"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.94 -4.75) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="6.85"
                                  y="2.71"
                                  width=".64"
                                  height=".42"
                                  transform="translate(4.17 -4.22) rotate(45)"
                                />
                              </g>
                              <polygon
                                className="cls-3b"
                                points="6.86 3.68 5.48 4.58 6.38 3.21 6.86 3.68"
                              />
                            </g>
                            <rect
                              className="cls-2b"
                              y={0}
                              width="10.07"
                              height="10.07"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_1_run}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_1_ball}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_1_four}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_1_six}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_1_sr}
                  </td>
                </tr>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_2"
                      data-name="Layer 2"
                      height="12px"
                      width="12px"
                      viewBox="0 0 12 10.18"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <g>
                            <path
                              className="cls-21"
                              d="M9.88.32h0c.38.38.38,1.01,0,1.39L1.76,9.83h-.01c-.34-.35-.62-.72-.84-1.11C-.2,6.77.08,4.24,1.75,2.57c1.42-1.42,3.46-1.83,5.24-1.24.63.21,1.33.11,1.87-.28l1.03-.73Z"
                            />
                            <g>
                              <circle cx="7.14" cy="4.43" r=".23" />
                              <path d="M10.05,1.89l-1.99,1.99c-.1.1-.25.1-.35,0s-.1-.25,0-.35l1.99-1.99c.24-.24.28-.6.12-.88l-.84.59c-.6.43-1.39.55-2.09.31-1.76-.58-3.67-.13-4.98,1.18C.38,4.29.05,6.7,1.12,8.6c.18.32.39.61.64.88l4.45-4.45c.1-.1.25-.1.35,0s.1.25,0,.35L1.76,10.18l-.19-.19c-.35-.35-.64-.73-.88-1.15C-.49,6.75-.13,4.1,1.57,2.4c.72-.72,1.62-1.21,2.6-1.44.96-.22,1.96-.17,2.89.14.56.18,1.17.09,1.65-.25l1.2-.85.15.15c.48.48.48,1.26,0,1.74Z" />
                              <path d="M3.6,5.25c.11-.11.28-.11.39,0s.11.28,0,.39l-1.28,1.28c-.11.11-.28.11-.39,0s-.11-.28,0-.39l1.28-1.28M3.25,4.9l-1.28,1.28c-.3.3-.3.79,0,1.09h0c.3.3.79.3,1.09,0l1.28-1.28c.3-.3.3-.79,0-1.09h0c-.3-.3-.79-.3-1.09,0h0Z" />
                              <path d="M11.91,9.74l-4.85.18c-.74.03-1.47-.15-2.11-.52l-1.7-.97c-.12-.07-.16-.22-.09-.34s.22-.16.34-.09l1.7.97c.56.32,1.2.48,1.85.46l4.42-.16c.15-1.87-.06-3.5-.65-4.95l-4.02,3.73c-.1.09-.26.09-.35-.01-.09-.1-.09-.25,0-.34,0,0,0,0,0,0l4.53-4.2.14.31c.76,1.66,1.02,3.54.81,5.73l-.02.22Z" />
                              <path d="M7.88,9.83s-.03.02-.04.03c-.11.07-.27.04-.34-.07l-2.22-3.44c-.07-.11-.04-.27.07-.34.11-.07.27-.04.34.07l2.22,3.44c.06.1.05.23-.03.31Z" />
                              <path d="M5.37,9.44c-.08.08-.19.1-.29.04-.12-.06-.17-.21-.1-.33l1.02-1.91c.06-.12.21-.17.33-.1.12.06.17.21.1.33l-1.02,1.91s-.03.04-.04.06Z" />
                              <path d="M11.48,7s-.04.04-.07.05l-4.19,1.9c-.12.06-.27,0-.33-.12-.06-.12,0-.27.12-.33l4.19-1.9c.12-.06.27,0,.33.12.04.1.02.21-.05.28Z" />
                            </g>
                          </g>
                          <rect
                            className="cls-11"
                            x={0}
                            width={12}
                            height="10.18"
                          />
                        </g>
                      </g>
                    </svg>
                    <span> &nbsp;&nbsp;{iscore?.player_2_name}</span>
                    {iscore?.strike === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_2"
                        data-name="Layer 2"
                        height="12px"
                        width="12px"
                        viewBox="0 0 10.07 10.07"
                      >
                        <defs></defs>
                        <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                            <g>
                              <path
                                className="cls-1b"
                                d="M7.38,4.2l-5.3,5.3c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52Z"
                              />
                              <g>
                                <path d="M7.72,4.06l-1.71-1.71c-.08-.08-.21-.08-.29,0L.32,7.74c-.43.43-.43,1.13,0,1.56l.44.44c.43.43,1.13.43,1.56,0l5.39-5.39c.08-.08.08-.21,0-.29ZM2.08,9.5c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52-5.3,5.3Z" />
                                <path d="M9.23,0l-3.04,3.04-1.5,2.29s.02.07.05.05l2.29-1.5,3.04-3.04-.83-.83Z" />
                              </g>
                              <g>
                                <rect
                                  className="cls-4b"
                                  x={9}
                                  y=".57"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.28 -6.36) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="8.46"
                                  y="1.1"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.5 -5.82) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="7.92"
                                  y="1.64"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.72 -5.29) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="7.39"
                                  y="2.17"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.94 -4.75) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="6.85"
                                  y="2.71"
                                  width=".64"
                                  height=".42"
                                  transform="translate(4.17 -4.22) rotate(45)"
                                />
                              </g>
                              <polygon
                                className="cls-3b"
                                points="6.86 3.68 5.48 4.58 6.38 3.21 6.86 3.68"
                              />
                            </g>
                            <rect
                              className="cls-2b"
                              y={0}
                              width="10.07"
                              height="10.07"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_2_run}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_2_ball}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_2_four}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_2_six}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {iscore?.player_2_sr}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Bowler Desktop */}
        <div className="sc_cw-table-desktop">
          <div className="sc_cw-table-container-desktop">
            <table className="sc_cw-table-structure-desktop">
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th className="sc_cw-table-structure-desktop-align">O</th>
                  <th className="sc_cw-table-structure-desktop-align">R</th>
                  <th className="sc_cw-table-structure-desktop-align">M</th>
                  <th className="sc_cw-table-structure-desktop-align">W</th>
                  <th className="sc_cw-table-structure-desktop-align">Eco</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2 000/svg"
                      height={12}
                      width={12}
                      id="Layer_2"
                      data-name="Layer 2"
                      viewBox="0 0 12 12"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <circle className="cls-13" cx={6} cy={6} r={6} />
                          <path
                            className="cls-13"
                            d="M10.74,9.68c-.13.16-.26.32-.4.47-.03.03-.06.06-.09.09-.09.09-.18.18-.28.26-.18.16-.38.31-.57.45-.18.12-.37.24-.56.34-.14.07-.28.14-.42.2-.09.04-.19.08-.28.12-.03.01-.07.03-.1.04-2.12.76-4.57.29-6.27-1.41C-.56,7.92-.59,4.18,1.69,1.83c.02-.02.05-.05.07-.07.18-.18.37-.35.56-.5.05-.04.11-.08.16-.12.2-.14.4-.27.61-.39.11-.06.22-.12.34-.17.12-.06.25-.11.37-.16C5.96-.43,8.5.02,10.24,1.76c2.16,2.16,2.33,5.57.5,7.92Z"
                          />
                          <path
                            className="cls-23"
                            d="M3.43.58s.05.02.08.03c.13.03.26-.06.3-.19-.13.05-.25.1-.37.16ZM3.48.78c-.14-.01-.27.09-.28.23-.02.23-.04.47-.04.71,0,.07.03.14.07.19.04.04.11.07.18.07.14,0,.26-.11.26-.25,0-.22.02-.44.04-.66.01-.14-.09-.27-.23-.28ZM10.34,9.63c-.14-.02-.27.08-.29.21-.01.08.02.16.07.22.04.04.09.06.14.07.02,0,.05,0,.07,0,.14-.15.28-.31.4-.47-.13-.01-.27-.03-.4-.05ZM3.75,3.05c-.03-.22-.06-.44-.07-.66,0-.14-.13-.25-.27-.24-.14,0-.25.13-.24.27.02.23.04.47.08.7,0,.06.03.11.07.14.06.06.14.08.22.07.14-.02.24-.15.21-.29ZM9.69,9.51c-.21-.05-.43-.11-.64-.18-.13-.04-.28.03-.32.16-.03.09,0,.19.06.26.03.03.06.05.1.06.22.07.45.14.68.19.14.03.28-.05.31-.19.03-.14-.05-.28-.19-.31ZM4.06,4.34c-.07-.21-.13-.43-.18-.64-.03-.14-.17-.22-.31-.19-.14.03-.22.17-.19.31.05.23.12.46.19.68.01.04.03.07.06.1.07.07.17.09.26.06.13-.04.21-.19.16-.32ZM8.43,9.09c-.2-.09-.4-.18-.6-.29-.12-.07-.28-.02-.35.11-.05.1-.03.22.04.3.02.02.04.03.06.04.21.11.42.21.64.31.13.06.28,0,.34-.14.06-.13,0-.28-.13-.34ZM4.58,5.56c-.1-.2-.2-.4-.29-.6-.06-.13-.21-.19-.34-.13-.13.06-.19.21-.13.34.09.22.2.43.31.64.01.02.03.04.04.06.08.08.2.1.3.04.12-.07.17-.22.11-.35ZM7.25,8.47c-.19-.12-.37-.25-.54-.38-.11-.09-.27-.07-.36.05-.08.1-.07.25.02.34,0,0,.02.01.02.02.19.14.38.28.58.41.12.08.28.04.35-.08.08-.12.04-.28-.08-.35ZM5.3,6.68c-.14-.17-.27-.36-.39-.54-.08-.12-.23-.15-.35-.08-.12.08-.15.23-.08.35.13.2.27.39.41.58,0,0,.01.02.02.02.09.09.23.1.34.02.11-.09.13-.25.05-.36ZM6.2,7.66c-.16-.15-.32-.31-.47-.47-.1-.1-.26-.11-.36-.01-.1.1-.11.26-.01.36.08.09.16.17.24.25.08.08.17.17.26.25.1.1.27.09.36-.02.1-.1.09-.27-.02-.36Z"
                          />
                          <path
                            className="cls-23"
                            d="M3.09.75c-.21.12-.42.25-.61.39-.1.51-.15,1.03-.15,1.56,0,1.08.21,2.14.61,3.14.42,1.04,1.04,1.96,1.83,2.76.8.8,1.73,1.41,2.76,1.83.6.24,1.22.41,1.85.51.2-.14.39-.29.57-.45-1.76-.16-3.48-.91-4.83-2.26C3.11,6.22,2.43,3.34,3.09.75Z"
                          />
                          <path
                            className="cls-23"
                            d="M2.32,1.26c-.2.15-.38.32-.56.5-.02.02-.05.05-.07.07,0,.04-.02.08-.02.12-.02.09.01.17.07.23.03.03.08.06.13.07.14.03.27-.06.3-.2.04-.22.09-.43.15-.65.01-.05.01-.09,0-.13ZM1.84,2.42c-.14-.01-.27.09-.28.23-.02.23-.04.47-.04.71,0,.07.03.14.07.19.04.04.11.07.18.07.14,0,.26-.11.26-.25,0-.22.02-.44.04-.66.01-.14-.09-.27-.23-.28ZM8.7,11.27c-.14-.02-.27.08-.29.21,0,0,0,0,0,0,.14-.06.28-.13.42-.2-.04,0-.09-.01-.13-.02ZM2.11,4.69c-.03-.22-.06-.44-.07-.66,0-.14-.13-.25-.27-.24-.14,0-.25.13-.24.27.01.23.04.47.08.7,0,.06.03.11.07.14.06.06.14.08.22.07.14-.02.24-.15.21-.29ZM8.05,11.15c-.21-.05-.43-.11-.64-.18-.13-.04-.28.03-.32.16-.03.09,0,.19.06.26.03.03.06.05.1.06.22.07.45.14.68.19.03,0,.06,0,.09,0,.04,0,.07-.02.1-.04.05-.03.09-.09.11-.16.03-.14-.05-.28-.19-.31ZM2.42,5.98c-.07-.21-.13-.42-.18-.64-.03-.14-.17-.22-.31-.19-.14.03-.22.17-.19.31.05.23.12.46.19.68.01.04.03.07.06.1.07.07.17.09.26.06.13-.04.21-.19.16-.32ZM6.79,10.73c-.2-.09-.4-.18-.6-.29-.12-.07-.28-.02-.35.11-.05.1-.03.22.04.3.02.02.04.03.06.04.21.11.42.21.64.31.13.06.28,0,.34-.13.06-.13,0-.28-.13-.34ZM2.94,7.2c-.1-.2-.2-.4-.29-.6-.06-.13-.21-.19-.34-.13-.13.06-.19.21-.13.34.09.22.2.43.31.64.01.02.03.04.04.06.08.08.2.1.3.04.12-.07.17-.22.11-.35ZM5.61,10.11c-.19-.12-.37-.25-.54-.38-.11-.09-.27-.07-.36.05-.08.1-.07.25.02.34,0,0,.02.01.02.02.19.14.38.28.58.41.12.08.28.04.35-.08.08-.12.04-.28-.08-.35ZM3.66,8.32c-.14-.17-.27-.36-.39-.54-.08-.12-.23-.15-.35-.08-.12.08-.15.23-.08.35.13.2.27.39.41.58,0,0,.01.02.02.02.09.09.23.1.34.02.11-.09.13-.25.05-.36ZM4.56,9.3c-.08-.08-.16-.15-.24-.23,0,0,0,0,0,0-.08-.08-.15-.16-.23-.24-.1-.1-.26-.11-.36-.01-.1.1-.11.26-.01.36.08.09.16.17.24.25,0,0,0,0,0,0,.08.08.17.17.26.25.1.1.27.09.36-.02.1-.1.09-.27-.02-.36Z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>&nbsp;&nbsp; {iscore?.bowler}</span>
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {" "}
                    {iscore?.bowlerOvers}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {" "}
                    {iscore?.bowlerRuns}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">-</td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {" "}
                    {iscore?.bowlerWickets}
                  </td>
                  <td className="sc_cw-table-structure-desktop-align">
                    {" "}
                    {iscore?.bowlerEco}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Batsmen Mobile */}
        <div className="sc_cw-table-mobile">
          <div className="sc_cw-table-container-mobile">
            <table className="sc_cw-table-structure-mobile">
              <thead>
                <tr style={{ borderBottom: "0.5px solid #fff !important" }}>
                  <th>Batsmen</th>
                  <th className="sc_cw-table-structure-mobile-align">R</th>
                  <th className="sc_cw-table-structure-mobile-align">B</th>
                  <th className="sc_cw-table-structure-mobile-align">4s</th>
                  <th className="sc_cw-table-structure-mobile-align">6s</th>
                  <th className="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">
                    SR
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_2"
                      data-name="Layer 2"
                      height="12px"
                      width="12px"
                      viewBox="0 0 12 10.18"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <g>
                            <path
                              className="cls-21"
                              d="M9.88.32h0c.38.38.38,1.01,0,1.39L1.76,9.83h-.01c-.34-.35-.62-.72-.84-1.11C-.2,6.77.08,4.24,1.75,2.57c1.42-1.42,3.46-1.83,5.24-1.24.63.21,1.33.11,1.87-.28l1.03-.73Z"
                            />
                            <g>
                              <circle cx="7.14" cy="4.43" r=".23" />
                              <path d="M10.05,1.89l-1.99,1.99c-.1.1-.25.1-.35,0s-.1-.25,0-.35l1.99-1.99c.24-.24.28-.6.12-.88l-.84.59c-.6.43-1.39.55-2.09.31-1.76-.58-3.67-.13-4.98,1.18C.38,4.29.05,6.7,1.12,8.6c.18.32.39.61.64.88l4.45-4.45c.1-.1.25-.1.35,0s.1.25,0,.35L1.76,10.18l-.19-.19c-.35-.35-.64-.73-.88-1.15C-.49,6.75-.13,4.1,1.57,2.4c.72-.72,1.62-1.21,2.6-1.44.96-.22,1.96-.17,2.89.14.56.18,1.17.09,1.65-.25l1.2-.85.15.15c.48.48.48,1.26,0,1.74Z" />
                              <path d="M3.6,5.25c.11-.11.28-.11.39,0s.11.28,0,.39l-1.28,1.28c-.11.11-.28.11-.39,0s-.11-.28,0-.39l1.28-1.28M3.25,4.9l-1.28,1.28c-.3.3-.3.79,0,1.09h0c.3.3.79.3,1.09,0l1.28-1.28c.3-.3.3-.79,0-1.09h0c-.3-.3-.79-.3-1.09,0h0Z" />
                              <path d="M11.91,9.74l-4.85.18c-.74.03-1.47-.15-2.11-.52l-1.7-.97c-.12-.07-.16-.22-.09-.34s.22-.16.34-.09l1.7.97c.56.32,1.2.48,1.85.46l4.42-.16c.15-1.87-.06-3.5-.65-4.95l-4.02,3.73c-.1.09-.26.09-.35-.01-.09-.1-.09-.25,0-.34,0,0,0,0,0,0l4.53-4.2.14.31c.76,1.66,1.02,3.54.81,5.73l-.02.22Z" />
                              <path d="M7.88,9.83s-.03.02-.04.03c-.11.07-.27.04-.34-.07l-2.22-3.44c-.07-.11-.04-.27.07-.34.11-.07.27-.04.34.07l2.22,3.44c.06.1.05.23-.03.31Z" />
                              <path d="M5.37,9.44c-.08.08-.19.1-.29.04-.12-.06-.17-.21-.1-.33l1.02-1.91c.06-.12.21-.17.33-.1.12.06.17.21.1.33l-1.02,1.91s-.03.04-.04.06Z" />
                              <path d="M11.48,7s-.04.04-.07.05l-4.19,1.9c-.12.06-.27,0-.33-.12-.06-.12,0-.27.12-.33l4.19-1.9c.12-.06.27,0,.33.12.04.1.02.21-.05.28Z" />
                            </g>
                          </g>
                          <rect
                            className="cls-11"
                            x={0}
                            width={12}
                            height="10.18"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>&nbsp;&nbsp;{iscore?.player_1_name}</span>

                    {iscore?.strike === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_2"
                        data-name="Layer 2"
                        height="12px"
                        width="12px"
                        viewBox="0 0 10.07 10.07"
                      >
                        <defs></defs>
                        <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                            <g>
                              <path
                                className="cls-1b"
                                d="M7.38,4.2l-5.3,5.3c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52Z"
                              />
                              <g>
                                <path d="M7.72,4.06l-1.71-1.71c-.08-.08-.21-.08-.29,0L.32,7.74c-.43.43-.43,1.13,0,1.56l.44.44c.43.43,1.13.43,1.56,0l5.39-5.39c.08-.08.08-.21,0-.29ZM2.08,9.5c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52-5.3,5.3Z" />
                                <path d="M9.23,0l-3.04,3.04-1.5,2.29s.02.07.05.05l2.29-1.5,3.04-3.04-.83-.83Z" />
                              </g>
                              <g>
                                <rect
                                  className="cls-4b"
                                  x={9}
                                  y=".57"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.28 -6.36) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="8.46"
                                  y="1.1"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.5 -5.82) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="7.92"
                                  y="1.64"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.72 -5.29) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="7.39"
                                  y="2.17"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.94 -4.75) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="6.85"
                                  y="2.71"
                                  width=".64"
                                  height=".42"
                                  transform="translate(4.17 -4.22) rotate(45)"
                                />
                              </g>
                              <polygon
                                className="cls-3b"
                                points="6.86 3.68 5.48 4.58 6.38 3.21 6.86 3.68"
                              />
                            </g>
                            <rect
                              className="cls-2b"
                              y={0}
                              width="10.07"
                              height="10.07"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {" "}
                    {iscore?.player_1_run}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.player_1_ball}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {" "}
                    {iscore?.player_1_four}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.player_1_six}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">
                    {iscore?.player_1_sr}
                  </td>
                </tr>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_2"
                      data-name="Layer 2"
                      height="12px"
                      width="12px"
                      viewBox="0 0 12 10.18"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <g>
                            <path
                              className="cls-21"
                              d="M9.88.32h0c.38.38.38,1.01,0,1.39L1.76,9.83h-.01c-.34-.35-.62-.72-.84-1.11C-.2,6.77.08,4.24,1.75,2.57c1.42-1.42,3.46-1.83,5.24-1.24.63.21,1.33.11,1.87-.28l1.03-.73Z"
                            />
                            <g>
                              <circle cx="7.14" cy="4.43" r=".23" />
                              <path d="M10.05,1.89l-1.99,1.99c-.1.1-.25.1-.35,0s-.1-.25,0-.35l1.99-1.99c.24-.24.28-.6.12-.88l-.84.59c-.6.43-1.39.55-2.09.31-1.76-.58-3.67-.13-4.98,1.18C.38,4.29.05,6.7,1.12,8.6c.18.32.39.61.64.88l4.45-4.45c.1-.1.25-.1.35,0s.1.25,0,.35L1.76,10.18l-.19-.19c-.35-.35-.64-.73-.88-1.15C-.49,6.75-.13,4.1,1.57,2.4c.72-.72,1.62-1.21,2.6-1.44.96-.22,1.96-.17,2.89.14.56.18,1.17.09,1.65-.25l1.2-.85.15.15c.48.48.48,1.26,0,1.74Z" />
                              <path d="M3.6,5.25c.11-.11.28-.11.39,0s.11.28,0,.39l-1.28,1.28c-.11.11-.28.11-.39,0s-.11-.28,0-.39l1.28-1.28M3.25,4.9l-1.28,1.28c-.3.3-.3.79,0,1.09h0c.3.3.79.3,1.09,0l1.28-1.28c.3-.3.3-.79,0-1.09h0c-.3-.3-.79-.3-1.09,0h0Z" />
                              <path d="M11.91,9.74l-4.85.18c-.74.03-1.47-.15-2.11-.52l-1.7-.97c-.12-.07-.16-.22-.09-.34s.22-.16.34-.09l1.7.97c.56.32,1.2.48,1.85.46l4.42-.16c.15-1.87-.06-3.5-.65-4.95l-4.02,3.73c-.1.09-.26.09-.35-.01-.09-.1-.09-.25,0-.34,0,0,0,0,0,0l4.53-4.2.14.31c.76,1.66,1.02,3.54.81,5.73l-.02.22Z" />
                              <path d="M7.88,9.83s-.03.02-.04.03c-.11.07-.27.04-.34-.07l-2.22-3.44c-.07-.11-.04-.27.07-.34.11-.07.27-.04.34.07l2.22,3.44c.06.1.05.23-.03.31Z" />
                              <path d="M5.37,9.44c-.08.08-.19.1-.29.04-.12-.06-.17-.21-.1-.33l1.02-1.91c.06-.12.21-.17.33-.1.12.06.17.21.1.33l-1.02,1.91s-.03.04-.04.06Z" />
                              <path d="M11.48,7s-.04.04-.07.05l-4.19,1.9c-.12.06-.27,0-.33-.12-.06-.12,0-.27.12-.33l4.19-1.9c.12-.06.27,0,.33.12.04.1.02.21-.05.28Z" />
                            </g>
                          </g>
                          <rect
                            className="cls-11"
                            x={0}
                            width={12}
                            height="10.18"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>&nbsp;&nbsp;{iscore?.player_2_name}</span>
                    {iscore?.strike === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_2"
                        data-name="Layer 2"
                        height="12px"
                        width="12px"
                        viewBox="0 0 10.07 10.07"
                      >
                        <defs></defs>
                        <g id="Layer_1-2" data-name="Layer 1">
                          <g>
                            <g>
                              <path
                                className="cls-1b"
                                d="M7.38,4.2l-5.3,5.3c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52Z"
                              />
                              <g>
                                <path d="M7.72,4.06l-1.71-1.71c-.08-.08-.21-.08-.29,0L.32,7.74c-.43.43-.43,1.13,0,1.56l.44.44c.43.43,1.13.43,1.56,0l5.39-5.39c.08-.08.08-.21,0-.29ZM2.08,9.5c-.3.3-.78.3-1.08,0l-.44-.44c-.3-.3-.3-.78,0-1.08L5.86,2.68l1.52,1.52-5.3,5.3Z" />
                                <path d="M9.23,0l-3.04,3.04-1.5,2.29s.02.07.05.05l2.29-1.5,3.04-3.04-.83-.83Z" />
                              </g>
                              <g>
                                <rect
                                  className="cls-4b"
                                  x={9}
                                  y=".57"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.28 -6.36) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="8.46"
                                  y="1.1"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.5 -5.82) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="7.92"
                                  y="1.64"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.72 -5.29) rotate(45)"
                                />
                                <rect
                                  className="cls-3b"
                                  x="7.39"
                                  y="2.17"
                                  width=".64"
                                  height=".42"
                                  transform="translate(3.94 -4.75) rotate(45)"
                                />
                                <rect
                                  className="cls-4b"
                                  x="6.85"
                                  y="2.71"
                                  width=".64"
                                  height=".42"
                                  transform="translate(4.17 -4.22) rotate(45)"
                                />
                              </g>
                              <polygon
                                className="cls-3b"
                                points="6.86 3.68 5.48 4.58 6.38 3.21 6.86 3.68"
                              />
                            </g>
                            <rect
                              className="cls-2b"
                              y={0}
                              width="10.07"
                              height="10.07"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {" "}
                    {iscore?.player_2_run}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.player_2_ball}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {" "}
                    {iscore?.player_2_four}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.player_2_six}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">
                    {iscore?.player_2_sr}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Bowler Mobile */}
        <div className="sc_cw-table-mobile" style={{ marginTop: "3px" }}>
          <div className="sc_cw-table-container-mobile">
            <table className="sc_cw-table-structure-mobile">
              <thead>
                <tr style={{ borderBottom: "0.5px solid #fff !important" }}>
                  <th>Bowler</th>
                  <th className="sc_cw-table-structure-mobile-align">O</th>
                  <th className="sc_cw-table-structure-mobile-align">R</th>
                  <th className="sc_cw-table-structure-mobile-align">M</th>
                  <th className="sc_cw-table-structure-mobile-align">W</th>
                  <th className="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">
                    Eco
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ display: "flex" }}>
                    <svg
                      xmlns="http://www.w3.org/2 000/svg"
                      height={11}
                      width={11}
                      id="Layer_2"
                      data-name="Layer 2"
                      viewBox="0 0 12 12"
                    >
                      <defs></defs>
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                          <circle className="cls-13" cx={6} cy={6} r={6} />
                          <path
                            className="cls-13"
                            d="M10.74,9.68c-.13.16-.26.32-.4.47-.03.03-.06.06-.09.09-.09.09-.18.18-.28.26-.18.16-.38.31-.57.45-.18.12-.37.24-.56.34-.14.07-.28.14-.42.2-.09.04-.19.08-.28.12-.03.01-.07.03-.1.04-2.12.76-4.57.29-6.27-1.41C-.56,7.92-.59,4.18,1.69,1.83c.02-.02.05-.05.07-.07.18-.18.37-.35.56-.5.05-.04.11-.08.16-.12.2-.14.4-.27.61-.39.11-.06.22-.12.34-.17.12-.06.25-.11.37-.16C5.96-.43,8.5.02,10.24,1.76c2.16,2.16,2.33,5.57.5,7.92Z"
                          />
                          <path
                            className="cls-23"
                            d="M3.43.58s.05.02.08.03c.13.03.26-.06.3-.19-.13.05-.25.1-.37.16ZM3.48.78c-.14-.01-.27.09-.28.23-.02.23-.04.47-.04.71,0,.07.03.14.07.19.04.04.11.07.18.07.14,0,.26-.11.26-.25,0-.22.02-.44.04-.66.01-.14-.09-.27-.23-.28ZM10.34,9.63c-.14-.02-.27.08-.29.21-.01.08.02.16.07.22.04.04.09.06.14.07.02,0,.05,0,.07,0,.14-.15.28-.31.4-.47-.13-.01-.27-.03-.4-.05ZM3.75,3.05c-.03-.22-.06-.44-.07-.66,0-.14-.13-.25-.27-.24-.14,0-.25.13-.24.27.02.23.04.47.08.7,0,.06.03.11.07.14.06.06.14.08.22.07.14-.02.24-.15.21-.29ZM9.69,9.51c-.21-.05-.43-.11-.64-.18-.13-.04-.28.03-.32.16-.03.09,0,.19.06.26.03.03.06.05.1.06.22.07.45.14.68.19.14.03.28-.05.31-.19.03-.14-.05-.28-.19-.31ZM4.06,4.34c-.07-.21-.13-.43-.18-.64-.03-.14-.17-.22-.31-.19-.14.03-.22.17-.19.31.05.23.12.46.19.68.01.04.03.07.06.1.07.07.17.09.26.06.13-.04.21-.19.16-.32ZM8.43,9.09c-.2-.09-.4-.18-.6-.29-.12-.07-.28-.02-.35.11-.05.1-.03.22.04.3.02.02.04.03.06.04.21.11.42.21.64.31.13.06.28,0,.34-.14.06-.13,0-.28-.13-.34ZM4.58,5.56c-.1-.2-.2-.4-.29-.6-.06-.13-.21-.19-.34-.13-.13.06-.19.21-.13.34.09.22.2.43.31.64.01.02.03.04.04.06.08.08.2.1.3.04.12-.07.17-.22.11-.35ZM7.25,8.47c-.19-.12-.37-.25-.54-.38-.11-.09-.27-.07-.36.05-.08.1-.07.25.02.34,0,0,.02.01.02.02.19.14.38.28.58.41.12.08.28.04.35-.08.08-.12.04-.28-.08-.35ZM5.3,6.68c-.14-.17-.27-.36-.39-.54-.08-.12-.23-.15-.35-.08-.12.08-.15.23-.08.35.13.2.27.39.41.58,0,0,.01.02.02.02.09.09.23.1.34.02.11-.09.13-.25.05-.36ZM6.2,7.66c-.16-.15-.32-.31-.47-.47-.1-.1-.26-.11-.36-.01-.1.1-.11.26-.01.36.08.09.16.17.24.25.08.08.17.17.26.25.1.1.27.09.36-.02.1-.1.09-.27-.02-.36Z"
                          />
                          <path
                            className="cls-23"
                            d="M3.09.75c-.21.12-.42.25-.61.39-.1.51-.15,1.03-.15,1.56,0,1.08.21,2.14.61,3.14.42,1.04,1.04,1.96,1.83,2.76.8.8,1.73,1.41,2.76,1.83.6.24,1.22.41,1.85.51.2-.14.39-.29.57-.45-1.76-.16-3.48-.91-4.83-2.26C3.11,6.22,2.43,3.34,3.09.75Z"
                          />
                          <path
                            className="cls-23"
                            d="M2.32,1.26c-.2.15-.38.32-.56.5-.02.02-.05.05-.07.07,0,.04-.02.08-.02.12-.02.09.01.17.07.23.03.03.08.06.13.07.14.03.27-.06.3-.2.04-.22.09-.43.15-.65.01-.05.01-.09,0-.13ZM1.84,2.42c-.14-.01-.27.09-.28.23-.02.23-.04.47-.04.71,0,.07.03.14.07.19.04.04.11.07.18.07.14,0,.26-.11.26-.25,0-.22.02-.44.04-.66.01-.14-.09-.27-.23-.28ZM8.7,11.27c-.14-.02-.27.08-.29.21,0,0,0,0,0,0,.14-.06.28-.13.42-.2-.04,0-.09-.01-.13-.02ZM2.11,4.69c-.03-.22-.06-.44-.07-.66,0-.14-.13-.25-.27-.24-.14,0-.25.13-.24.27.01.23.04.47.08.7,0,.06.03.11.07.14.06.06.14.08.22.07.14-.02.24-.15.21-.29ZM8.05,11.15c-.21-.05-.43-.11-.64-.18-.13-.04-.28.03-.32.16-.03.09,0,.19.06.26.03.03.06.05.1.06.22.07.45.14.68.19.03,0,.06,0,.09,0,.04,0,.07-.02.1-.04.05-.03.09-.09.11-.16.03-.14-.05-.28-.19-.31ZM2.42,5.98c-.07-.21-.13-.42-.18-.64-.03-.14-.17-.22-.31-.19-.14.03-.22.17-.19.31.05.23.12.46.19.68.01.04.03.07.06.1.07.07.17.09.26.06.13-.04.21-.19.16-.32ZM6.79,10.73c-.2-.09-.4-.18-.6-.29-.12-.07-.28-.02-.35.11-.05.1-.03.22.04.3.02.02.04.03.06.04.21.11.42.21.64.31.13.06.28,0,.34-.13.06-.13,0-.28-.13-.34ZM2.94,7.2c-.1-.2-.2-.4-.29-.6-.06-.13-.21-.19-.34-.13-.13.06-.19.21-.13.34.09.22.2.43.31.64.01.02.03.04.04.06.08.08.2.1.3.04.12-.07.17-.22.11-.35ZM5.61,10.11c-.19-.12-.37-.25-.54-.38-.11-.09-.27-.07-.36.05-.08.1-.07.25.02.34,0,0,.02.01.02.02.19.14.38.28.58.41.12.08.28.04.35-.08.08-.12.04-.28-.08-.35ZM3.66,8.32c-.14-.17-.27-.36-.39-.54-.08-.12-.23-.15-.35-.08-.12.08-.15.23-.08.35.13.2.27.39.41.58,0,0,.01.02.02.02.09.09.23.1.34.02.11-.09.13-.25.05-.36ZM4.56,9.3c-.08-.08-.16-.15-.24-.23,0,0,0,0,0,0-.08-.08-.15-.16-.23-.24-.1-.1-.26-.11-.36-.01-.1.1-.11.26-.01.36.08.09.16.17.24.25,0,0,0,0,0,0,.08.08.17.17.26.25.1.1.27.09.36-.02.1-.1.09-.27-.02-.36Z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span>&nbsp;&nbsp;{iscore?.bowler}</span>
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {" "}
                    {iscore?.bowlerOvers}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.bowlerRuns}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align">-</td>
                  <td className="sc_cw-table-structure-mobile-align">
                    {iscore?.bowlerWickets}
                  </td>
                  <td className="sc_cw-table-structure-mobile-align sc_cs-table-structure-last-column">
                    {iscore?.bowlerEco}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
