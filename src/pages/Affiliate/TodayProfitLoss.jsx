import { LanguageKey } from "../../const";
import useLanguage from "../../hooks/use-language";

const TodayProfitLoss = () => {
  const { getLanguage } = useLanguage();
  return (
    <div data-v-4c49d924 className="af-top-user-sec">
      <div data-v-4c49d924 className="af-top-user-head af-new-user-add-sec">
        <h6 style={{ margin: "0px" }} data-v-4c49d924>
          {getLanguage(LanguageKey.TODAY_PROFIT_AND_LOSS)}
        </h6>
      </div>
      <div data-v-4c49d924 className="table-responsive">
        <table data-v-4c49d924 className="table">
          <thead data-v-4c49d924>
            <tr data-v-4c49d924>
              <th data-v-4c49d924>{getLanguage(LanguageKey.TYPE)}</th>
              <th data-v-4c49d924>PL</th>
            </tr>
          </thead>
          <tbody data-v-4c49d924>
            <tr data-v-4c49d924>
              <td data-v-4c49d924>{getLanguage(LanguageKey.SPORTS)}</td>
              <td data-v-4c49d924 className="green-font-color">
                0
              </td>
            </tr>
            <tr data-v-4c49d924>
              <td data-v-4c49d924>{getLanguage(LanguageKey.CASINO)}</td>
              <td data-v-4c49d924 className="green-font-color">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayProfitLoss;
