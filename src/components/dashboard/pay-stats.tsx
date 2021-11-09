import React, { useState, useEffect } from "react";
import { Column, ColumnConfig } from "@ant-design/charts";

const payStats: React.FC = () => {
  const data = [
    {
      type: "Jan",
      sales: 38
    },
    {
      type: "Feb",
      sales: 52
    },
    {
      type: "March",
      sales: 61
    },
    {
      type: "April",
      sales: 55
    },
    {
      type: "May",
      sales: 48
    },
    {
      type: "June",
      sales: 38
    },
    {
      type: "July",
      sales: 38
    },
    {
      type: "August",
      sales: 38
    },
    {
      type: "September",
      sales: 38
    }
  ];
  const config: ColumnConfig = {
    data: data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: { alias: "poo" },
      sales: { alias: "foo" }
    }
  };
  return <Column {...config} />;
};

export default payStats;
