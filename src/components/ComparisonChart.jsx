import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GanttChart = ({ executionOrder = [] }) => {
  const data = executionOrder.map((item, index) => ({
    name: `P${item.process}`,
    start: item.start,
    end: item.end,
    duration: item.end - item.start,
  }));

  return (
    <BarChart width={1200} height={100} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="duration" fill="#8884d8" />
    </BarChart>
  );
};

const ComparisonChart = ({ data }) => {
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Comparison Results:</h2>
      <div className="flex flex-wrap">
        <div className="w-full mb-8">
          {data.map((item, index) => (
            <div key={index} className="mt-8">
              <h3 className="text-md font-semibold mb-2">
                {item.algorithm} Gantt Chart
              </h3>
              <GanttChart executionOrder={item.executionOrder} />
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <h3 className="text-md font-semibold mb-2">
            Bar Chart: Performance Metrics
          </h3>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="algorithm" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="avgWaitingTime"
              fill="#8884d8"
              name="Average Waiting Time"
            />
            <Bar
              dataKey="avgTurnaroundTime"
              fill="#82ca9d"
              name="Average Turnaround Time"
            />
            <Bar dataKey="responseTime" fill="#8dd1e1" name="Response Time" />
            <Bar
              dataKey="contextSwitches"
              fill="#ffc658"
              name="Context Switches"
            />
          </BarChart>
        </div>
        <div className="w-1/2">
          <h3 className="text-md font-semibold mb-2">Pie Chart: Fairness</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="fairness"
              nameKey="algorithm"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
