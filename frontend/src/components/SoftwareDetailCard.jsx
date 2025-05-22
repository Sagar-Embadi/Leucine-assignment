// components/SoftwareDetailCard.tsx
import React from "react";
import { CheckCircle } from "lucide-react";

export default function SoftwareDetailCard({ name, description, status }) {
  if (status !== "Approved") return(
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto mt-6">
      <h3>The software request has not been approved yet. Please wait until it is reviewed and approved by the manager.</h3>
    </div>
  )

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="text-green-600 w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-800">
          {name} - Approved
        </h2>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
