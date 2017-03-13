/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function externalData_1(producto){

    
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    //.tickFormat(formatPercent);
    
  
  
  
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Municipio:</strong> <span style='color:red'>" + d.letter +  "</span>" + "<strong> <br> </br>Toneladas:</strong> <span style='color:red'>" + d.frequency +  "</span>";

  })

var svg = d3.select("#extenalData_1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// load the data
d3.json("https://nemanosalvab.carto.com/api/v2/sql?q=select "+ producto +",amun_nom_1 from table_2013_1 where " + producto + " >0 order by "+ producto +"  ASC LIMIT 15 &api_key=947d3ad4f49905b235eb9cd8b071ea40ae9faa94", function(error, data) {
        

        data.rows.forEach(function(d) {
        d.letter = d['amun_nom_1'];
        d.frequency = d[producto];
        });

        x.domain(data.rows.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data.rows, function(d) { return d.frequency; })]);
    

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Toneladas");

  svg.selectAll(".bar")
      .data(data.rows)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
      
      
   svg.append("g")
    .attr("transform", "translate(" + (width/2) + ", 15)")
    .append("text")
    .text("PRODUCCIÓN DE "+ producto.toUpperCase()+" 2013 - CUND")
    .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800"});

});

//function type(d) {
//  d.frequency = +d.frequency;
 // return d;
//}


}









