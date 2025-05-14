
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New task assigned",
    message: "You have been assigned a new document verification task",
    date: "2025-05-10",
    read: false
  },
  {
    id: "2",
    title: "Task completed",
    message: "John Doe completed the background verification task",
    date: "2025-05-09",
    read: false
  },
  {
    id: "3",
    title: "Document uploaded",
    message: "Jane Smith uploaded their ID proof document",
    date: "2025-05-08",
    read: true
  },
  {
    id: "4",
    title: "Reminder",
    message: "Please complete your pending tasks by the end of the week",
    date: "2025-05-07",
    read: true
  }
];

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="absolute -top-2 -right-1">
            {unreadCount > 0 && (
              <Badge className="bg-red-500 px-1.5">{unreadCount}</Badge>
            )}
          </div>
          <button className="rounded-full hover:bg-blue-700 p-2">
            <Bell className="h-5 w-5 text-white" />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="px-4 py-3 bg-primary/10 flex justify-between items-center border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
