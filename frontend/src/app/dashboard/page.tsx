'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Bell, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to access your dashboard</h2>
          <Button variant="gold" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-32 pb-24">
      <div className="container-luxora max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-dark-card border border-dark-border/60 rounded-3xl p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-dark-border/40">
                <div className="w-12 h-12 rounded-full bg-green/20 text-green flex items-center justify-center font-display text-xl font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-white font-semibold truncate max-w-[120px]">{user.name}</h3>
                  <p className="text-muted-fg text-xs truncate max-w-[120px]">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-green text-white shadow-md' 
                        : 'text-muted-fg hover:text-white hover:bg-dark-surface'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-8"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-card border border-dark-border/60 rounded-3xl p-8 min-h-[500px]"
            >
              {activeTab === 'overview' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-dark-bg border border-dark-border rounded-2xl p-5 text-center">
                      <Package className="w-6 h-6 text-green mx-auto mb-2" />
                      <div className="text-3xl font-bold text-white mb-1">0</div>
                      <div className="text-xs text-muted-fg uppercase tracking-widest">Active Orders</div>
                    </div>
                    <div className="bg-dark-bg border border-dark-border rounded-2xl p-5 text-center">
                      <Heart className="w-6 h-6 text-green mx-auto mb-2" />
                      <div className="text-3xl font-bold text-white mb-1">0</div>
                      <div className="text-xs text-muted-fg uppercase tracking-widest">Wishlisted</div>
                    </div>
                    <div className="bg-dark-bg border border-dark-border rounded-2xl p-5 text-center">
                      <MapPin className="w-6 h-6 text-green mx-auto mb-2" />
                      <div className="text-3xl font-bold text-white mb-1">0</div>
                      <div className="text-xs text-muted-fg uppercase tracking-widest">Addresses</div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="bg-dark-bg border border-dark-border rounded-2xl p-10 text-center flex flex-col items-center justify-center text-muted-fg">
                    <p className="text-sm">No recent activity to display.</p>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Order History</h2>
                  <div className="bg-dark-bg border border-dark-border rounded-2xl p-10 text-center flex flex-col items-center justify-center text-muted-fg">
                    <Package className="w-12 h-12 text-dark-border mb-4" />
                    <p className="text-sm">You haven't placed any orders yet.</p>
                    <Button variant="outline" className="mt-4 border-green text-green hover:bg-green hover:text-white">
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}

              {/* Add more tab contents as needed */}
              {['wishlist', 'addresses', 'notifications', 'settings'].includes(activeTab) && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6 capitalize">{activeTab}</h2>
                  <div className="bg-dark-bg border border-dark-border rounded-2xl p-10 text-center flex flex-col items-center justify-center text-muted-fg">
                    <p className="text-sm">This section is currently under development.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
}
