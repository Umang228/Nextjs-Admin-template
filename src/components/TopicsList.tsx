type Topic = { name: string; image: string; correct_percentage: number };

type DataProps = {
  data: Topic[];
  title: string;
  isStrong: boolean;
};

const TopicsList = ({ data, title, isStrong }: DataProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-sm mb-6 text-gray-500">{title}</h3>
      <ul className="space-y-4">
        {data.map((topic, index) => (
          <li key={index} className="flex items-start space-x-4">
            {/* Topic Image */}
            <img
              src={topic.image}
              alt={topic.name}
              className="w-16 h-12 object-cover rounded"
            />
            <div className="flex-1">
              {/* Topic Title */}
              <span className="block text-sm font-semibold">{topic.name}</span>
              {/* Progress Bar with Percentage */}
              <div className="mt-2 flex items-center">
                <div className="w-full bg-gray-200 h-2 rounded-full relative">
                  <div
                    className={`h-2 rounded-full absolute top-0 left-0 ${
                      isStrong ? "bg-green-400" : "bg-orange-400"
                    }`}
                    style={{ width: `${topic.correct_percentage}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-bold">
                  {topic.correct_percentage}%
                  <span className="ml-1 text-gray-500 text-xs">Correct</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsList;
