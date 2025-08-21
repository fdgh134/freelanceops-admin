import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPreview from './components/DashboardPreview'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPreview />} />
      {/* <Route path="/projects" element={<ProjectsPage />} /> 등... */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
