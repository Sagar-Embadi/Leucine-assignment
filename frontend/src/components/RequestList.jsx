import React from "react";

const RequestList = ({ requests, onUpdateStatus }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Requests</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {requests.map((req) => (
    <div
      key={req.id}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-5"
    >
      <div className="space-y-1 text-gray-700">
        <p>
          <span className="font-semibold">User:</span> {req.user.username}
        </p>
        <p>
          <span className="font-semibold">Software:</span> {req.software.name}
        </p>
        <p>
          <span className="font-semibold">Access:</span> {req.accessType}
        </p>
        <p>
          <span className="font-semibold">Reason:</span> {req.reason}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-sm ${
              req.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : req.status === "Approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {req.status}
          </span>
        </p>
      </div>

      {req.status === "Pending" && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onUpdateStatus(req.id, "Approved")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 px-4 rounded-lg transition"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(req.id, "Rejected")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-4 rounded-lg transition"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  ))}
  </div>

  
</div>

  );
};

export default RequestList;
