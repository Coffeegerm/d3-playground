import * as d3 from "d3";

const startDate = new Date("2023-01-01T00:00:00");
const endDate = new Date("2023-01-02T00:00:00");

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Function to generate random date between two dates
function randomDate(start = startDate, end = endDate) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to generate random blood glucose level between 50 and 350
function randomGlucoseLevel() {
  return Math.floor(Math.random() * (200 - 50 + 1)) + 50;
}

// Generate mock data
const data = Array.from({ length: 20 }, () => ({
  date: randomDate(),
  glucose: randomGlucoseLevel(),
})).sort((a, b) => a.date - b.date);

const allGlucoseLevels = data.map((d) => d.glucose);

// Declare the x (horizontal position) scale.
const x = d3
  .scaleUtc()
  .domain([startDate, endDate])
  .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3
  .scaleLinear()
  .domain([d3.min(allGlucoseLevels) - 10, d3.max(allGlucoseLevels) + 10])
  .range([height - marginBottom, marginTop]);

const line = d3
  .line()
  .x((d) => x(d.date))
  .y((d) => y(d.glucose));

// Create the SVG container.
const svg = d3.create("svg").attr("width", width).attr("height", height);

// Add the x-axis.
svg
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(x));

// Add the y-axis.
svg
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y));

svg
  .append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", line);

export function createGlucoseGraph(element) {
  element.append(svg.node());
}
