/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetMac88 from "../../hooks/useGetMac88";

const Mac88 = () => {
  const navigate = useNavigate();
  const [warnMessage, setWarnMessage] = useState("");
  const { token, bonusToken } = useSelector((state) => state.auth);
  const { data } = useGetMac88();

  const handleAuraCasino = (code, name) => {
    if (token) {
      if (bonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      } else {
        navigate(`/casino/${name.replace(/ /g, "")}/${code}`);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (warnMessage) {
      return toast.error(warnMessage);
    }
  }, [warnMessage]);

  return (
    <div
      className=" page-body"
      style={{ minHeight: "calc(-110px + 100dvh)" }}
      _ngcontent-ng-c1965075897=""
    >
      {" "}
      <div className="pt-2.5">
        <div
          _ngcontent-ng-c1965075897=""
          className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
        >
          <div
            _ngcontent-ng-c1965075897=""
            className="game-type-list ng-star-inserted"
          >
            <ul _ngcontent-ng-c1965075897="" className="casino-container">
              {data?.map((item, i) => {
                return (
                  <li
                    onClick={() =>
                      handleAuraCasino(item?.game_id, item?.game_name)
                    }
                    key={i}
                    _ngcontent-ng-c1965075897=""
                    className="ng-star-inserted"
                  >
                    <a _ngcontent-ng-c1965075897="" className="active">
                      <img
                        _ngcontent-ng-c1965075897=""
                        alt=""
                        src={item?.img}
                      />
                    </a>

                    <div _ngcontent-ng-c1965075897="" className="game-detail">
                      <p _ngcontent-ng-c1965075897="" className="game-name">
                        {item?.game_name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mac88;
