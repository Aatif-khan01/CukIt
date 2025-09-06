import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Download,
  Upload,
  FileText,
  BookOpen
} from 'lucide-react';
import { useStudyMaterials } from '@/hooks/useStudyMaterials';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function StudyMaterialsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    subject: '',
    semester: '',
    type: '',
    uploaded_by: '',
    file_url: '',
    file_size: null as number | null
  });

  const { materials, loading, addMaterial, updateMaterial, deleteMaterial, incrementDownloads } = useStudyMaterials();
  const { toast } = useToast();

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = ['all', ...Array.from(new Set(materials.map(m => m.type)))];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `study-materials/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ 
        ...prev, 
        file_url: publicUrl,
        file_size: file.size
      }));

      toast({
        title: 'File uploaded',
        description: 'File has been uploaded successfully.'
      });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let result;
    if (editingMaterial) {
      result = await updateMaterial(editingMaterial.id, formData);
    } else {
      result = await addMaterial(formData);
    }

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: `Material ${editingMaterial ? 'updated' : 'added'} successfully`
      });
      setIsCreateOpen(false);
      setEditingMaterial(null);
      setFormData({
        title: '',
        description: '',
        course: '',
        subject: '',
        semester: '',
        type: '',
        uploaded_by: '',
        file_url: '',
        file_size: null
      });
    }
  };

  const handleEdit = (material: any) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      description: material.description || '',
      course: material.course,
      subject: material.subject,
      semester: material.semester || '',
      type: material.type,
      uploaded_by: material.uploaded_by,
      file_url: material.file_url,
      file_size: material.file_size
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this study material?')) {
      const result = await deleteMaterial(id);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Material deleted successfully'
        });
      }
    }
  };

  const handleDownload = async (material: any) => {
    window.open(material.file_url, '_blank');
    await incrementDownloads(material.id);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Study Materials</h2>
        <p className="text-muted-foreground">
          Manage course materials, notes, syllabus, and past papers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Materials Library</CardTitle>
              <CardDescription>
                View and manage all study materials and resources.
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => {
                    setEditingMaterial(null);
                    setFormData({
                      title: '',
                      description: '',
                      course: '',
                      subject: '',
                      semester: '',
                      type: '',
                      uploaded_by: '',
                      file_url: '',
                      file_size: null
                    });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingMaterial ? 'Edit Material' : 'Add Study Material'}</DialogTitle>
                    <DialogDescription>
                      {editingMaterial ? 'Update material details' : 'Upload a new study material'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Input
                          id="semester"
                          value={formData.semester}
                          onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Input
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="uploaded_by">Uploaded By</Label>
                        <Input
                          id="uploaded_by"
                          value={formData.uploaded_by}
                          onChange={(e) => setFormData(prev => ({ ...prev, uploaded_by: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">File Upload</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        required={!editingMaterial}
                      />
                      {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                      {formData.file_url && <p className="text-sm text-green-600">File uploaded successfully</p>}
                    </div>

                    <DialogFooter>
                      <Button type="submit" disabled={loading || uploading}>
                        {editingMaterial ? 'Update Material' : 'Add Material'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {types.map(type => (
                  <DropdownMenuItem 
                    key={type}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Course/Semester</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{material.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(material.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{material.course}</div>
                        <div className="text-sm text-muted-foreground">{material.semester} Semester</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{material.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.type}</Badge>
                    </TableCell>
                    <TableCell>{material.uploaded_by}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3 text-muted-foreground" />
                        <span>{material.downloads}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(material.file_size)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(material)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(material)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(material.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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