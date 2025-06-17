import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Chart2D({ data, xKey, yKey }) {
  if (!data?.length || !xKey || !yKey || !data[0][xKey] || !data[0][yKey]) {
    return <p style={{ color: "red" }}>Invalid or missing data for 2D chart.</p>;
  }

  const chartData = {
    labels: data.map((d) => d[xKey]),
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data: data.map((d) => d[yKey]),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} />
    </div>
  );
}
