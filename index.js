const m={
    width: 900,
    height:600
} 

svg=d3.select("body")
    .append("svg")
    .attr("width",m.width)
    .attr("height",m.height)

g=svg.append("g");

d3.json("neighborhoods.json").then(t=>{const e=d3.geoAlbers()
            .scale(20e4)
            .rotate([71.05,0])
            .center([0,42.313])
            .translate([m.width/2,m.height/2]),a=d3.geoPath().projection(e);

g.selectAll("path")
    .data(t.features)
    .enter().append("path")
    .attr("fill","#ccc")
    .attr("d",a),
    d3.json("points.json").then(t=>{
        g.selectAll("circle")
        .data(t.features)
        .enter()
        .append("path")
        .attr("class","coord")
        .attr("fill","blue")
        .attr("d",a);

const s=[];
for(let a=0;a<t.features.length-1;a++){
    const r=e(t.features[a].geometry.coordinates),
    n=e(t.features[a+1].geometry.coordinates);
    s.push({type:"LineString",coordinates:[[r[0],r[1]],[n[0],n[1]]]})}
    const r=svg.append("g");
    
    r.selectAll("line")
        .data(s)
        .enter()
        .append("line")
        .attr("x1",t=>t.coordinates[0][0])
        .attr("y1",t=>t.coordinates[0][1])
        .attr("x2",t=>t.coordinates[1][0])
        .attr("y2",t=>t.coordinates[1][1])
        .attr("id",function(t,e){return"line"+e}).attr("stroke","steelblue"),
        r.selectAll("line")
        .style("opacity",0),
        
        d3.selectAll("line")
            .style("opacity","1"),
            d3.selectAll("line").each(function(t,e){let a=d3.select("#line"+e).node().getTotalLength();
            d3.select("#line"+e).attr("stroke-dasharray",a+" "+a)
                .attr("stroke-dashoffset",a)
                .transition()
                .duration(500)
                .delay(220*e)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset",0)
                .style("stroke-width",3)})})});
