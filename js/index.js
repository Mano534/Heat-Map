let xml = new XMLHttpRequest(),
    value,
    url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

let ALLCodeFunction = (data)=>{
    value = data.monthlyVariance;


    let h = 500;
    let w = 900;
    let padding = 100;

    let body = d3.select('.head')



    let svg = d3.select('body')
             .append('svg')
             .attr('height',h)
             .attr('width',w)



    let title = body.append('text')
             .attr('id','title')
             .text('Monthly Global Land-Surface Temperature')
             .attr('text-anchor','middle')
             .attr('x',w/2)
             .attr('y',h*5/100)





    let subTitle = body.append('text')
             .attr('id','description')
             .text(`1753 - 2015: base temperature ${data.baseTemperature}℃`)
             .attr('text-anchor','middle')
             .attr('x',w/2)
             .attr('y',h*10/100)


    let xAxisScale = d3.scaleLinear()
             .domain([d3.min(value,d=>d.year),d3.max(value,d=>d.year+1)])
             .range([padding,w-padding])



    let yAxisScale = d3.scaleTime()
             .domain([new Date(0 ,0 ,0 ,0 ,0 ,0 ,0),new Date(0 ,12 ,0 ,0 ,0 ,0 ,0)])
             .range([padding,h-padding])






    let xAxis = svg.append('g')
             .style("font-size", "1.1rem")
             .call(d3.axisBottom(xAxisScale).tickFormat(d=>+d))
             .attr('transform',`translate(0,${h-padding})`)
             .attr('id',"x-axis")

    let yAxis = svg.append('g')
             .style("font-size", "1.1rem")
             .call(d3.axisLeft(yAxisScale).tickFormat(d3.timeFormat("%B")))
             .attr('transform',`translate(${padding-1},0)`)
             .attr('id','y-axis')
             

    let yScale = d3.scaleLinear()
             .domain([0,12])
             .range([h-padding,padding])

    var monthes= ["January","February","March","April","May","June","July",
             "August","September","October","November","December"];

    let cells = svg.selectAll('rect')
             .data(value)
             .enter()
             .append('rect')
             .attr('class','cell')
             .attr("width",(w-(padding*2))/(d3.max(value,d=>+d.year)-d3.min(value,d=>+d.year)))
             .attr('height',(h-(padding*2))/12)
             .attr('x',d=>xAxisScale(d.year))
             .attr('y',d=>yAxisScale(new Date(0,d.month-1,0,0,0,0,0)))
             .attr('fill',function(d){
                let temp = data.baseTemperature + d.variance;
                 if(temp <= 2.8){
                     return "#313695"
                 }
                 if(temp <= 3.9){
                    return "#4575b4"
                }
                if(temp <= 5.0){
                    return "#74add1"
                }
                if(temp <= 6.1){
                    return "#abd9e9"
                }
                if(temp <= 7.2){
                   return "#ffffbf"
                }
                if(temp <= 8.3){
                    return "#fee090"
                }
                if(temp <= 9.5){
                    return "#fdae61"
                }
                if(temp <= 10.6){
                    return "#f46d43"
                }
                if(temp <= 11.7){
                    return "#d73027"
                }
                if(temp <= 12.8){
                    return "#a50026"
                }
             })
             .attr('data-month',d=>d.month-1)
             .attr('data-year',d=>d.year)
             .attr('data-temp',d=>{return  data.baseTemperature + d.variance})
             .on('mouseover',function(d){
                document.getElementById('tooltip').setAttribute('data-year',d.year) ;
                document.getElementById('tooltip').innerHTML = `<p>${d.year}-${monthes[d.month-1]}</p><br/><p>${data.baseTemperature + d.variance} C</p>` ;
                 
                 document.getElementById('tooltip').style.visibility = "visible";
                document.addEventListener('mousemove',function(e){
                    console.log(e)
                    document.getElementById('tooltip').style.top = e.y+20+'px' ;
                    document.getElementById('tooltip').style.left = e.x-20+'px' ;

            })})
            .on('mouseout',function(d){
                document.getElementById('tooltip').style.visibility = "hidden";


            })


        let colors = ["#313695","#4575b4", "#74add1","#abd9e9", "#ffffbf", "#fee090" ,  "#fdae61" , "#f46d43","#d73027","#a50026"]

        let  legend = d3.select('body')
              .append('svg')
              .attr('id',"legend")
              .attr("width",300)
              .attr('height',50)
              .selectAll('rect')
              .data(colors)
              .enter()
              .append('rect')
              .attr('fill',d=>d)
              .attr('width',30)
              .attr('height',20)
              .attr('x',(d,i)=>i*30)
              .attr('y',20);
        
        




        let freeCodeCamp = d3.select('body')
              .append('script')
              .attr('src','https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js')










}




    xml.onreadystatechange=()=>{
        if(xml.readyState === 4 && xml.status === 200){
            ALLCodeFunction(JSON.parse(xml.response));
        }
    }




    xml.open("GET",url,true);
    xml.send();
