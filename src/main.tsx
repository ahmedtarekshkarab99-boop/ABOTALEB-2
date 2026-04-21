import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Layout } from './shared/components/Layout'
import { WarehouseModule } from './modules/warehouse'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
})

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
      <p className="text-slate-600 mt-2">مرحبا بك في نظام إدارة مطحنة القهوة</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">الصفحة غير موجودة</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/warehouse" element={<WarehouseModule />} />
            <Route path="/suppliers" element={<NotFound />} />
            <Route path="/customers" element={<NotFound />} />
            <Route path="/workers" element={<NotFound />} />
            <Route path="/production" element={<NotFound />} />
            <Route path="/expenses" element={<NotFound />} />
            <Route path="/sales" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
