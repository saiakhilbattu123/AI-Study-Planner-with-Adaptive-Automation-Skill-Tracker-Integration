import React, { useState } from 'react';
import type { Notification } from '../types';
import { Bell, Calendar, Check, FileText } from 'lucide-react';

interface NotificationPanelProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const iconMap = {
  calendar: <Calendar className="w-5 h-5 text-brand-red" />,
  document: <FileText className="w-5 h-5 text-brand-red" />,
  alert: <Bell className="w-5 h-5 text-brand-red" />,
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, setNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div
      className="absolute top-6 right-6 z-30"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="relative p-2 rounded-full bg-brand-card hover:bg-gray-100 transition-colors">
        <Bell className="w-6 h-6 text-brand-gray" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-brand-red ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-brand-card rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-brand-charcoal">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-brand-red hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          <div className="overflow-y-auto max-h-96 p-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className={`p-2 my-1 rounded-lg transition-all text-xs ${notification.read ? 'bg-gray-100 opacity-70' : 'bg-brand-beige'}`}>
                  <div className="flex items-start space-x-2.5">
                    <div className="flex-shrink-0 mt-0.5">{iconMap[notification.icon]}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-brand-charcoal">{notification.title}</p>
                      <p className="text-brand-gray">{notification.detail}</p>
                    </div>
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)} title="Mark as read" className="p-1 text-brand-gray hover:text-green-600 rounded-full">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-brand-gray p-6">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;