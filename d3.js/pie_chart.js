
            var w = 200;
			var h = 200;

			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);

			var pie = d3.layout.pie();

			<!-- category10으로 10개의 색상 척도 생성-->
			var color = d3.scale.category10();

			<!--svg 생성 및 추가-->
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			<!-- 그룹 지정 -->
			var arcs = svg.selectAll("g.arc")
						  .data(pie(dataset))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

              <!-- 호의 경로 그리기 -->
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);

			<!-- 라벨 -->
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value;
			    });
