import React from "react";

const NoDataContainer = () => {
  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">Нам пока нечего вам показать</b>
      <p className="cities__status-description">Пожалуйста обновите страницу</p>
    </div>
  );
};

export default NoDataContainer;
