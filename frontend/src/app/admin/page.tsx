'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Package, ShoppingCart, DollarSign, 
  BarChart3, Settings, LogOut, Search, Bell
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹24,50,000', icon: <DollarSign className="w-5 h-5 text-green" /> },
    { label: 'Active Orders', value: '45', icon: <ShoppingCart className="w-5 h-5 text-green" /> },
    { label: 'Total Products', value: '128', icon: <Package className="w-5 h-5 text-green" /> },
    { label: 'Total Customers', value: '892', icon: <Users className="w-5 h-5 text-green" /> },
  ];

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 pb-24 flex items-center justify-center">
        <div className="text-center bg-dark-card border border-dark-border p-10 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-muted-fg mb-6">You do not have administrator privileges.</p>
          <Button variant="gold" onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-dark-border/60 bg-dark-card/50 backdrop-blur-md fixed top-0 w-full z-30 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-white tracking-widest">
            B<span className="text-gold">KP</span> Admin
          </span>
          <span className="bg-green/10 text-green text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-2">v2.0</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
            <input 
              type="text" 
              placeholder="Search orders, users..." 
              className="bg-dark-bg border border-dark-border text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-green transition-colors w-64 text-white"
            />
          </div>
          <button className="relative w-8 h-8 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center text-muted-fg hover:text-white">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-dark-card"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-sm border border-gold/30">
            {user.name?.charAt(0) || 'A'}
          </div>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-dark-border/60 bg-dark-card/30 fixed h-[calc(100vh-64px)] hidden md:flex flex-col">
          <div className="p-4 flex-1">
            <nav className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-muted-fg uppercase tracking-widest px-3 mb-2 mt-4">Menu</span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? 'bg-green/10 text-green font-semibold' 
                      : 'text-muted-fg hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-dark-border/60">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 md:ml-64 p-6 md:p-10">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-white capitalize">{activeTab}</h1>
                <p className="text-sm text-muted-fg mt-1">Manage your enterprise platform.</p>
              </div>
              {activeTab === 'products' && (
                <Button variant="gold" size="sm">Add New Product</Button>
              )}
            </div>

            {activeTab === 'overview' && (
              <div className="flex flex-col gap-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-dark-card border border-dark-border/60 rounded-2xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-dark-bg flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-fg font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Orders Table Placeholder */}
                  <div className="lg:col-span-2 bg-dark-card border border-dark-border/60 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-muted-fg border-b border-dark-border/60">
                            <th className="pb-3 font-medium">Order ID</th>
                            <th className="pb-3 font-medium">Customer</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          <tr className="border-b border-dark-border/30">
                            <td className="py-3">#ORD-9021</td>
                            <td className="py-3">Anjali Sharma</td>
                            <td className="py-3"><span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">In Production</span></td>
                            <td className="py-3">₹1,20,000</td>
                          </tr>
                          <tr className="border-b border-dark-border/30">
                            <td className="py-3">#ORD-9020</td>
                            <td className="py-3">Rahul Verma</td>
                            <td className="py-3"><span className="text-xs bg-green/10 text-green px-2 py-1 rounded-full">Delivered</span></td>
                            <td className="py-3">₹45,000</td>
                          </tr>
                          <tr>
                            <td className="py-3">#ORD-9019</td>
                            <td className="py-3">Priya Kapoor</td>
                            <td className="py-3"><span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">Material Selection</span></td>
                            <td className="py-3">₹2,80,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Activity Log Placeholder */}
                  <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                    <div className="flex flex-col gap-3">
                      <button className="text-left text-sm p-3 rounded-lg bg-dark-surface hover:bg-dark-border/50 transition-colors text-white border border-dark-border/40">
                        Update Tracking Status
                      </button>
                      <button className="text-left text-sm p-3 rounded-lg bg-dark-surface hover:bg-dark-border/50 transition-colors text-white border border-dark-border/40">
                        Review New Quotation Requests
                      </button>
                      <button className="text-left text-sm p-3 rounded-lg bg-dark-surface hover:bg-dark-border/50 transition-colors text-white border border-dark-border/40">
                        Manage Catalog Inventory
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Fallback */}
            {activeTab !== 'overview' && (
              <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-muted-fg" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Module Under Construction</h3>
                <p className="text-sm text-muted-fg max-w-sm">
                  The {activeTab} management interface is currently being integrated with the new backend API endpoints.
                </p>
              </div>
            )}

          </motion.div>
        </main>
      </div>
    </div>
  );
}
