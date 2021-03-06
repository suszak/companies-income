import React, { useEffect } from "react";
import "./loadingScreen.css";
import { slowConnection } from "../../helper/infoAboutSlowConnection.js"

const LoadingScreen = () => {
  useEffect(() => {
    //  set timeout on mount
    let slowConnectionTimeout = setTimeout(slowConnection, 16000);

    //  clear timeout on unmount
    return () => clearTimeout(slowConnectionTimeout);
  }, []);

  return (
    <section className="loadingScreen">
      <div className="loadingScreen__title">Loading</div>
      <div className="loadingScreen__info"></div>
      <span className="loadingScreen__animation">
        <div className="element1"></div>
        <div className="element2"></div>
        <div className="element3"></div>
        <div className="element4"></div>
        <div className="element5"></div>
      </span>
      <div className="background background__first"></div>
      <div className="background background__second"></div>
    </section>
  );
};

export default LoadingScreen;
