import { auth } from '@/lib/auth/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Account Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <p className="text-gray-900">{session.user.name || 'Not set'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <p className="text-gray-900">{session.user.email}</p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500">
              To update your profile information, please contact support at{' '}
              <a
                href="mailto:support@zionbonsai.com"
                className="text-green-600 hover:text-green-700"
              >
                support@zionbonsai.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Email Preferences (Placeholder) */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Email Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Order Updates</p>
              <p className="text-sm text-gray-600">
                Receive email notifications about your orders
              </p>
            </div>
            <span className="text-sm text-green-600">✓ Enabled</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Workshop Reminders</p>
              <p className="text-sm text-gray-600">
                Get reminders before your scheduled workshops
              </p>
            </div>
            <span className="text-sm text-green-600">✓ Enabled</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Newsletter</p>
              <p className="text-sm text-gray-600">
                Stay updated on new products and workshops
              </p>
            </div>
            <span className="text-sm text-green-600">✓ Enabled</span>
          </div>
        </div>
      </div>

      {/* Account Security (Placeholder) */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Security</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-900 mb-2">Password</p>
            <p className="text-sm text-gray-600 mb-4">
              Last changed: Never
            </p>
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm font-medium"
              disabled
            >
              Change Password (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
