import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShareAffiliateLink from "../../components/modals/Affiliate/ShareAffiliateLink";
import images from "../../assets/images";

const Footer = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");
  const [showShareAffiliateLink, setShowShareAffiliateLink] = useState(false);
  const navigate = useNavigate();

  const handleChangeTab = (t) => {
    navigate(`/affiliate?tab=${t}`);
  };
  return (
    <Fragment>
      {showShareAffiliateLink && (
        <ShareAffiliateLink
          setShowShareAffiliateLink={setShowShareAffiliateLink}
        />
      )}
      <footer data-v-066114c4 className="affilate_footer">
        <nav data-v-066114c4>
          <a
            data-v-066114c4
            onClick={() => handleChangeTab("dashboard")}
            className={`${
              tab === "dashboard" || !tab
                ? "router-link-active router-link-exact-active active"
                : ""
            }`}
            aria-current="page"
          >
            <img
              data-v-066114c4
              src={images.dashboard}
              alt="dashboard-ft"
              loading="lazy"
            />
            <span data-v-066114c4 className="">
              Dashboard
            </span>
          </a>
          <a
            onClick={() => handleChangeTab("user-list")}
            data-v-066114c4
            className={`${
              tab === "user-list"
                ? "router-link-active router-link-exact-active active"
                : ""
            }`}
          >
            <img
              data-v-066114c4
              src={images.userList}
              alt="user-list-ft"
              loading="lazy"
            />
            <span data-v-066114c4 className=" ">
              User List
            </span>
          </a>
          <a
            onClick={() => setShowShareAffiliateLink(true)}
            data-v-066114c4
            data-bs-toggle="modal"
          >
            <img
              data-v-066114c4
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAmNJREFUWIW11kuIT3EUB/Dff2QWTESIZGEGiY3YeqywkY1kh9iwUMJOlh5Lj2LjvZM0SYpYMKynoUyR2EheeeRRZvCxmDPNdedej/zu2Zx7z/d3f99v9/zOOb+UMhom4xAeYwDPcQZzc/LUkXfhqRH7XHj+iNVNko9BX5Bdw/yIT8ORiH/AjKYErA2Se2ivwM8EfqCMtWXSsCL8qVarNVCBnyityy5gfPjXNfir8B1NCXgUflkNvjz8w0x8I4ZO3IwcD5ZPO+ZEOcKanMTt2Isvsfnr8D/QjX04hU8Rv5CTfDn6Y+MBHMA4bItyK9ogDldVR9XGY7AASzC5Ap8SJfUjNu/BwtKaCViH3diEmX9D3MJOvCgo/4bLkeMWtuBNYG/ivfUvf+53Ak7Hxt+jmdzA20Ju7xbyexZTshAH+YbY/AWWFuLjca7wR/oxqpHkENATBOsqsHY8CLyuxv/L2lJKi1NKgymlq2Uw2uqVeF3UlAB/WJPnoP1GQG9KaWxKaVSXitodjvc1ogDrI8cvi3lGB843fgiD7GShDO9HGb6L2KuKMpyaW0ALO4wMjeFG1I3ZNY1oa7ZGVBDShvlYjEkVeLkV3zG6FU+MtO7BZszKKjJIysPooKFhtF31MDrqb4bRP4ooj+Ph9HzHJUPj+KSRcXwxq4CCkPKFZFUJ7yqcrbVNidgVBMdr8I11fyHXnXBe+Ds1eE9pXXYBn8LX9YdppXXZBdwOv7XmtG8PfysT368W/aM38nwdCyI+Hcci/h7TGxEQZJ14Uqj/L4Xnj1jZGHlBxCTsxyN8xTNDV/Ouum9+AtRXoiTnSxl7AAAAAElFTkSuQmCC"
              alt="affi-footer-share"
            />
            <span data-v-066114c4 className="">
              Share
            </span>
          </a>
          <a
            onClick={() => handleChangeTab("pnl")}
            data-v-066114c4
            className={`${
              tab === "pnl"
                ? "router-link-active router-link-exact-active active"
                : ""
            }`}
          >
            <img
              data-v-066114c4
              src={images.graph}
              alt="graph-ft"
              loading="lazy"
            />
            <span data-v-066114c4 className="">
              Profit/Loss
            </span>
          </a>
          <a
            onClick={() => handleChangeTab("reports")}
            data-v-066114c4
            className={`${
              tab === "reports"
                ? "router-link-active router-link-exact-active active"
                : ""
            }`}
          >
            <img
              data-v-066114c4
              src="data:image/png;base64,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"
              alt="graph-ft"
              loading="lazy"
            />
            <span data-v-066114c4 className="">
              Reports
            </span>
          </a>
        </nav>
      </footer>
    </Fragment>
  );
};

export default Footer;
