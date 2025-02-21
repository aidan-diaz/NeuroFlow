//INITIAL CODE DIRECTLY FROM D3 DOCS - https://d3js.org/getting-started#installing-from-npm
//UPDATED PIECES AS NEEDED TO DISPLAY MY USER DATA


// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function getScores(className) {
    return document.querySelector(`.${className}`) ? 
    document.querySelector(`.${className}`).innerText.split(',').map(Number)
    : []
}

//CONVERT LAST TEN SCORES INTO OBJECTS TO DRAW LINES LATER
function convertScoresToObjs(scores) {
    return scores.slice(reactionScores.length - 10).map((e, i) => {
        const obj = {}
        obj['x'] = i + 1
        obj['y'] = e
        return obj
    })
}

function defineLine(xAxis, yAxis) {
    return d3.line()
        .x(d => xAxis(d.x))
        .y(d => yAxis(d.y));
}

//construct x and y for chart

function addXAxis(svg, chartX) {
    return svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(chartX));
}

function addYAxis(svg, chartY) {
    return svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(chartY));
}

function appendLine(svg, datum, line, color) {
    return svg.append("path")
    .datum(datum)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1)
    .attr("d", line)
}

//REACTION TEST CHART MODULE


const reactionScores = getScores('reactionScores')
const lastTenReactionScores = convertScoresToObjs(reactionScores)

// console.log(lastTenReactionScores)

// Declare the x (horizontal position) scale.
const reactionChartX = d3.scaleLinear()
    .domain([1, 10])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const reactionChartY = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

const reactionScoreLine = defineLine(reactionChartX, reactionChartY)

// Create the SVG container.
const reactionSVG = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
addXAxis(reactionSVG, reactionChartX)

// Add the y-axis.
addYAxis(reactionSVG, reactionChartY)

//append line for reaction test data
appendLine(reactionSVG, lastTenReactionScores, reactionScoreLine, 'blue')

// Append the SVG element.
reactionChartContainer.append(reactionSVG.node());


//ACTIVE RECALL CHART MODULE

// (easy)
const recallScoresEasy = getScores('recallScoresEasy')
const lastTenRecallScoresEasy = convertScoresToObjs(recallScoresEasy)

// (medium)

const recallScoresMedium = getScores('recallScoresMedium')
const lastTenRecallScoresMedium = convertScoresToObjs(recallScoresMedium)

// (hard)

const recallScoresHard = getScores('recallScoresHard')
const lastTenRecallScoresHard = convertScoresToObjs(recallScoresHard)

// (expert)

const recallScoresExpert = getScores('recallScoresExpert')
const lastTenRecallScoresExpert = convertScoresToObjs(recallScoresExpert)

// (impossible)

const recallScoresImpossible = getScores('recallScoresImpossible')
const lastTenRecallScoresImpossible = convertScoresToObjs(recallScoresImpossible)


// console.log(recallScoresMedium)

// Declare the x (horizontal position) scale.
const recallChartX = d3.scaleLinear()
    .domain([1, 10])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const recallChartY = d3.scaleLinear()
    .domain([0, 50])
    .range([height - marginBottom, marginTop]);

const recallScoreEasyLine = defineLine(recallChartX, recallChartY)
const recallScoreMediumLine = defineLine(recallChartX, recallChartY)
const recallScoreHardLine = defineLine(recallChartX, recallChartY)
const recallScoreExpertLine = defineLine(recallChartX, recallChartY)
const recallScoreImpossibleLine = defineLine(recallChartX, recallChartY)

// Create the SVG container.
const recallSVG = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

//create axes and line for recall test data (easy)
addXAxis(recallSVG, recallChartX)
addYAxis(recallSVG, recallChartY)
appendLine(recallSVG, lastTenRecallScoresEasy, recallScoreEasyLine, 'red')
appendLine(recallSVG, lastTenRecallScoresMedium, recallScoreMediumLine, 'black')
appendLine(recallSVG, lastTenRecallScoresHard, recallScoreHardLine, 'green')
appendLine(recallSVG, lastTenRecallScoresExpert, recallScoreExpertLine, 'blue')
appendLine(recallSVG, lastTenRecallScoresImpossible, recallScoreImpossibleLine, 'orange')

// Append the SVG element.
recallChartContainer.append(recallSVG.node());

//(medium)




//NUMBER SEQUENCE CHART MODULE
