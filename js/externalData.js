/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function externalData(producto){
    var product = producto;
    console.log(product);
    
    
    // set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// set the ranges- subir 200
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var yScale = d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]);

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width - margin.right - margin.left], .1);





// add the SVG element
var svg = d3.select("#extenalData").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
a = d3.json("https://nemanosalvab.carto.com/api/v2/sql?q=select "+ product +",amun_nom_1 from table_2013_1 where mango >0 order by "+ product +" ASC  &api_key=947d3ad4f49905b235eb9cd8b071ea40ae9faa94", function(error, data) {
    console.log(a);
    data.rows.forEach(function(d) {
        d.Letter = d['amun_nom_1'];
        d.Freq = +d[product];
    });
  

  // scale the range of the data
  x.domain(data.rows.map(function(d) { return d.Letter; }));
  y.domain([0, d3.max(data.rows, function(d) { return d.Freq; })]);

  // add axis
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
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Toneladas");
      
      
      
      
  // Add bar chart
  svg.selectAll("bar")
      .data(data.rows)
      .enter().append("rect")
      .attr("class", "bar dataToogle")
      .attr("x", function(d) { return x(d['Letter']); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d['Freq']); })
//      .attr("data", function(d) {return(d['Freq']); })
//      .append(function(){
//          $(".dataToogle").click(function(d){
//              
//                alert("hey! bitch"+
//                        this.find('[data]').val());
//            }); 
//      });


    // add title 
   svg.append("g")
    .attr("transform", "translate(" + (width/2) + ", 15)")
    .append("text")
    .text("PRODUCCIÓN DE "+ product +" 2013 - CUND")
    .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800"});
    
    
    //add text labels to the top of each bar
svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll(".textlabel")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "textlabel")
    .attr("x", function(d){  return x(d['Letter']); })
    .attr("y", function(d) { return y(d.Freq); })
    .attr("height", function(d) { return height - y(d['Freq']); })
    .text(function(d){ return (d['Freq']); });
    //more info about d3 format method:
    // http://koaning.s3-website-us-west-2.amazonaws.com/html/d3format.html

});
}









