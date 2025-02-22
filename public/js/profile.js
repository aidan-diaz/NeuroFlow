//INITIAL CODE DIRECTLY FROM D3 DOCS - https://d3js.org/getting-started#installing-from-npm
//UPDATED PIECES AS NEEDED TO DISPLAY MY USER DATA


// Declare the chart dimensions and margins.
const width = 500;
const height = 280;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

    fetch('/getAllScores', {
        method: 'get',
      })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            //GET THE LAST TEN SCORES FOR EACH TEST AND/OR DIFFICULTY
            let lastTenRecallScoresEasy = getScores(data, 'recallTest', 'easyScores')
            let lastTenRecallScoresMedium = getScores(data, 'recallTest', 'mediumScores')
            let lastTenRecallScoresHard = getScores(data, 'recallTest', 'hardScores')
            let lastTenRecallScoresExpert = getScores(data, 'recallTest', 'expertScores')
            let lastTenRecallScoresImpossible = getScores(data, 'recallTest', 'impossibleScores')

            let lastTenReactionScores = getScores(data, 'reactionTest', 'scores')

            let lastTenNumberSequenceScoresEasy = getScores(data, 'numberSequenceTest', 'easyScores')
            let lastTenNumberSequenceScoresMedium = getScores(data, 'numberSequenceTest', 'mediumScores')
            let lastTenNumberSequenceScoresHard = getScores(data, 'numberSequenceTest', 'hardScores')
            let lastTenNumberSequenceScoresExpert = getScores(data, 'numberSequenceTest', 'expertScores')
            let lastTenNumberSequenceScoresImpossible = getScores(data, 'numberSequenceTest', 'impossibleScores')

            createRecallChart(lastTenRecallScoresEasy, lastTenRecallScoresMedium, lastTenRecallScoresHard, lastTenRecallScoresExpert, lastTenRecallScoresImpossible)
            createReactionChart(lastTenReactionScores)
            createNumberSequenceChart(lastTenNumberSequenceScoresEasy, lastTenNumberSequenceScoresMedium, lastTenNumberSequenceScoresHard, lastTenNumberSequenceScoresExpert, lastTenNumberSequenceScoresImpossible)
        })
        .catch(err => {
          console.log(`error ${err}`)
      })

//CONVERT LAST TEN SCORES INTO OBJECTS TO DRAW LINES LATER
function getScores(data, testType, property) {
    return data[testType][0][property].slice(-10).map((e, i) => {
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
    const tickValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    return svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(chartX).tickFormat((d, i) => tickValues[i])) 
}

function addYAxis(svg, chartY) {
    return svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(chartY))
}

function addVerticalGridLines(svg, xAxis) {
    return svg.selectAll("xGrid")
    .data(xAxis.ticks().slice(1))
    .join("line")
    .attr("x1", d => xAxis(d))
    .attr("x2", d => xAxis(d))
    .attr("y1", marginTop)
    .attr("y2", height - marginBottom)
    .attr("stroke", "gray")
    .attr("stroke-width", .5)
}

function addHorizontalGridLines(svg, yAxis) {
    return svg.selectAll("xGrid")
    .data(yAxis.ticks().slice(1))
    .join("line")
    .attr("x1", marginLeft)
    .attr("x2", width - marginRight)
    .attr("y1", d => yAxis(d))
    .attr("y2", d => yAxis(d))
    .attr("stroke", "gray")
    .attr("stroke-width", .5)
}

function appendTitle(svg, text) {
    return svg.append("text")
    .attr("transform", 'translate(252.5, 0)')
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-family", "bold")
    .style("font-weight", "bold")
    .style("fill", "black")
    .text(text)
}

function appendXAxisText(svg) {
    return svg.append("text")
    .attr("transform", 'translate(252.5, 265)')
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "black")
    .text("last 10 attempts")
}

function appendYAxisText(svg) {
    return svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -5)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "black")
    .text("scores")
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

function createRecallChart(lastTenRecallScoresEasy, lastTenRecallScoresMedium, lastTenRecallScoresHard, lastTenRecallScoresExpert, lastTenRecallScoresImpossible) {
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
        .attr("viewBox", `0 0 ${width} ${height}`)

    //create axes and lines + dots for recall test data (easy)
    addXAxis(recallSVG, recallChartX)
    addYAxis(recallSVG, recallChartY)
    addVerticalGridLines(recallSVG, recallChartX)
    addHorizontalGridLines(recallSVG, recallChartY)
    appendTitle(recallSVG, 'ACTIVE RECALL STATS')
    appendXAxisText(recallSVG)
    appendYAxisText(recallSVG)
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
}

function createReactionChart(lastTenReactionScores) {
    // Declare the x (horizontal position) scale.
    const reactionChartX = d3.scaleLinear()
    .domain([1, 10])
    .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const reactionChartY = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop])

    const reactionScoreLine = defineLine(reactionChartX, reactionChartY)

    // Create the SVG container.
    const reactionSVG = d3.create("svg")
    //trying viewbox for resizing purposes
    .attr("viewBox", `0 0 ${width} ${height}`)

    // Add the x-axis.
    addXAxis(reactionSVG, reactionChartX)
    addVerticalGridLines(reactionSVG, reactionChartX)

    // Add the y-axis.
    addYAxis(reactionSVG, reactionChartY)
    addHorizontalGridLines(reactionSVG, reactionChartY)

    //append line + dots for reaction test data
    appendTitle(reactionSVG, 'REACTION STATS')
    appendXAxisText(reactionSVG)
    appendYAxisText(reactionSVG)
    appendLine(reactionSVG, lastTenReactionScores, reactionScoreLine, 'blue')
    addDots(reactionSVG, lastTenReactionScores, reactionChartX, reactionChartY, 'blue')

    // Append the SVG element.
    reactionChartContainer.append(reactionSVG.node());
}

function createNumberSequenceChart(lastTenNumberSequenceScoresEasy, lastTenNumberSequenceScoresMedium, lastTenNumberSequenceScoresHard, lastTenNumberSequenceScoresExpert, lastTenNumberSequenceScoresImpossible) {
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
    .attr("viewBox", `0 0 ${width} ${height}`)

    //add x and y axis and lines + dots to chart
    addXAxis(nubmerSequenceSVG, numberSequenceChartX)
    addYAxis(nubmerSequenceSVG, numberSequenceChartY)
    addVerticalGridLines(nubmerSequenceSVG, numberSequenceChartX)
    addHorizontalGridLines(nubmerSequenceSVG, numberSequenceChartY)
    appendTitle(nubmerSequenceSVG, 'NUMBER SEQUENCE STATS')
    appendXAxisText(nubmerSequenceSVG)
    appendYAxisText(nubmerSequenceSVG)
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
}



