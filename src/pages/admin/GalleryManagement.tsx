import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Upload,
  Images,
  Calendar,
  Camera,
  ImageIcon
} from 'lucide-react';
import { useGallery, GalleryAlbum } from '@/hooks/useGallery';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { useImageUpload } from '@/hooks/useImageUpload';

export default function GalleryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [selectedAlbumForUpload, setSelectedAlbumForUpload] = useState<string | null>(null);
  const [bulkFiles, setBulkFiles] = useState<FileList | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Events',
    status: 'draft' as 'draft' | 'published',
    cover_image_url: null as string | null
  });

  const { 
    albums, 
    loading, 
    error, 
    addAlbum, 
    updateAlbum, 
    deleteAlbum, 
    addPhoto 
  } = useGallery();
  
  const { uploadImage, uploading } = useImageUpload();
  const { toast } = useToast();

  const filteredAlbums = albums.filter(album => {
    const matchesSearch = album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (album.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || album.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(albums.map(a => a.category)))];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAlbum) {
      const result = await updateAlbum(editingAlbum.id, formData);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Album updated successfully'
        });
        resetForm();
      }
    } else {
      const result = await addAlbum(formData);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Album created successfully'
        });
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Events',
      status: 'draft',
      cover_image_url: null
    });
    setEditingAlbum(null);
    setIsCreateOpen(false);
  };

  const handleEdit = (album: GalleryAlbum) => {
    setEditingAlbum(album);
    setFormData({
      name: album.name,
      description: album.description || '',
      category: album.category,
      status: album.status,
      cover_image_url: album.cover_image_url || null
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this album? All photos in this album will also be deleted.')) {
      const result = await deleteAlbum(id);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Album deleted successfully'
        });
      }
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFiles || !selectedAlbumForUpload) return;

    const files = Array.from(bulkFiles);
    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
      try {
        const { url, error } = await uploadImage(file, 'gallery');
        
        if (error) {
          errorCount++;
          continue;
        }

        const photoResult = await addPhoto({
          album_id: selectedAlbumForUpload,
          title: file.name.split('.')[0],
          image_url: url!,
          file_size: file.size,
          uploaded_by: 'admin'
        });

        if (photoResult.error) {
          errorCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        errorCount++;
      }
    }

    toast({
      title: 'Upload Complete',
      description: `${successCount} photos uploaded successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      variant: errorCount > 0 ? 'destructive' : 'default'
    });

    setBulkFiles(null);
    setSelectedAlbumForUpload(null);
    setIsPhotoUploadOpen(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
        <p className="text-muted-foreground">
          Manage photo albums and college gallery content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Photo Albums</CardTitle>
              <CardDescription>
                View and manage all photo albums and gallery content.
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isPhotoUploadOpen} onOpenChange={setIsPhotoUploadOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={albums.length === 0}>
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Upload Photos</DialogTitle>
                    <DialogDescription>
                      Select an album and upload multiple photos at once.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Album</Label>
                      <Select 
                        value={selectedAlbumForUpload || ''} 
                        onValueChange={setSelectedAlbumForUpload}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an album" />
                        </SelectTrigger>
                        <SelectContent>
                          {albums.map(album => (
                            <SelectItem key={album.id} value={album.id}>
                              {album.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Select Photos</Label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setBulkFiles(e.target.files)}
                        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleBulkUpload}
                      disabled={!bulkFiles || !selectedAlbumForUpload || uploading}
                      className="w-full"
                    >
                      {uploading ? 'Uploading...' : `Upload ${bulkFiles?.length || 0} Photos`}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => {
                    setEditingAlbum(null);
                    setFormData({
                      name: '',
                      description: '',
                      category: 'Events',
                      status: 'draft',
                      cover_image_url: null
                    });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Album
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingAlbum ? 'Edit Album' : 'Create New Album'}</DialogTitle>
                    <DialogDescription>
                      {editingAlbum ? 'Update album details' : 'Create a new photo album'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Album Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Events">Events</SelectItem>
                            <SelectItem value="Campus">Campus</SelectItem>
                            <SelectItem value="Faculty">Faculty</SelectItem>
                            <SelectItem value="Students">Students</SelectItem>
                            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <ImageUpload
                        currentImage={formData.cover_image_url}
                        onImageChange={(url) => setFormData(prev => ({ ...prev, cover_image_url: url }))}
                        folder="gallery"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingAlbum ? 'Update Album' : 'Create Album'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filteredAlbums.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No albums found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {albums.length === 0 ? 'Get started by creating your first album.' : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAlbums.map((album) => (
                <Card key={album.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {album.cover_image_url ? (
                      <img 
                        src={album.cover_image_url} 
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex items-center space-x-2 text-white">
                        <Camera className="h-5 w-5" />
                        <span className="font-medium">{album.photo_count || 0} photos</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{album.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(album)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Album
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedAlbumForUpload(album.id);
                              setIsPhotoUploadOpen(true);
                            }}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Add Photos
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(album.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{album.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{album.category}</Badge>
                        <Badge variant={album.status === 'published' ? 'default' : 'secondary'}>
                          {album.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(album.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}