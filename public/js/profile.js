//INITIAL CODE DIRECTLY FROM D3 DOCS - https://d3js.org/getting-started#installing-from-npm
//UPDATED PIECES AS NEEDED TO DISPLAY MY USER DATA


// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

//CONVERT LAST TEN SCORES INTO OBJECTS TO DRAW LINES LATER
function convertScoresToObjs(scores) {
    return scores.slice(reactionScores.length - 10).map((e, i) => {
        const obj = {}
        obj['x'] = i + 1
        obj['y'] = e
        return obj
    })
}

//REACTION TEST CHART MODULE


const reactionScores = document.querySelector('.reactionScores') ? 
document.querySelector('.reactionScores').innerText.split(',')
: []
const lastTenReactionScores = convertScoresToObjs(reactionScores)

console.log(lastTenReactionScores)

// Declare the x (horizontal position) scale.
const reactionChartX = d3.scaleLinear()
    .domain([1, 10])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const reactionChartY = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

const reactionScoreLine = d3.line()
.x(d => reactionChartX(d.x))
.y(d => reactionChartY(d.y));


// Create the SVG container.
const reactionSVG = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
reactionSVG.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(reactionChartX));

// Add the y-axis.
reactionSVG.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(reactionChartY));

//TRYING TO APPEND LINE FOR REACTION TEST DATA

reactionSVG.append("path")
    .datum(lastTenReactionScores)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1)
    .attr("d", reactionScoreLine)

// Append the SVG element.
reactionChartContainer.append(reactionSVG.node());


//ACTIVE RECALL CHART MODULE





//NUMBER SEQUENCE CHART MODULE
