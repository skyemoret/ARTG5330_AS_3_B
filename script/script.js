//Assignment 3
//Due Thursday March 26

var margin = {t:100,r:100,b:200,l:150},
    width = $('.canvas').width() - margin.l - margin.r,
    height = $('.canvas').height() - margin.t - margin.b;


//Set up SVG drawing elements -- already done
var svg = d3.select('.canvas')
    .append('svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height + margin.t + margin.b)
    .append('g')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scales
var scales = {};
    scales.x = d3.scale.log().range([0,width]);
    scales.y = d3.scale.linear().range([height,0]);


//Global variables
var yVariable = "CO2 emissions (kt)",
    y0 = 1990,
    y1 = 2013;


//d3.map for metadata
var metaDataMap = d3.map();

//TODO: create a layout function for a treemap
var treemap = d3.layout.treemap()
    .children(function(d){
        return d.values;
    })
    .value(function(d){
        return d.data.get(y0);
    })
    .size([width,height])
    .sticky(true)
    .padding([5,5,5,5]);



//START!
queue()
    .defer(d3.csv, "data/00fe9052-8118-4003-b5c3-ce49dd36eac1_Data.csv",parse)
    .defer(d3.csv, "data/metadata.csv", parseMetaData)
    .await(dataLoaded);

function dataLoaded(err, rows, metadata){

    //First, combine "rows" and "metadata", so that each country is assigned to a region

    //Then create hierarchy based on regions, using d3.nest()

    //Finally, perform a treemap layout on the data

    //draw(root);
}

function draw(root){
    //Append <rect> element for each node in the treemap

    //Also append <text> label for each tree node that is a leaf
}

function parse(d){
    var newRow = {
        key: d["Country Name"],
        series: d["Series Name"],
        data:d3.map()
    };
    for(var i=1990; i<=2013; i++){
        var heading = i + " [YR" + i + "]";
        newRow.data.set(
            i,
            (d[heading]=="..")?0:+d[heading]
        );
    }

    return newRow;
}

function parseMetaData(d){
    var countryName = d["Table Name"];
    var region = d["Region"];
    metaDataMap.set(countryName, region);
}