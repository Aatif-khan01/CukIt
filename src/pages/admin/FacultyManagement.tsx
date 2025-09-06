import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Phone,
  Award
} from 'lucide-react'
import { useFaculty, Faculty } from '@/hooks/useFaculty'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { useToast } from '@/hooks/use-toast'

export default function FacultyManagement() {
  const { faculty, loading, addFaculty, updateFaculty, deleteFaculty } = useFaculty()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    specialization: [] as string[],
    experience: '',
    education: '',
    publications: '',
    bio: '',
    photo_url: null as string | null,
    is_featured: false
  })

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = !selectedDepartment || 
                             member.specialization.includes(selectedDepartment)
    
    return matchesSearch && matchesDepartment
  })

  const departments = Array.from(new Set(faculty.flatMap(member => member.specialization)))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const facultyData = {
      ...formData,
      specialization: formData.specialization.length > 0 ? formData.specialization : ['General']
    }

    let result
    if (editingFaculty) {
      result = await updateFaculty(editingFaculty.id, facultyData)
    } else {
      result = await addFaculty(facultyData)
    }

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Success',
        description: `Faculty member ${editingFaculty ? 'updated' : 'added'} successfully`
      })
      setIsDialogOpen(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      email: '',
      phone: '',
      specialization: [],
      experience: '',
      education: '',
      publications: '',
      bio: '',
      photo_url: null,
      is_featured: false
    })
    setEditingFaculty(null)
  }

  const handleEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty)
    setFormData({
      name: faculty.name,
      designation: faculty.designation,
      email: faculty.email,
      phone: faculty.phone || '',
      specialization: faculty.specialization,
      experience: faculty.experience || '',
      education: faculty.education || '',
      publications: faculty.publications || '',
      bio: faculty.bio || '',
      photo_url: faculty.photo_url,
      is_featured: faculty.is_featured
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      const result = await deleteFaculty(id)
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Success',
          description: 'Faculty member deleted successfully'
        })
      }
    }
  }

  const handleSpecializationChange = (value: string) => {
    const specializations = value.split(',').map(s => s.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, specialization: specializations }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Faculty Management</h1>
        <p className="text-muted-foreground">Manage faculty members and their information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Faculty Directory</CardTitle>
              <CardDescription>View and manage all faculty members</CardDescription>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="designation">Designation *</Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="e.g., 10+ Years"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.is_featured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                      />
                      <Label>Featured Faculty</Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialization">Specializations (comma-separated)</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization.join(', ')}
                      onChange={(e) => handleSpecializationChange(e.target.value)}
                      placeholder="e.g., AI, Machine Learning, Data Science"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                      placeholder="e.g., Ph.D. Computer Science, IIT Delhi"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="publications">Publications</Label>
                    <Input
                      id="publications"
                      value={formData.publications}
                      onChange={(e) => setFormData(prev => ({ ...prev, publications: e.target.value }))}
                      placeholder="e.g., 50+ Research Papers"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      placeholder="Brief biography and research interests"
                    />
                  </div>

                  <div>
                    <Label>Profile Photo</Label>
                    <ImageUpload
                      currentImage={formData.photo_url}
                      onImageChange={(url) => setFormData(prev => ({ ...prev, photo_url: url }))}
                      folder="faculty"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingFaculty ? 'Update Faculty' : 'Add Faculty'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Department
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedDepartment("")}>
                  All Departments
                </DropdownMenuItem>
                {departments.map((dept) => (
                  <DropdownMenuItem 
                    key={dept} 
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading faculty data...
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredFaculty.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No faculty members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFaculty.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                            {member.photo_url ? (
                              <img 
                                src={member.photo_url} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.designation}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {member.email}
                          </div>
                          {member.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="w-3 h-3 mr-1" />
                              {member.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.specialization.slice(0, 2).map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {member.specialization.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.specialization.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Award className="w-3 h-3 mr-1 text-primary" />
                          {member.experience || 'N/A'}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {member.is_featured && (
                          <Badge className="text-xs">Featured</Badge>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(member)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(member.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}