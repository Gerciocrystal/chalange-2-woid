import React from "react";
import PropTypes from "prop-types";
import Days from "./misselation/Days";
import moment from "moment";

const DaysWrapper = ({ chooseDay }) => {
  const today = moment();
  let nextDays = new Array();

  for (let i = 0; i < 6; i++) {
    const day = today.clone().add(i, "days");
    const dayName = day.format("dddd");
    const dayId = day;

    nextDays.push({
      value: dayName,
      id: dayId,
    });
  }

  return (
    <>
      {nextDays.length > 0 &&
        nextDays.map((day, index) => (
          <Days
            day={day}
            key={day?.id || index}
            handleFunction={() => chooseDay(day)}
          />
        ))}
      ;
    </>
  );
};

DaysWrapper.propTypes = {
  chooseDay: PropTypes.func,
};

export default DaysWrapper;
