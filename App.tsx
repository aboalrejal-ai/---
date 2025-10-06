
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ErrorBoundary } from './components'
import { AppLayout } from './components'
import { LandingPage, LoginPage, Dashboard } from './views'
import { LoadingSpinner } from './components/ui'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // هنا سنتحقق من حالة المصادقة لاحقاً
  // مؤقتاً سنسمح للجميع بالوصول للصفحات المحمية
  return <>{children}</>
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              {/* الصفحات العامة */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* الصفحات المحمية */}
              <Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* إضافة صفحات أخرى هنا لاحقاً */}
                {/* <Route path="/members" element={<MembersPage />} /> */}
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                {/* <Route path="/events" element={<EventsPage />} /> */}
                {/* <Route path="/attendance" element={<AttendancePage />} /> */}
                {/* <Route path="/recitation" element={<RecitationPage />} /> */}
                {/* <Route path="/finance" element={<FinancePage />} /> */}
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
              </Route>

              {/* إعادة توجيه المسارات غير المعروفة */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App