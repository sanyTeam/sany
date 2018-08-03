var getOption = function(chartType) {
//				var chartOption = chartType == 'pie' ? {
				var chartOption = {
					legend: {
						data: ['油压', '油温']
					},
					grid: {
						x: 35,
						x2: 10,
						y: 30,
						y2: 25
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: false,
					xAxis: [{
						type: 'category',
						data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					}],
					yAxis: [{
						type: 'value',
//						splitArea: {
//							show: true
//						}
					}],
					series: [{
						name: '油压',
						type: chartType,
						data: [2.0, 4.9, 7.0, 23.2, 25.6, 7.7, 13.6, 16.2, 32.6, 20.0, 6.4, 3.3]
					}, {
						name: '油温',
						type: chartType,
						data: [2.6, 5.9, 9.0, 26.4, 28.7, 7.7, 17.6, 18.2, 48.7, 18.8, 6.0, 2.3]
					}]
				};
				return chartOption;
			};
			var byId = function(id) {
				return document.getElementById(id);
			};
//			var barChart = echarts.init(byId('barChart'));
//			barChart.setOption(getOption('bar'));
			var lineChart = echarts.init(byId('lineChart'));
			lineChart.setOption(getOption('line'));
//			var pieChart = echarts.init(byId('pieChart'));
//			pieChart.setOption(getOption('pie'));
//			byId("echarts").addEventListener('tap',function(){
//				var url = this.getAttribute('data-url');
//				plus.runtime.openURL(url);
//			},false);