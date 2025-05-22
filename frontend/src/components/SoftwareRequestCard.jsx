const statusColors = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export default function SoftwareRequestCard({ request }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-md transition-transform hover:scale-[1.01]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {request.software.name}
        </h3>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            statusColors[request.status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {request.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">
        {request.software.description.slice(0, 300)}
      </p>
    </div>
  );
}
