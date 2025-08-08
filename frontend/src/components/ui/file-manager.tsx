import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  Download, 
  ExternalLink, 
  Trash2,
  Upload,
  Eye,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface FileData {
  filename: string;
  mimetype: string;
  size: number;
  cloudinary_url: string;
  cloudinary_public_id: string;
  upload_date: string;
  quoteId?: number;
  quoteEmail?: string;
  category: 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other';
  optimized_url?: string;
}

interface FileManagerProps {
  files: FileData[];
  summary?: {
    totalFiles: number;
    totalSize: number;
    totalSizeFormatted: string;
    filesByType: Record<string, number>;
  };
  onRefresh?: () => void;
  onDelete?: (publicIds: string[]) => void;
}

const getFileIcon = (category: string) => {
  switch (category) {
    case 'image': return <Image className="h-5 w-5 text-blue-500" />;
    case 'video': return <Video className="h-5 w-5 text-purple-500" />;
    case 'document': return <FileText className="h-5 w-5 text-green-500" />;
    case 'audio': return <Music className="h-5 w-5 text-yellow-500" />;
    case 'archive': return <Archive className="h-5 w-5 text-orange-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function FileManager({ files, summary, onRefresh, onDelete }: FileManagerProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewFile, setPreviewFile] = useState<FileData | null>(null);

  // Filter files based on search and category
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.quoteEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectFile = (publicId: string) => {
    setSelectedFiles(prev => 
      prev.includes(publicId) 
        ? prev.filter(id => id !== publicId)
        : [...prev, publicId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length > 0 && onDelete) {
      onDelete(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const FilePreview = ({ file }: { file: FileData }) => {
    if (file.category === 'image') {
      return (
        <img 
          src={file.optimized_url || file.cloudinary_url} 
          alt={file.filename}
          className="max-w-full max-h-96 object-contain rounded-lg"
        />
      );
    } else if (file.category === 'video') {
      return (
        <video 
          src={file.cloudinary_url} 
          controls 
          className="max-w-full max-h-96 rounded-lg"
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          {getFileIcon(file.category)}
          <p className="mt-2 text-sm text-gray-600">Preview not available</p>
          <p className="text-xs text-gray-500">{file.filename}</p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalFiles}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalSizeFormatted}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summary.filesByType.image || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summary.filesByType.document || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
            <option value="audio">Audio</option>
            <option value="archive">Archives</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          
          {selectedFiles.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedFiles.length})
            </Button>
          )}
          
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* File List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.cloudinary_public_id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.cloudinary_public_id)}
                    onChange={() => handleSelectFile(file.cloudinary_public_id)}
                    className="rounded"
                  />
                  <Badge variant="secondary" className="text-xs">
                    {file.category}
                  </Badge>
                </div>
                
                <div className="flex items-center mb-2">
                  {getFileIcon(file.category)}
                  <span className="ml-2 text-sm font-medium truncate flex-1">
                    {file.filename}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Size: {formatFileSize(file.size)}</div>
                  <div>Uploaded: {new Date(file.upload_date).toLocaleDateString()}</div>
                  {file.quoteEmail && (
                    <div>Quote: {file.quoteEmail}</div>
                  )}
                </div>
                
                <div className="flex justify-between mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setPreviewFile(file)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{file.filename}</DialogTitle>
                        <DialogDescription>
                          File preview and download options
                        </DialogDescription>
                      </DialogHeader>
                      <FilePreview file={file} />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm" asChild>
                    <a href={file.cloudinary_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFiles.map((file) => (
            <Card key={file.cloudinary_public_id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.cloudinary_public_id)}
                      onChange={() => handleSelectFile(file.cloudinary_public_id)}
                      className="rounded"
                    />
                    {getFileIcon(file.category)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{file.filename}</div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.upload_date).toLocaleDateString()}
                        {file.quoteEmail && ` • Quote: ${file.quoteEmail}`}
                      </div>
                    </div>
                    <Badge variant="secondary">{file.category}</Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setPreviewFile(file)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{file.filename}</DialogTitle>
                          <DialogDescription>
                            File preview and details
                          </DialogDescription>
                        </DialogHeader>
                        <FilePreview file={file} />
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={file.cloudinary_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Files will appear here when users upload attachments to quotes.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}