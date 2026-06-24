import AdminLeftPanel from '../../../components/admin/AdminLeftPanel'

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AdminLeftPanel />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Students</h1>
        <p className="text-gray-500">Student management coming soon!</p>
      </div>
    </div>
  )
}
