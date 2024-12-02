import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import TopicsList from "../components/TopicsList";
import Leaderboard from "../components/Leaderboard";
import ActivityChart from "../components/ActivityChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [activePage, setActivePage] = useState("reports");

  useEffect(() => {
    fetch("/task-data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handleDownload = async () => {
    if (!data) return;

    const response = await fetch(
      "https://testd5-img.azurewebsites.net/api/imgdownload",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api: data.api_secret }),
      }
    );
    const result = await response.json();
    const base64Image = result.image;

    const a = document.createElement("a");
    a.href = `data:image/png;base64,${base64Image}`;
    a.download = "dashboard_image.png";
    a.click();
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Reports</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownload}
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download
            </button>
          </div>
        </header>

        {/* Grey Line */}
        <div className="border-t border-gray-300" />

        {/* Dropdown Section */}
        <section className="flex justify-between gap-6">
          <div className="w-1/3">
            <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Timeframe:</option>
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>All-time</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="w-1/3">
            <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>People:</option>
              <option>All Users</option>
              <option>Managers</option>
              <option>Trainers</option>
              <option>Umang</option>
              <option>Deepanshu</option>
            </select>
          </div>
          <div className="w-1/3">
            <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Topic:</option>
              <option>Covid Protocols</option>
              <option>Social Media</option>
            </select>
          </div>
        </section>

        {/* 50-50 Grid Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Active Users",
                  value: (
                    <>
                      <span>{data.metrics.active_users.current}</span>
                      <span className="text-gray-400">
                        /{data.metrics.active_users.total}
                      </span>
                    </>
                  ),
                },
                {
                  title: "Questions Answered",
                  value: data.metrics.questions_answered,
                },
                {
                  title: "Avg. Session Length",
                  value: `${Math.floor(
                    data.metrics.average_session_length_seconds / 60
                  )}m ${data.metrics.average_session_length_seconds % 60}s`,
                },
                {
                  title: "Starting Knowledge",
                  value: `${data.metrics.starting_knowledge_percentage}%`,
                },
                {
                  title: "Current Knowledge",
                  value: `${data.metrics.current_knowledge_percentage}%`,
                },
                {
                  title: "Knowledge Gain",
                  value: `${
                    data.metrics.current_knowledge_percentage -
                    data.metrics.starting_knowledge_percentage
                  }%`,
                },
              ].map((metric, index) => (
                <MetricCard
                  key={index}
                  title={<span className="text-gray-600">{metric.title}</span>} // Darker title for contrast
                  value={metric.value}
                />
              ))}
            </div>
          </div>

          <div>
            {/* Activity Chart */}
            <ActivityChart data={data} />
          </div>
        </section>

        {/* Weakest and Strongest Topics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <TopicsList
              data={data.topics.weakest}
              title="Weakest Topics"
              isStrong={false}
            />
          </div>

          <div>
            <TopicsList
              data={data.topics.strongest}
              title="Strongest Topics"
              isStrong={true}
            />
          </div>
        </section>

        {/* User Leaderboard and Groups Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <Leaderboard
              title="User Leaderboard"
              isUserLeaderboard={true}
              data={data.user_leaderboard}
            />
          </div>
          <div>
            <Leaderboard
              title="Groups Leaderboard"
              isUserLeaderboard={false}
              data={data.groups_leaderboard}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
