import Chart from "react-apexcharts";

const SectionSpends = ({ series, pieCategories, colors,setSelectedCategory,currentCategory,setSelectedColor }) => {
    const options = {
        chart: { 
            type: 'pie',
            events:{
                dataPointSelection: (event, chartContext, config) => {
                    const selectedCategory = config.w.config.labels[config.dataPointIndex];
                    if (currentCategory === config.w.config.labels[config.dataPointIndex]){
                        setSelectedCategory('');
                        setSelectedColor('');
                    } 
                    else{
                        setSelectedCategory(selectedCategory);
                        setSelectedColor(colors[(config.dataPointIndex%5)]);
                    }
                }
            }
        },
        colors: colors,
        labels: pieCategories,
        title: {
            text: 'Expenses by Category',
            align: 'center'
        },
        plotOptions: { pie: { customScale: 1 } }
    };

    return (
        <Chart
            options={options}
            series={series}
            type="pie"
            width={'200%'}
            style={{ marginLeft: 'auto' , marginRight: 'auto'}}/>
    );
};

export default SectionSpends;