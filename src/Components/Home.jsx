import React from "react";
import HumanModel from "./HumanModel";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import BMICalculator from "./claude";
import BMIDetailsForm from "./BMIDetailsForm";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-white font-medium py-6 px-8 tracking-wide">
        Calculate your BMI and Visualize your Body Shape
      </h1>
      <section className="w-full grid grid-cols-2 items-center justify-center border-spacing-1 border">
        <BMIDetailsForm />
        <HumanModel />
        <BMICalculator/>
      </section>
    </main>
  );
}

// function ValueLabelComponent(props) {
//   const { children, value } = props;

//   return (
//     <Tooltip enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function CustomizedSlider() {
  return (
    <Box sx={{ width: 320 }}>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
      />
    </Box>
  );
}
