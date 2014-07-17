console.log("aasdaaaaa");
function draw_graph(){
    var data = [1,3,12,8,4,0,0, 1, 3, 8,4,6,6,16, 11,0,0,1,2];
    var graphWidth = $(".graph").parent().width();
    var graphHeight = $(".graph").parent().height();

    console.log(graphWidth);
    console.log(graphHeight);

    var barWidth = (graphWidth - 10)/data.length;
    var maxBarHeight = 60;

    var yscale = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, maxBarHeight]);

    console.log("asd");
    var graph = d3.select(".graph")
            .style('width', graphWidth + 'px')
            //.style('height', graphHeight + 'px')
            .selectAll('div')
            .data(data)
            .enter().append("div")
            .style('width', barWidth + 'px')
            .style('height', function(data_element){
                return yscale(data_element) + 'px';
            });
    console.log(graph);
}

$(function(){
    draw_graph();
});
