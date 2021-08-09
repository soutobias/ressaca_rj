import Plotly from 'plotly.js-dist';

const initPlotly = () => {

  const chartElement = document.getElementById('plotdata');

  if (chartElement) { // only build a map if there's a div#map to inject into

    const simcostaData = JSON.parse(chartElement.dataset.simcosta);
    const spotterData = JSON.parse(chartElement.dataset.spotter);
    const ezwaveData = JSON.parse(chartElement.dataset.ezwave);

    plotWspd(simcostaData, spotterData, ezwaveData);
    plotWdir(simcostaData, spotterData, ezwaveData);
    plotWdirg(simcostaData, spotterData, ezwaveData);
    plotSwvht(simcostaData, spotterData, ezwaveData);
    plotMxwvht(simcostaData, spotterData, ezwaveData);
    plotWvdirg(simcostaData, spotterData, ezwaveData);
    plotWvdir(simcostaData, spotterData, ezwaveData);
    plotSst(simcostaData, spotterData, ezwaveData);

  }
};

const plotWvdir = (simcostaData, spotterData, ezwaveData) => {

    const simcostaWvdir = {
      x: simcostaData.date_time,
      y: simcostaData.wvdir,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterWvdir = {
      x: spotterData.date_time,
      y: spotterData.wvdir,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const ezwaveWvdir = {
      x: ezwaveData.date_time,
      y: ezwaveData.wvdir,
      mode: 'lines+markers',
      name: 'ezwave',
      line: {
        color: '#486641',
        width: 2,
      }
    };


    const data = [simcostaWvdir, ezwaveWvdir, spotterWvdir];

    var layout = {
      title: 'DIREÇÃO DAS ONDAS',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Direção das ondas (°)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

    var config = {responsive: true}

    Plotly.newPlot('wvdir-plot', data, layout, config);


};

const plotWdir = (simcostaData, spotterData, ezwaveData) => {

    const simcostaWdir = {
      x: simcostaData.date_time,
      y: simcostaData.wdir,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterWdir = {
      x: spotterData.date_time,
      y: spotterData.wdir,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const data = [simcostaWdir, spotterWdir];

    var layout = {
      title: 'DIREÇÃO DO VENTO',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Direção do Vento (°)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

    var config = {responsive: true}

    Plotly.newPlot('wdir-plot', data, layout, config);


};

const plotWdirg = (simcostaData, spotterData, ezwaveData) => {

    const simcostaWdir = {
      theta: simcostaData.wdirg,
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data1 = [simcostaWdir];

    var layout1 = {
      title: 'DIREÇÃO DO VENTO SIMCOSTA RJ4',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    var config = {responsive: true}

    Plotly.newPlot('wdir-plot-simcosta', data1, layout1);

    const spotterWdir = {
      theta: spotterData.wdirg,
      name: 'simcosta_rj3',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data2 = [spotterWdir];

    var layout2 = {
      title: 'DIREÇÃO DO VENTO SIMCOSTA RJ3',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    Plotly.newPlot('wdir-plot-spotter', data2, layout2, config);


};


const plotWvdirg = (simcostaData, spotterData, ezwaveData) => {

    const simcostaWvdir = {
      theta: simcostaData.wvdirg,
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data1 = [simcostaWvdir];

    var layout1 = {
      title: 'DIREÇÃO DAS ONDAS SIMCOSTA RJ4',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    var config = {responsive: true}

    Plotly.newPlot('wvdir-plot-simcosta', data1, layout1);

    const spotterWvdir = {
      theta: spotterData.wvdirg,
      name: 'simcosta_rj3',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data2 = [spotterWvdir];

    var layout2 = {
      title: 'DIREÇÃO DAS ONDAS SIMCOSTA RJ3',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    Plotly.newPlot('wvdir-plot-spotter', data2, layout2, config);

    const ezwaveWvdir = {
      theta: ezwaveData.wvdirg,
      name: 'ezwave',
      line: {
        color: '#c22d45',
        width: 2
      },
      type: 'barpolar'
    };

    const data3 = [ezwaveWvdir];

    var layout3 = {
      title: 'DIREÇÃO DAS ONDAS EZWAVE',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      polar: {
        radialaxis: {
          visible: false
        },
        angularaxis: {
          tickfont: {
            size: 8
          },
          rotation: 90,
          direction: "clockwise"
        }
      }
    };

    Plotly.newPlot('wvdir-plot-ezwave', data3, layout3, config);


};


const plotWspd = (simcostaData, spotterData, ezwaveData) => {

    const simcostaWspd = {
      x: simcostaData.date_time,
      y: simcostaData.wspd,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterWspd = {
      x: spotterData.date_time,
      y: spotterData.wspd,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const ezwaveWspd = {
      x: ezwaveData.date_time,
      y: ezwaveData.wspd,
      mode: 'lines+markers',
      name: 'ezwave',
      line: {
        color: '#486641',
        width: 2,
      }
    };


    const data = [simcostaWspd, ezwaveWspd, spotterWspd];

    var layout = {
      title: 'VELOCIDADE DO VENTO',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Velocidade do Vento (m/s)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };

    var config = {responsive: true}

    Plotly.newPlot('wspd-plot', data, layout, config);

};

const plotSwvht = (simcostaData, spotterData, ezwaveData) => {

    const simcostaSwvht = {
      x: simcostaData.date_time,
      y: simcostaData.swvht,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterSwvht = {
      x: spotterData.date_time,
      y: spotterData.swvht,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const ezwaveSwvht = {
      x: ezwaveData.date_time,
      y: ezwaveData.swvht,
      mode: 'lines+markers',
      name: 'ezwave',
      line: {
        color: '#486641',
        width: 2,
      }
    };


    const data = [simcostaSwvht, ezwaveSwvht, spotterSwvht];

    var layout = {
      title: 'ALTURA SIGNIFICATIVA DE ONDA',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Altura de Onda (m)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };
    var config = {responsive: true}

    Plotly.newPlot('swvht-plot', data, layout, config);

};

const plotMxwvht = (simcostaData, spotterData, ezwaveData) => {

    const simcostaMxwvht = {
      x: simcostaData.date_time,
      y: simcostaData.mxwvht,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterMxwvht = {
      x: spotterData.date_time,
      y: spotterData.mxwvht,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const ezwaveMxwvht = {
      x: ezwaveData.date_time,
      y: ezwaveData.mxwvht,
      mode: 'lines+markers',
      name: 'ezwave',
      line: {
        color: '#486641',
        width: 2,
      }
    };


    const data = [simcostaMxwvht, ezwaveMxwvht, spotterMxwvht];

    var layout = {
      title: 'ALTURA MÁXIMA DE ONDA',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Altura de Onda (m)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };
    var config = {responsive: true}

    Plotly.newPlot('mxwvht-plot', data, layout, config);

};


const plotSst = (simcostaData, spotterData, ezwaveData) => {

    const simcostaSst = {
      x: simcostaData.date_time,
      y: simcostaData.sst,
      mode: 'lines+markers',
      name: 'simcosta_rj4',
      line: {
        color: '#c22d45',
        width: 2
      }
    };

    const spotterSst = {
      x: spotterData.date_time,
      y: spotterData.sst,
      mode: 'lines+markers',
      name: 'simcosta_rj3',
      line: {
        color: '#2f42ad',
        width: 2
      }
    };

    const ezwaveSst = {
      x: ezwaveData.date_time,
      y: ezwaveData.sst,
      mode: 'lines+markers',
      name: 'ezwave',
      line: {
        color: '#486641',
        width: 2,
      }
    };


    const data = [simcostaSst, ezwaveSst,spotterSst];

    var layout = {
      title: 'TEMPERATURA DA ÁGUA DO MAR',
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      xaxis: {
        title: 'Tempo',
        showgrid: true,
        zeroline: false,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      yaxis: {
        title: 'Temperatura (°C)',
        showgrid: true,
        showline: true,
        gridcolor: 'rgba(0,0,0,0.2)'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    };
    var config = {responsive: true}

    Plotly.newPlot('sst-plot', data, layout, config);

};


export { initPlotly };
