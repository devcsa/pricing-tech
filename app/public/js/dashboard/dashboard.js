window.Apex = {
   chart: {
      foreColor: "#ccc",
      toolbar: {
         show: false,
      },
   },
   stroke: {
      width: 3,
   },
   dataLabels: {
      enabled: false,
   },
   tooltip: {
      theme: "dark",
   },
   grid: {
      borderColor: "#535A6C",
      xaxis: {
         lines: {
            show: true,
         },
      },
   },
};

var spark1 = {
   chart: {
      id: "spark1",
      group: "sparks",
      type: "line",
      height: 80,
      sparkline: {
         enabled: true,
      },
      dropShadow: {
         enabled: true,
         top: 1,
         left: 1,
         blur: 2,
         opacity: 0.2,
      },
   },
   series: [
      {
         data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
      },
   ],
   stroke: {
      curve: "smooth",
   },
   markers: {
      size: 0,
   },
   grid: {
      padding: {
         top: 20,
         bottom: 10,
         left: 110,
      },
   },
   colors: ["#fff"],
   tooltip: {
      x: {
         show: false,
      },
      y: {
         title: {
            formatter: function formatter(val) {
               return "";
            },
         },
      },
   },
};

var spark2 = {
   chart: {
      id: "spark2",
      group: "sparks",
      type: "line",
      height: 80,
      sparkline: {
         enabled: true,
      },
      dropShadow: {
         enabled: true,
         top: 1,
         left: 1,
         blur: 2,
         opacity: 0.2,
      },
   },
   series: [
      {
         data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
      },
   ],
   stroke: {
      curve: "smooth",
   },
   grid: {
      padding: {
         top: 20,
         bottom: 10,
         left: 110,
      },
   },
   markers: {
      size: 0,
   },
   colors: ["#fff"],
   tooltip: {
      x: {
         show: false,
      },
      y: {
         title: {
            formatter: function formatter(val) {
               return "";
            },
         },
      },
   },
};

var spark3 = {
   chart: {
      id: "spark3",
      group: "sparks",
      type: "line",
      height: 80,
      sparkline: {
         enabled: true,
      },
      dropShadow: {
         enabled: true,
         top: 1,
         left: 1,
         blur: 2,
         opacity: 0.2,
      },
   },
   series: [
      {
         data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19],
      },
   ],
   stroke: {
      curve: "smooth",
   },
   markers: {
      size: 0,
   },
   grid: {
      padding: {
         top: 20,
         bottom: 10,
         left: 110,
      },
   },
   colors: ["#fff"],
   xaxis: {
      crosshairs: {
         width: 1,
      },
   },
   tooltip: {
      x: {
         show: false,
      },
      y: {
         title: {
            formatter: function formatter(val) {
               return "";
            },
         },
      },
   },
};

var spark4 = {
   chart: {
      id: "spark4",
      group: "sparks",
      type: "line",
      height: 80,
      sparkline: {
         enabled: true,
      },
      dropShadow: {
         enabled: true,
         top: 1,
         left: 1,
         blur: 2,
         opacity: 0.2,
      },
   },
   series: [
      {
         data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61],
      },
   ],
   stroke: {
      curve: "smooth",
   },
   markers: {
      size: 0,
   },
   grid: {
      padding: {
         top: 20,
         bottom: 10,
         left: 110,
      },
   },
   colors: ["#fff"],
   xaxis: {
      crosshairs: {
         width: 1,
      },
   },
   tooltip: {
      x: {
         show: false,
      },
      y: {
         title: {
            formatter: function formatter(val) {
               return "";
            },
         },
      },
   },
};

new ApexCharts(document.querySelector("#spark1"), spark1).render();
new ApexCharts(document.querySelector("#spark2"), spark2).render();
new ApexCharts(document.querySelector("#spark3"), spark3).render();
new ApexCharts(document.querySelector("#spark4"), spark4).render();

var optionsLine = {
   chart: {
      height: 328,
      type: "line",
      zoom: {
         enabled: false,
      },
      dropShadow: {
         enabled: true,
         top: 3,
         left: 2,
         blur: 4,
         opacity: 1,
      },
   },
   stroke: {
      curve: "smooth",
      width: 2,
   },
   //colors: ["#3F51B5", '#2196F3'],
   series: [
      {
         name: "Regular",
         data: [17.9, 17.8, 17.7, 18.1, 18.2, 18.4, 17.9, 17.8, 17.7, 18.1, 18.2, 18.4],
      },
      {
         name: "Condição",
         data: [17.75, 17.65, 17.55, 17.89, 18.09, 18.29, 17.75, 17.65, 17.55, 17.89, 18.09, 18.29],
      },
      {
         name: "Médio",
         data: [16.9, 16.99, 17.19, 17.59, 17.89, 17.19, 16.9, 16.99, 17.19, 17.59, 17.89, 17.19],
      },
   ],
   title: {
      text: "Preço Planejado",
      align: "left",
      offsetY: 25,
      offsetX: 20,
   },
   subtitle: {
      text: "Média Brasil",
      offsetY: 55,
      offsetX: 20,
   },
   markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
         size: 9,
      },
   },
   grid: {
      show: true,
      padding: {
         bottom: 0,
      },
   },
   labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
   xaxis: {
      tooltip: {
         enabled: false,
      },
   },
   legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
   },
};

var chartLine = new ApexCharts(document.querySelector("#line-adwords"), optionsLine);
chartLine.render();

var optionsCircle4 = {
   chart: {
      type: "pie",
      height: 500,
      width: 490,
   },
   plotOptions: {
      pie: {
         customScale: 1,
         donut: {
            size: "70%",
         },
         offsetY: 40,
      },
      stroke: {
         colors: undefined,
      },
   },
   title: {
      text: "% Representatividade TMI",
      style: {
         fontSize: "16px",
      },
   },
   dataLabels: {
      enabled: true,
   },
   fill: {
      type: "gradient",
   },
   series: [0.35, 0.08, 0.05, 0.04, 0.04, 0.004, 0.02, 0.03, 0.04, 0.002],
   labels: ["Estrutural ON", "Essencial ON", "Promo ON", "Of. Física ON", "Promo OFF", "Pontual OFF", "Digital OFF", "Eventos OFF", "Fundo de Vendas OFF", "Performance OFF"],
   legend: {
      position: "right",
      offsetX: -30,
      offsetY: 10,
   },
};

var chartCircle4 = new ApexCharts(document.querySelector("#radialBarBottom"), optionsCircle4);
chartCircle4.render();

var optionsBar = {
   chart: {
      height: 380,
      type: "bar",
      stacked: true,
   },
   plotOptions: {
      bar: {
         columnWidth: "30%",
         horizontal: false,
      },
   },
   series: [
      {
         name: "MV",
         data: [14, 25, 21, 17, 12, 13, 11, 19, 11, 17, 15, 15],
      },
      {
         name: "VI",
         data: [13, 23, 20, 8, 13, 27, 33, 12, 11, 17, 15, 15],
      },
      {
         name: "KAVA",
         data: [11, 17, 15, 15, 21, 14, 15, 13, 11, 17, 15, 15],
      },
      {
         name: "KAVI",
         data: [11, 17, 15, 15, 21, 14, 15, 13, 11, 17, 15, 15],
      },
      {
         name: "FD",
         data: [11, 17, 15, 15, 21, 14, 15, 13, 11, 17, 15, 15],
      },
   ],
   xaxis: {
      categories: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
   },
   fill: {
      opacity: 1,
   },
};

var chartBar = new ApexCharts(document.querySelector("#barchart"), optionsBar);

chartBar.render();

var optionsArea = {
   chart: {
      height: 380,
      type: "area",
      stacked: false,
   },
   stroke: {
      curve: "straight",
   },
   series: [
      {
         name: "VI",
         data: [11, 15, 26, 20, 33, 27],
      },
      {
         name: "MV",
         data: [32, 33, 21, 42, 19, 32],
      },
      {
         name: "KAVA",
         data: [20, 39, 52, 11, 29, 43],
      },
   ],
   xaxis: {
      categories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2"],
   },
   tooltip: {
      followCursor: true,
   },
   fill: {
      opacity: 1,
   },
};

var chartArea = new ApexCharts(document.querySelector("#areachart"), optionsArea);

chartArea.render();
