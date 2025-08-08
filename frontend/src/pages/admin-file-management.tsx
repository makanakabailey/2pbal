import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import FileManager from '@/components/ui/file-manager';
import { 
  Cloud, 
  HardDrive, 
  Upload, 
  Download,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  AlertCircle
} from 'lucide-react';

interface FileDashboardData {
  summary: {
    totalFiles: number;
    totalSize: number;
    totalSizeFormatted: string;
    filesByType: {
      image: number;
      video: number;
      document: number;
      audio: number;
      archive: number;
      other: number;
    };
  };
  files: {
    filename: string;
    mimetype: string;
    size: number;
    cloudinary_url: string;
    cloudinary_public_id: string;
    upload_date: string;
    quoteId: number;
    quoteEmail: string;
    category: 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other';
    optimized_url: string;
  }[];
}

export default function AdminFileManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch file dashboard data
  const { data, isLoading, error } = useQuery<FileDashboardData>({
    queryKey: ['/api/admin/files/dashboard'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Delete files mutation
  const deleteFilesMutation = useMutation({
    mutationFn: async (publicIds: string[]) => {
      const response = await fetch('/api/files/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicIds }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete files');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Files deleted',
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/files/dashboard'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting files',
        description: error.message || 'Failed to delete files',
        variant: 'destructive',
      });
    },
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/admin/files/dashboard'] });
    toast({
      title: 'Refreshing',
      description: 'File data is being refreshed...',
    });
  };

  const handleDelete = (publicIds: string[]) => {
    if (confirm(`Are you sure you want to delete ${publicIds.length} file(s)? This action cannot be undone.`)) {
      deleteFilesMutation.mutate(publicIds);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading file data</h3>
            <p className="text-gray-500 mb-4">
              Failed to load file management dashboard. Please try again.
            </p>
            <Button onClick={handleRefresh}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const summary = data?.summary || {
    totalFiles: 0,
    totalSize: 0,
    totalSizeFormatted: '0 MB',
    filesByType: { image: 0, video: 0, document: 0, audio: 0, archive: 0, other: 0 }
  };

  const files = data?.files || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Management</h1>
          <p className="text-gray-500 mt-1">
            Manage all uploaded files from quotes and other forms
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-green-600">
            <Cloud className="h-4 w-4" />
            <span className="text-sm font-medium">Cloudinary Connected</span>
          </div>
        </div>
      </div>

      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="h-5 w-5 mr-2" />
            Storage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.document}</div>
              <div className="text-sm text-gray-500">Documents</div>
            </div>
            
            <div className="text-center">
              <Image className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.image}</div>
              <div className="text-sm text-gray-500">Images</div>
            </div>
            
            <div className="text-center">
              <Video className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.video}</div>
              <div className="text-sm text-gray-500">Videos</div>
            </div>
            
            <div className="text-center">
              <Music className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.audio}</div>
              <div className="text-sm text-gray-500">Audio</div>
            </div>
            
            <div className="text-center">
              <Archive className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.archive}</div>
              <div className="text-sm text-gray-500">Archives</div>
            </div>
            
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto text-gray-500 mb-2" />
              <div className="text-2xl font-bold">{summary.filesByType.other}</div>
              <div className="text-sm text-gray-500">Other</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Manager */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files ({summary.totalFiles})</TabsTrigger>
          <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
          <TabsTrigger value="large">Large Files</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <FileManager
            files={files}
            summary={summary}
            onRefresh={handleRefresh}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="recent">
          <FileManager
            files={files.slice(0, 20)} // Show last 20 files
            onRefresh={handleRefresh}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="large">
          <FileManager
            files={files.filter(file => file.size > 1024 * 1024)} // Files larger than 1MB
            onRefresh={handleRefresh}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Cloudinary Usage Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-700">Cloudinary Free Tier Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            <div className="flex justify-between items-center mb-2">
              <span>Storage Used:</span>
              <span className="font-medium">{summary.totalSizeFormatted} / 25 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${Math.min((summary.totalSize / (25 * 1024 * 1024 * 1024)) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Files are automatically optimized and delivered via Cloudinary's CDN for fast loading.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}