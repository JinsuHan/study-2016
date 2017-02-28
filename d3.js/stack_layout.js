    <!--레이아웃 설정-->
	var stack = d3.layout.stack();
	<!--데이터 입력-->
	stack(dataset2);
	<!--크기 설정-->
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset2[0].length))
		.rangeRoundBands([0, w], 0.05);
		var yScale = d3.scale.linear()
		.domain([0,
			d3.max(dataset2, function(d) {
				return d3.max(d, function(d) {
					return d.y0 + d.y;
				});
			})
		])
		.range([0, h]);
	<!--색상 설정-->
	var colors = d3.scale.category10();
	<!--body 아래 svg 삽입-->
	var svg = d3.select("body")
				.append("svg")
				.attr("width", w)
				.attr("height", h);
	<!--데이터를 순서대로 g element로 삽입-->
	var groups = svg.selectAll("g")
		.data(dataset2)
		.enter()
		.append("g")
		.style("fill", function(d, i) {
			return colors(i);
		});
    var rects = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("x", function(d, i){
              return xScale(i);
            })
            .attr("y", function(d){
              return yScale(d.y0);
            })
            .attr("height", function(d){
              return yScale(d.y);
            })
            .attr("width", xScale.rangeBand());
