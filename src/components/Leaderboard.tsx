type User = {
  name: string;
  image: string;
  points: number;
  accuracy_percentage: number;
  previous_accuracy_percentage?: number;
};

type Group = {
  group_name: string;
  points_per_user: number;
  accuracy_percentage: number;
  previous_accuracy_percentage?: number;
};

type Props = {
  title: string;
  isUserLeaderboard: boolean;
  data: (User | Group)[];
};

const Leaderboard = ({ title, isUserLeaderboard, data }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-sm text-gray-500 mb-4">{title}</h3>
      <ul className="space-y-2">
        {data.map((entry, index) => {
          // Determine if the accuracy has increased or decreased
          const isAccuracyImproved = 'accuracy_percentage' in entry && 'previous_accuracy_percentage' in entry
            ? entry.accuracy_percentage > (entry.previous_accuracy_percentage ?? 0)
            : true;
          return (
            <li key={index} className="flex items-start space-x-4">
              {"image" in entry ? (
                <img src={entry.image} alt={entry.name} className="w-16 h-16 rounded-full" />
              ) : (
                <span className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-center text-sm">
                  {entry.group_name.charAt(0)}
                </span>
              )}
              <div className="flex-1">
                <span className="font-semibold">{'name' in entry ? entry.name : entry.group_name}</span>

                {/* Points and Accuracy */}
                <div className="mt-1 text-sm">
                  {'points' in entry ? (
                    <span className="block">
                      {entry.points} Points - {entry.accuracy_percentage}% Correct
                    </span>
                  ) : (
                    <span className="block">
                      {entry.points_per_user} Points / User - {entry.accuracy_percentage}% Correct
                    </span>
                  )}
                </div>
              </div>

              {/* Rank and Arrow */}
              <div className="flex items-center space-x-2 ml-4">
                <span className="font-bold">{index + 1}</span> {/* Rank number */}
                <span
                  className={`w-4 h-4 mt-1 ${
                    isAccuracyImproved ? "text-green-500 rotate-180" : "text-red-500 rotate-0 mt-0"
                  }`}
                >
                  ▼ 
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
