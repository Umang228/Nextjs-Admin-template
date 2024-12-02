import React from 'react';

const ActivityChart = ({ data }) => {
  // Find the maximum value to scale the progress bars
  const maxValue = Math.max(...data.activity.monthly.map(activity => activity.value));

  // Get only the first 4 values from the monthly data
  const limitedValues = data.activity.monthly.slice(0, 4);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold">Activity</h2>
        <span className="text-sm flex items-center">
          Month <span className="ml-1 text-gray-500">&#9660;</span>
        </span>
      </div>
      {/* Grey line below the heading */}
      <hr className="border-t border-gray-300 mb-4" />
      
      <div className="flex justify-center">
        {/* Values aligned vertically on the left (bottom to top) */}
        <div className="flex flex-col justify-between h-32 mr-4">
          {limitedValues
            .map((activity, index) => (
              <span key={index} className="text-sm">
                {activity.value}
              </span>
            ))
            .reverse()} {/* Reverse only the values */}
        </div>

        {/* Vertical Progress Bars */}
        <div className="flex space-x-4">
          {data.activity.monthly.map((activity, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Vertical Progress Bar */}
              <div className="flex items-end h-32 w-2 bg-gray-200 rounded-full mb-2">
                <div
                  className="w-full rounded-full"
                  style={{
                    height: `${(activity.value / maxValue) * 100}%`, // Normalize the height based on the maximum value
                    backgroundColor: '#ADD8E6', // Light blue color for the progress bar
                  }}
                ></div>
              </div>

              {/* Month displayed at the bottom */}
              <span className="text-sm">{activity.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;