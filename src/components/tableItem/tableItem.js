import React from "react";
import { Link } from "react-router-dom";
import "./tableItem.css";
import { ReactComponent as OpenSite } from "../../images/open white.svg";

const TableItem = ({ id, name, city, totalIncome }) => {
  return (
    <div className="tableItem">
      <div className="wrapper">
        <div className="elements">
          <p className="tableItem__element">{id}</p>
          <p className="tableItem__element">{name}</p>
        </div>
        <div className="elements">
          <p className="tableItem__element">{city}</p>
          <p className="tableItem__element">{totalIncome}</p>
        </div>
      </div>
      <Link to={`/company/${id}`} className="tableItem__open">
        <OpenSite className="tableItem__open" />
      </Link>
    </div>
  );
};

export default TableItem;
