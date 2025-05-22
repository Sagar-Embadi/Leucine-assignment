import { FileX2 } from "lucide-react"; // Optional: lucide-react for icons

export default function NoRequests() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <FileX2 className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">No Requests Raised</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        It looks like there are no software requests yet. Once requests are submitted, they will appear here.
      </p>
    </div>
  );
}