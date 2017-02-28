<!-- svg 이용 -->
      var w = 200;
      var h = 170;
      var barPadding = 4;

      <!-- svg 생성, body에 추가-->
      var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      <!-- rect를 생성 dataset의 크기,길이 만큼 반복 추가-->
      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return i * (w / dataset.length);
         })
         .attr("y", function(d) {
            return h - (d * 4);
         })
         .attr("width", w / dataset.length - barPadding)
         .attr("height", function(d) {
            return d * 4;
         })
         .attr("fill", "blue");

      <!-- 해당 rect의 값을 라벨로 추가-->
      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .text(function(d){
            return d;
          })
          .attr("x", function(d, i){
            return i * (w/dataset.length) + 5;
          })
          .attr("y", function(d){
            return h - (d * 4) + 15;
          })
          .attr("fill", "white");;
