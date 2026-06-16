import { Fragment, useState } from "react";
import { Pagination } from "rsuite";
import { useNavigate } from "react-router-dom";
import useWhatsApp from "../../hooks/whatsapp";
import AddNewUser from "../../components/modals/Affiliate/AddNewUser";
import images from "../../assets/images";
import { useIndexQuery } from "../../hooks";

const UserList = () => {
  const navigate = useNavigate();
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { data: socialLink } = useWhatsApp();
  const { data } = useIndexQuery({
    type: "get_affiliate_users",
    page: activePage,
  });

  const meta = data?.pagination;

  return (
    <Fragment>
      {showAddNewUserModal && (
        <AddNewUser setShowAddNewUserModal={setShowAddNewUserModal} />
      )}
      <section
        data-v-fd406c30
        className="nw-affi-user-wrapper affi-pd-bot"
        style={{ background: "transparent", padding: "0px" }}
      >
        <div data-v-fd406c30 className>
          <div data-v-fd406c30 className="nw-affi-user-list-wrapper">
            <h3 data-v-fd406c30 className="nw-affi-heading-text">
              User List
            </h3>
            <div
              data-v-fd406c30
              className="table-responsive nw-affi-user-table"
            >
              <table data-v-fd406c30 className="table">
                <thead data-v-fd406c30>
                  <tr data-v-fd406c30>
                    <th data-v-fd406c30>
                      <img
                        data-v-fd406c30
                        src={images.user}
                        alt="affi-user-icn"
                      />{" "}
                      User Name
                    </th>
                    <th data-v-fd406c30>
                      <img
                        data-v-fd406c30
                        src={images.commission}
                        alt="affi-commision-icon"
                      />{" "}
                      Balance
                    </th>
                    <th data-v-fd406c30>
                      <img
                        data-v-fd406c30
                        src={images.calendar}
                        alt="affi-calendar"
                      />{" "}
                      Created Date Time
                    </th>
                    <th data-v-fd406c30>
                      <img
                        data-v-fd406c30
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZVJREFUWIXtl08rhUEUxn8HO4qVKAtEwsKflSxYyEe4X4PIRkpkK/kcvoIit9ydv0UWtq66K3S3t8finVvX28vMdSdv5NnMvOc9c55nZs6pOZAzLMsoqQeYBzoj8VSBkpm9ej0lDUt6VnyUJQ2l+ToyNKwCfcAV8Njq1h1GgBlgBVj70lPSkVNciESOpIKLeZT+1xaL5LsIEiBpWtJULgIc8QVwWRch6Swg6U6jCEjradLfi6wq+AAzu5E06+a3blz8MQF1EbEI08i9CrwnIKkXKLrPBTOrSFoH5jxLS2Z22LIAYAoYa5gfAxtAv2fdPBBFwAmwR1IBJ862DEx41t0HxA6qghqwnbLdAXchBD78iiRsB3ZJrmDHzGqSJgm4AndSrQkAloAtNy+SJOEx/iR8AgZiCLgGHkhO4NrZ9gkow4DYQUlYAcZTtoOQ4CHIPQn/3HvgRdJoVAFpPU36e/H/Hsi9CrJO4NmNmxF7g3piPnk9lbRm5SZarlCUJQ2m+T5rTrtJHhRdLey6EVXg3MzeIsWLh3fh94EUshpERQAAAABJRU5ErkJggg=="
                        alt="affi-calendar"
                      />{" "}
                      Statement
                    </th>
                    <th data-v-fd406c30>
                      <img
                        data-v-fd406c30
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAsJJREFUWIW9lj9MZUUUh79BQC2W5ypYuAk+Y6KJJFZmg9poKLRwt9iG1ixiLI0da0UU691igWCBiUY02WY7TQSNzQKx0cIlmzWAJFYoGMyGP+K3xRtgGO97D5+8d5Kbufd3zpnz3bkzcwcyU6+pz+Z6S0y9ZMV+UDtbXfycuu6RfdjK4m3qrMdtX32lVQBXLLZf1bPNLv6CulMFQPXTZtZvA14FPgFmMt8dYAq4p5abCQGAWs7efLrpRYH2RpLivBgAegGBNeCbEMJm9D8GDAI/AvMhhP2TdFp3BNTH1Sl1t2Cu7KqTak+MfTuupDX1LTX8LwC1T13NYt6NV2oral/MGUv0GbWjIYD45nnxBfWheC0UQPRE31KiX28UYCrzzaVvo3ao32UxE9E3nOkv/ScA9az//uZvRN+oOhrvL2QxO2op5m8n+pdp3baqQ3JkA0D+7bZj+yLwvvoLMJHFdAIDIYQN4OdEf91kQp4E4MkCbTC2rwHPAzeBJwriyrFdTbQu4NGDh3Qf2MqSSzWghtS/gI+B2yGE99QuYKhK/Gb2fAb4HY6PwB8ZRG9sVwo6/A24CPwEfB21LwrilqsAHdohQAhB4KvE16c+AswCe1neOyGEp4Ex4FbUHs5idoG5egDHTD2v/pPM2KGoT2Yz/NtsGXYWLMPxxD+d+cq1IMaTwCX1QSubykrWyaJHG9Fi5ltWuxsF6FA/T4I/iHpfAUTRVrysPpf1eXKAmBDUy1ZORPvqcNS71QmLDzA7Vkavu6C/qgA1/1BqG9BPZa3fCCGsR71EZYM62CNWgdkQwp9V+pkG3kykp0IIKzVH4TSt1gg0dCA5YdEyMBIf8x/QR+oWcLdZ9Q8gPiuYKwe2p/Y3G6AUV0WRjdTv4XQgXlb/zop/rz7QEoAIkR7NNtTe+lmnC9CuzkeAwfoZzYF4Rr2a6/cBie1nBB1Hma0AAAAASUVORK5CYII="
                        alt="affi-calendar"
                      />{" "}
                      Profit / Loss
                    </th>
                  </tr>
                </thead>
                <tbody data-v-fd406c30>
                  {data?.result?.length > 0 ? (
                    data?.result?.map((item) => {
                      return (
                        <tr key={item?.punter_id} data-v-fd406c30="">
                          <td data-v-fd406c30="">{item?.username}</td>
                          <td data-v-fd406c30="">
                            <span
                              data-v-fd406c30=""
                              className="affi-green-text"
                            >
                              {item?.credit_limit}
                            </span>
                          </td>
                          <td data-v-fd406c30="">{item?.date_added}</td>
                          <td data-v-fd406c30="">
                            <button
                              onClick={() =>
                                navigate(
                                  `/affiliate/user-statement?punter_id=${item?.punter_id}`,
                                )
                              }
                              style={{
                                height: "auto",
                                marginTop: "0px",
                                width: "auto",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                margin: "auto",
                                background: "var(--theme-primary-color)",
                                color: "white",
                              }}
                              data-v-fd406c30=""
                              className="submit-btn rounded"
                            >
                              View
                            </button>
                          </td>
                          <td data-v-fd406c30="">
                            <button
                              onClick={() =>
                                navigate(
                                  `/affiliate/profit-loss?punter_id=${item?.punter_id}`,
                                )
                              }
                              style={{
                                height: "auto",
                                marginTop: "0px",
                                width: "auto",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                margin: "auto",
                                background: "var(--theme-primary-color)",
                                color: "white",
                              }}
                              data-v-fd406c30=""
                              className="submit-btn rounded"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr data-v-fd406c30 className="tabetdat">
                      <td data-v-fd406c30 colSpan={5}>
                        <div
                          data-v-fd406c30
                          className="text-center affiliate-no-recoard-data"
                        >
                          No Records Found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Pagination
                prev
                next
                size="md"
                total={meta?.totalRecords}
                limit={meta?.recordsPerPage}
                activePage={activePage}
                onChangePage={setActivePage}
                maxButtons={5}
                ellipsis
                boundaryLinks
              />
            </div>
            {socialLink?.referral_create_account && (
              <div data-v-fd406c30 className="nw-affi-add-new-user-btn-sec">
                <button
                  onClick={() => setShowAddNewUserModal(true)}
                  className="nw-affi-add-new-user-btn"
                  data-bs-target="#AfAddNewUser"
                  data-bs-toggle="modal"
                  data-v-4c49d924
                >
                  <span data-v-4c49d924>ADD NEW USER</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserList;
