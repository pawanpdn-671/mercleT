import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { engagementMessageOverTimeChartOptions } from "../utils";

const EngagementMessagesOverTime = () => {
	const chartComponentRef = useRef();

	const options = engagementMessageOverTimeChartOptions;

	return (
		<div className="chart-container">
			<HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
		</div>
	);
};

export default EngagementMessagesOverTime;
