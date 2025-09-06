import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, BookOpen, FileText, TrendingUp, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { stats, loading, error, refetch } = useDashboardStats()
  const { toast } = useToast()

  const handleRefresh = async () => {
    try {
      await refetch()
      toast({
        title: "Data Refreshed",
        description: "Dashboard statistics have been updated.",
      })
    } catch (err) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh dashboard data.",
        variant: "destructive"
      })
    }
  }

  const dashboardStats = [
    {
      title: 'Total Faculty',
      value: loading ? '...' : stats.facultyCount.toString(),
      description: 'Active faculty members',
      icon: Users,
      trend: '+5.2%'
    },
    {
      title: 'Active Events',
      value: loading ? '...' : stats.eventsCount.toString(),
      description: 'Scheduled events',
      icon: Calendar,
      trend: '+12%'
    },
    {
      title: 'Study Materials',
      value: loading ? '...' : stats.materialsCount.toString(),
      description: 'Available resources',
      icon: BookOpen,
      trend: '+18%'
    },
    {
      title: 'News Articles',
      value: loading ? '...' : stats.newsCount.toString(),
      description: 'Published articles',
      icon: FileText,
      trend: '+7%'
    }
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard data: {error}
          </AlertDescription>
        </Alert>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your college management system.
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="flex items-center pt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">{stat.trend}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across all modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Database connected successfully</p>
                  <p className="text-sm text-muted-foreground">System operational</p>
                </div>
                <div className="text-sm text-muted-foreground">Now</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Backend services running</p>
                  <p className="text-sm text-muted-foreground">All systems online</p>
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <div className="flex items-center">
                  <Activity className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="flex items-center">
                  <Activity className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <span className="text-sm">78% used</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup</span>
                <span className="text-sm text-muted-foreground">Last: 2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <button className="text-left p-2 hover:bg-muted rounded text-sm">
              Add New Faculty Member
            </button>
            <button className="text-left p-2 hover:bg-muted rounded text-sm">
              Create Event
            </button>
            <button className="text-left p-2 hover:bg-muted rounded text-sm">
              Upload Study Material
            </button>
            <button className="text-left p-2 hover:bg-muted rounded text-sm">
              Publish News Article
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
            <CardDescription>
              Your current access level: <strong className="capitalize">Admin</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Faculty Management</span>
                <span className="text-green-500">Full Access</span>
              </div>
              <div className="flex justify-between">
                <span>Events Management</span>
                <span className="text-green-500">Full Access</span>
              </div>
              <div className="flex justify-between">
                <span>User Management</span>
                <span className="text-green-500">Full Access</span>
              </div>
              <div className="flex justify-between">
                <span>System Settings</span>
                <span className="text-green-500">Full Access</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}