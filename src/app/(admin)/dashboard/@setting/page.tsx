// src/app/(admin)/dashboard/@settings/page.tsx
export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Settings</h2>
      <p className="text-gray-300">Manage preferences and configurations.</p>
      <div className="mt-4 flex gap-4">
        <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
          Change Password
        </button>
        <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
          Log Out
        </button>
      </div>
    </div>
  )
}
