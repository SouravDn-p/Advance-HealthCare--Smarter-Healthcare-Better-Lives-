"use client";

import { useEffect, useRef } from "react";

export default function AnalysisChart({ data }) {
  const chartRef = useRef(null);

  // This would use actual data from the API
  const chartData = data?.chartData || {
    labels: [
      "Glucose",
      "Cholesterol",
      "Blood Pressure",
      "Vitamin D",
      "Hemoglobin",
      "White Blood Cells",
    ],
    values: [110, 185, 120, 18, 14.2, 7.5],
    normalRanges: [
      { min: 70, max: 100 }, // Glucose
      { min: 125, max: 200 }, // Cholesterol
      { min: 90, max: 120 }, // Blood Pressure
      { min: 30, max: 100 }, // Vitamin D
      { min: 13.5, max: 17.5 }, // Hemoglobin
      { min: 4.5, max: 11 }, // White Blood Cells
    ],
  };

  useEffect(() => {
    // This is a simple canvas-based chart implementation
    // In a real application, you might want to use a library like Chart.js
    if (!chartRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up chart dimensions
    const chartWidth = width - 100;
    const chartHeight = height - 80;
    const barWidth = chartWidth / chartData.labels.length / 2;
    const startX = 80;
    const startY = height - 40;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(startX, 20);
    ctx.lineTo(startX, startY);
    ctx.lineTo(width - 20, startY);
    ctx.strokeStyle = "#333";
    ctx.stroke();

    // Find max value for scaling
    const maxValue = Math.max(...chartData.values) * 1.2;

    // Draw bars and labels
    chartData.labels.forEach((label, i) => {
      const x =
        startX +
        i * (chartWidth / chartData.labels.length) +
        chartWidth / chartData.labels.length / 4;

      // Draw normal range
      const normalMin = chartData.normalRanges[i].min;
      const normalMax = chartData.normalRanges[i].max;
      const normalMinY = startY - (normalMin / maxValue) * chartHeight;
      const normalMaxY = startY - (normalMax / maxValue) * chartHeight;

      ctx.fillStyle = "rgba(200, 230, 200, 0.5)";
      ctx.fillRect(
        x - barWidth / 2,
        normalMaxY,
        barWidth,
        normalMinY - normalMaxY
      );

      // Draw bar
      const value = chartData.values[i];
      const barHeight = (value / maxValue) * chartHeight;
      const y = startY - barHeight;

      // Determine color based on whether value is in normal range
      let barColor;
      if (value < normalMin || value > normalMax) {
        barColor = "#f87171"; // Red for abnormal
      } else {
        barColor = "#4ade80"; // Green for normal
      }

      ctx.fillStyle = barColor;
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

      // Draw value
      ctx.fillStyle = "#333";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(value, x, y - 5);

      // Draw label
      ctx.fillStyle = "#333";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(label, x, startY + 20);
    });

    // Draw y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue * i) / 5);
      const y = startY - (value / maxValue) * chartHeight;

      ctx.fillStyle = "#666";
      ctx.font = "10px Arial";
      ctx.textAlign = "right";
      ctx.fillText(value, startX - 5, y + 3);

      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(width - 20, y);
      ctx.strokeStyle = "#ddd";
      ctx.stroke();
    }
  }, [chartData]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Visualizations</h3>
        <p className="text-sm text-gray-500">
          Visual representation of key metrics and their normal ranges
        </p>
      </div>

      <div className="divider"></div>

      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-semibold mb-4 text-center">
          Key Metrics Comparison
        </h4>
        <div className="flex justify-center">
          <canvas
            ref={chartRef}
            width={600}
            height={400}
            className="max-w-full"
          ></canvas>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#4ade80] mr-2"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#f87171] mr-2"></div>
            <span>Abnormal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[rgba(200,230,200,0.5)] mr-2"></div>
            <span>Normal Range</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Trend Analysis</h4>
          <p className="text-gray-700">
            Based on your historical data, glucose levels have shown a 15%
            increase over the past 3 months, while cholesterol has remained
            stable. Vitamin D levels continue to be below the recommended range.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">AI Insights</h4>
          <p className="text-gray-700">
            The combination of elevated glucose and low vitamin D suggests
            potential metabolic issues. Consider consulting with an
            endocrinologist for a more comprehensive evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
