import Chart from 'react-apexcharts';

const MonthlySpends = ({series,barCategories,colors}) => {
    const options = {
        chart: {type: 'bar'},
        colors: colors,
        xaxis: { 
            categories: barCategories,
            
            crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val;
              }
            }
          
        },
        title: {
            text: 'Monthly Expenses',
            align: 'center'
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                borderRadiusApplication: 'end',
                columnWidth: '60%',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return '₹ ' + val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758']
            }
        }
    }

    return <Chart 
                options={options}
                series= {[{name: "Monthly Expenses", data: series}]}
                type='bar'
                width={'200%'}
                style={{ marginLeft: 'auto' , marginRight: 'auto'}}/> 
}


export default MonthlySpends;