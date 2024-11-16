import PropTypes from "prop-types";
import "../styles/PageTitle.css";

function PageTitle({ name }) {
  return (
    <div className="pageTitle">
      <div className="pageTitleContent">
        <div className="pageTitleTop">
          <h1>{name}</h1>
        </div>
        <div className="pageTitleBot">
          <p className="pageTitlePath">Home</p>
          <p className="pageTitleSymb">{">"}</p>
          {name ? <p className="pageTitleCurrent">{name}</p> : null}
        </div>
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PageTitle;
