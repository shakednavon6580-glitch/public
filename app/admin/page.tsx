export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface px-6 py-4">
        <h1 className="text-title font-semibold text-text-primary">
          Admin Dashboard
        </h1>
      </header>
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="surface-card p-6">
              <h3 className="text-body font-semibold text-text-primary mb-2">
                Project Management
              </h3>
              <p className="text-caption text-text-secondary">
                Edit project details and content
              </p>
            </div>
            <div className="surface-card p-6">
              <h3 className="text-body font-semibold text-text-primary mb-2">
                Media Assets
              </h3>
              <p className="text-caption text-text-secondary">
                Upload and organize images and videos
              </p>
            </div>
            <div className="surface-card p-6">
              <h3 className="text-body font-semibold text-text-primary mb-2">
                Testimonials
              </h3>
              <p className="text-caption text-text-secondary">
                Manage student testimonials
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
