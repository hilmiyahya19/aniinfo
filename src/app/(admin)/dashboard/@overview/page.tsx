// src/app/(admin)/dashboard/@overview/page.tsx
export default function OverviewPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Overview</h2>
      <p className="text-gray-300">Summary of admin activities.</p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-blue-600 rounded-xl">Users: 120</div>
        <div className="p-4 bg-green-600 rounded-xl">Posts: 45</div>
        <div className="p-4 bg-yellow-500 rounded-xl">Comments: 230</div>
      </div>
    </div>
  )
}

