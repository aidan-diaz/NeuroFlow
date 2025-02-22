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
    .call(d3.axisBottom(chartX))
    
}

function addYAxis(svg, chartY) {
    return svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(chartY))
}

function appendLine(svg, datum, line, color) {
    return svg.append("path")
    .datum(datum)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 3)
    .attr("d", line)
}

function addDots(svg, datum, chartX, chartY, color) {
    return svg.selectAll("myCircles")
    .data(datum)
    .enter()
    .append("circle")
      .attr("fill", color)
      .attr("stroke", "none")
      .attr("cx", function(d) { return chartX(d.x) })
      .attr("cy", function(d) { return chartY(d.y) })
      .attr("r", 5)
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

//append line + dots for reaction test data
appendLine(reactionSVG, lastTenReactionScores, reactionScoreLine, 'blue')
addDots(reactionSVG, lastTenReactionScores, reactionChartX, reactionChartY, 'blue')

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

//create axes and lines + dots for recall test data (easy)
addXAxis(recallSVG, recallChartX)
addYAxis(recallSVG, recallChartY)
appendLine(recallSVG, lastTenRecallScoresEasy, recallScoreEasyLine, 'red')
addDots(recallSVG, lastTenRecallScoresEasy, recallChartX, recallChartY, 'red')
appendLine(recallSVG, lastTenRecallScoresMedium, recallScoreMediumLine, 'black')
addDots(recallSVG, lastTenRecallScoresMedium, recallChartX, recallChartY, 'black')
appendLine(recallSVG, lastTenRecallScoresHard, recallScoreHardLine, 'green')
addDots(recallSVG, lastTenRecallScoresHard, recallChartX, recallChartY, 'green')
appendLine(recallSVG, lastTenRecallScoresExpert, recallScoreExpertLine, 'blue')
addDots(recallSVG, lastTenRecallScoresExpert, recallChartX, recallChartY, 'blue')
appendLine(recallSVG, lastTenRecallScoresImpossible, recallScoreImpossibleLine, 'orange')
addDots(recallSVG, lastTenRecallScoresImpossible, recallChartX, recallChartY, 'orange')

// Append the SVG element.
recallChartContainer.append(recallSVG.node());

//NUMBER SEQUENCE CHART MODULE

// (easy)

const numberSequenceScoresEasy = getScores('numberSequenceScoresEasy')
const lastTenNumberSequenceScoresEasy = convertScoresToObjs(numberSequenceScoresEasy)
// console.log(lastTenNumberSequenceScoresEasy)

// (medium)

const numberSequenceScoresMedium = getScores('numberSequenceScoresMedium')
const lastTenNumberSequenceScoresMedium = convertScoresToObjs(numberSequenceScoresMedium)

// (hard)

const numberSequenceScoresHard = getScores('numberSequenceScoresHard')
const lastTenNumberSequenceScoresHard = convertScoresToObjs(numberSequenceScoresHard)

// (expert)

const numberSequenceScoresExpert = getScores('numberSequenceScoresExpert')
const lastTenNumberSequenceScoresExpert = convertScoresToObjs(numberSequenceScoresExpert)

// (impossible)

const numberSequenceScoresImpossible = getScores('numberSequenceScoresImpossible')
const lastTenNumberSequenceScoresImpossible = convertScoresToObjs(numberSequenceScoresImpossible)

// Declare the x (horizontal position) scale.
const numberSequenceChartX = d3.scaleLinear()
    .domain([1, 10])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
//this chart goes from 1-20
const numberSequenceChartY = d3.scaleLinear()
    .domain([0, 20])
    .range([height - marginBottom, marginTop]);

const numberSequenceEasyLine = defineLine(numberSequenceChartX, numberSequenceChartY)
const numberSequenceMediumLine = defineLine(numberSequenceChartX, numberSequenceChartY)
const numberSequenceHardLine = defineLine(numberSequenceChartX, numberSequenceChartY)
const numberSequenceExpertLine = defineLine(numberSequenceChartX, numberSequenceChartY)
const numberSequenceImpossibleLine = defineLine(numberSequenceChartX, numberSequenceChartY)

// Create the SVG container.
const nubmerSequenceSVG = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

//add x and y axis and lines + dots to chart
addXAxis(nubmerSequenceSVG, numberSequenceChartX)
addYAxis(nubmerSequenceSVG, numberSequenceChartY)
appendLine(nubmerSequenceSVG, lastTenNumberSequenceScoresEasy, numberSequenceEasyLine, 'red')
addDots(nubmerSequenceSVG, lastTenNumberSequenceScoresEasy, numberSequenceChartX, numberSequenceChartY, 'red')
appendLine(nubmerSequenceSVG, lastTenNumberSequenceScoresMedium, numberSequenceMediumLine, 'black')
addDots(nubmerSequenceSVG, lastTenNumberSequenceScoresMedium, numberSequenceChartX, numberSequenceChartY, 'black')
appendLine(nubmerSequenceSVG, lastTenNumberSequenceScoresHard, numberSequenceHardLine, 'green')
addDots(nubmerSequenceSVG, lastTenNumberSequenceScoresHard, numberSequenceChartX, numberSequenceChartY, 'green')
appendLine(nubmerSequenceSVG, lastTenNumberSequenceScoresExpert, numberSequenceExpertLine, 'blue')
addDots(nubmerSequenceSVG, lastTenNumberSequenceScoresExpert, numberSequenceChartX, numberSequenceChartY, 'blue')
appendLine(nubmerSequenceSVG, lastTenNumberSequenceScoresImpossible, numberSequenceImpossibleLine, 'orange')
addDots(nubmerSequenceSVG, lastTenNumberSequenceScoresImpossible, numberSequenceChartX, numberSequenceChartY, 'orange')

// Append the SVG element.
numberSequenceChartContainer.append(nubmerSequenceSVG.node());