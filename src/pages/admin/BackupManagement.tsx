import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Download, 
  Upload, 
  MoreHorizontal, 
  Database, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  HardDrive
} from 'lucide-react';

const mockBackups = [
  {
    id: 1,
    name: 'Full System Backup - Feb 2024',
    type: 'Full',
    date: '2024-02-20',
    time: '02:00 AM',
    size: '2.4 GB',
    status: 'completed',
    duration: '45 minutes',
    includes: ['Database', 'Files', 'Images', 'Configuration']
  },
  {
    id: 2,
    name: 'Database Backup - Feb 19',
    type: 'Database',
    date: '2024-02-19',
    time: '03:00 AM',
    size: '456 MB',
    status: 'completed',
    duration: '12 minutes',
    includes: ['Database']
  },
  {
    id: 3,
    name: 'Files Backup - Feb 18',
    type: 'Files',
    date: '2024-02-18',
    time: '02:30 AM',
    size: '1.8 GB',
    status: 'completed',
    duration: '28 minutes',
    includes: ['Content', 'Gallery', 'Documents']
  },
  {
    id: 4,
    name: 'Scheduled Backup - Feb 17',
    type: 'Full',
    date: '2024-02-17',
    time: '02:00 AM',
    size: '2.3 GB',
    status: 'failed',
    duration: '15 minutes',
    includes: ['Database', 'Files', 'Images', 'Configuration']
  }
];

export default function BackupManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCreateBackup = () => {
    setIsCreating(true);
    setProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Processing</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Backup & Restore</h2>
        <p className="text-muted-foreground">
          Manage system backups and data restoration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 20, 2024</div>
            <p className="text-xs text-muted-foreground">2:00 AM - Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 GB</div>
            <p className="text-xs text-muted-foreground">Last 10 backups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tonight</div>
            <p className="text-xs text-muted-foreground">2:00 AM - Full Backup</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Backup</CardTitle>
              <CardDescription>
                Create an immediate backup of your system data.
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Restore
              </Button>
              <Button 
                size="sm" 
                onClick={handleCreateBackup}
                disabled={isCreating}
              >
                <Database className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating...' : 'Create Backup'}
              </Button>
            </div>
          </div>
        </CardHeader>
        {isCreating && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Creating backup...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>
            View and manage previous system backups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Backup Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{backup.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Includes: {backup.includes.join(', ')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{backup.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{backup.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{backup.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>{backup.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(backup.status)}
                        {getStatusBadge(backup.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="h-4 w-4 mr-2" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Database className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
