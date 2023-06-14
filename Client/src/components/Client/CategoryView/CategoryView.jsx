import React from "react";
import { Checkbox } from "antd";
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};
const plainOptions = [
  "Alcatel",
  "Aplee",
  "Avvio",
  "Epik One",
  "Hisense",
  "Huawei",
  "Hyundai",
  "Infinix",
  "Lanix",
  "LG",
  "Motorola",
  "Nokia",
  "Oppo",
  "Xiamomi"
];

const options = [
    {
        label: "Xiamomi",
        value: "Xiamomi",
      },
  {
    label: "Alcatel",
    value: "Alcatel",
  },
  {
    label: "Aplee",
    value: "Aplee",
  },
  {
    label: "Avvio",
    value: "Avvio",
  },
  {
    label: "Epik One",
    value: "Epik One",
  },
  {
    label: "Hisense",
    value: "Hisense",
  },
  {
    label: "Huawei",
    value: "Huawei",
  },
  {
    label: "Hyundai",
    value: "Hyundai",
  },
  {
    label: "Infinix",
    value: "Infinix",
  },
  {
    label: "Lanix",
    value: "Lanix",
  },
  {
    label: "LG",
    value: "LG",
  },
  {
    label: "Motorola",
    value: "Motorola",
  },
  {
    label: "Nokia",
    value: "Nokia",
  },
  {
    label: "Oppo",
    value: "Oppo",
  },
];

const styles={width:"10vw", Height: '110px',}

function CategoryView() {
  return (
    <>
    <div style={styles}>
      <Checkbox.Group options={plainOptions} onChange={onChange}  />

    </div>
     
    </>
  );
}

export default CategoryView;
