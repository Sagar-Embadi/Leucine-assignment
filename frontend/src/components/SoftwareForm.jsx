import React, { useState } from "react";

const SoftwareForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "accessLevels") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.accessLevels, value]
          : prev.accessLevels.filter((level) => level !== value);
        return { ...prev, accessLevels: updated };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Create Software
      </h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Software Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter software name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Access Levels</p>
        <div className="flex items-center gap-2 justify-around">
          {["Read", "Write", "Admin"].map((level) => (
            <label
              key={level}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="checkbox"
                name="accessLevels"
                value={level}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 "
              />
              <span className="ml-2">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Create
      </button>
    </form>
  );
};

export default SoftwareForm;
