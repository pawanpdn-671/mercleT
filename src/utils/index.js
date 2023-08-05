import { messageCountList, channels } from "../const";

const groupByCategory = messageCountList.reduce((group, mes) => {
	const { timeBucket } = mes;
	group[timeBucket] = group[timeBucket] ?? [];
	group[timeBucket].push(mes);
	return group;
}, {});

const getDates = () => {
	const filter = Object.keys(groupByCategory);
	const changeFormat = filter?.map((item) => {
		const date = new Date(item);
		return date.toDateString().split(" ").slice(1, 3).reverse().toString().replaceAll(",", " ");
	});
	return changeFormat;
};

const getCounts = Object.entries(groupByCategory).map((item) => {
	let data = item[1];
	let num = parseInt(item[1][0].count, 10);
	for (let i = 0; i < data.length; i++) {
		if (parseInt(data[i].count, 10) > num) num = parseInt(data[i].count, 10);
	}
	return num;
});

// const getChannel = (val) => {
// 	let str = "";

// 	channels.map((item) => {
// 		messageCountList.map((coun) => {
// 			if (item.id === coun.channelId) str = item.name;
// 		});
// 	});
// 	return str;
// };

const engagementMessageOverTimeChartOptions = {
	title: {
		text: "Engagement Chart",
		style: {
			color: "#ddd",
		},
	},
	series: [
		{
			name: "Channel",
			data: getCounts,
			color: "#3e9e9e",
			lineWidth: 2,
		},
	],

	xAxis: {
		categories: getDates(),
		labels: {
			style: {
				color: "#666",
			},
		},
		lineColor: "#666",
		lineWidth: 1,
		crosshair: {
			width: 1,
			color: "gray",
		},
	},
	yAxis: {
		gridLineColor: "transparent",
		labels: {
			style: {
				color: "#666",
			},
		},
		lineColor: "#666",
		lineWidth: 1,
	},
	annotations: [],
	tooltip: {
		backgroundColor: "rgba(0,0,0,0.3)",
		borderColor: "#3e9e9e",
		borderRadius: 6,
		borderWidth: 1,
		style: {
			color: "#ddd",
		},
		formatter: function (val) {
			console.log(this.point);
			return [""].concat(
				this.points
					? this.points.map(function (point) {
							return point.x + "<br> <br>" + point.y + " messages on " + point.x;
					  })
					: [],
			);
		},
		split: true,
	},
	legend: {
		itemStyle: {
			color: "#ddd",
		},
	},
};

export { engagementMessageOverTimeChartOptions };
