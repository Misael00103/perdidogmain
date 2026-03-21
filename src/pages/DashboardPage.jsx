import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dog, Search, Plus, Edit, Trash2, LogOut, Home, FileText, 
  AlertTriangle, CheckCircle, Clock, X, Menu, ChevronDown,
  MapPin, Phone, Mail, Calendar, Users as UsersIcon, UserX, Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { toast } from "sonner";
import perdidogLogo from "@/images/perdidog5-removebg-preview.png";
import { reportsAPI, usersAPI, authAPI } from "@/services/api";

// Mock data (fallback si la API no está disponible)
const MOCK_REPORTS = [
  {
    id: 1,
    pet_name: "Max",
    pet_type: "dog",
    breed: "Golden Retriever",
    color: "Dorado",
    gender: "male",
    age: "3 años",
    size: "large",
    description: "Perro muy amigable, responde a su nombre. Tiene un collar azul.",
    report_type: "lost",
    location: "Colonia Roma, CDMX",
    contact_phone: "+52 55 1234 5678",
    contact_email: "contacto@email.com",
    image_url: "",
    date_lost_found: "2024-02-15",
    status: "active"
  },
  {
    id: 2,
    pet_name: "Luna",
    pet_type: "cat",
    breed: "Siamés",
    color: "Blanco y gris",
    gender: "female",
    age: "2 años",
    size: "small",
    description: "Gata muy tímida, ojos azules. Se escapó por la ventana.",
    report_type: "lost",
    location: "Polanco, CDMX",
    contact_phone: "+52 55 9876 5432",
    contact_email: "luna@email.com",
    image_url: "",
    date_lost_found: "2024-02-18",
    status: "active"
  },
  {
    id: 3,
    pet_name: "Rocky",
    pet_type: "dog",
    breed: "Bulldog",
    color: "Café y blanco",
    gender: "male",
    age: "5 años",
    size: "medium",
    description: "Encontrado en el parque, muy amigable. Sin collar.",
    report_type: "found",
    location: "Coyoacán, CDMX",
    contact_phone: "+52 55 5555 1234",
    contact_email: "rocky@email.com",
    image_url: "",
    date_lost_found: "2024-02-19",
    status: "active"
  },
  {
    id: 4,
    pet_name: "Michi",
    pet_type: "cat",
    breed: "Mestizo",
    color: "Naranja",
    gender: "male",
    age: "1 año",
    size: "small",
    description: "Gato naranja encontrado en la calle, muy cariñoso.",
    report_type: "found",
    location: "Condesa, CDMX",
    contact_phone: "+52 55 4444 3333",
    contact_email: "michi@email.com",
    image_url: "",
    date_lost_found: "2024-02-17",
    status: "resolved"
  }
];

const MOCK_USERS = [
  {
    id: 1,
    name: "María García",
    email: "maria@email.com",
    phone: "+52 55 1111 2222",
    registered_date: "2024-01-15",
    reports_count: 3,
    status: "active",
    type: "general"
  },
  {
    id: 2,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+52 55 3333 4444",
    registered_date: "2024-01-20",
    reports_count: 1,
    status: "active",
    type: "general"
  },
  {
    id: 3,
    name: "Ana López",
    email: "ana@email.com",
    phone: "+52 55 5555 6666",
    registered_date: "2024-02-01",
    reports_count: 2,
    status: "active",
    type: "general"
  },
  {
    id: 4,
    name: "Carlos Ruiz",
    email: "carlos@email.com",
    phone: "+52 55 7777 8888",
    registered_date: "2024-02-10",
    reports_count: 0,
    status: "blocked",
    type: "general"
  },
  {
    id: 5,
    name: "Laura Martínez",
    email: "laura@email.com",
    phone: "+52 55 9999 0000",
    registered_date: "2024-02-12",
    reports_count: 5,
    status: "active",
    type: "general"
  },
  {
    id: 6,
    name: "Pedro Sánchez",
    email: "pedro@email.com",
    phone: "+52 55 1234 5678",
    registered_date: "2024-02-05",
    reports_count: 2,
    status: "active",
    type: "reported",
    report_reason: "Comportamiento sospechoso en reportes",
    reported_by: "Usuario123",
    reported_date: "2024-02-18"
  },
  {
    id: 7,
    name: "Sofia Ramírez",
    email: "sofia@email.com",
    phone: "+52 55 8765 4321",
    registered_date: "2024-01-28",
    reports_count: 1,
    status: "active",
    type: "reported",
    report_reason: "Información falsa en reportes de mascotas",
    reported_by: "Usuario456",
    reported_date: "2024-02-19"
  },
  {
    id: 8,
    name: "Miguel Torres",
    email: "miguel@email.com",
    phone: "+52 55 2468 1357",
    registered_date: "2024-02-03",
    reports_count: 4,
    status: "blocked",
    type: "reported",
    report_reason: "Múltiples reportes de spam y acoso",
    reported_by: "Usuario789",
    reported_date: "2024-02-17"
  }
];

// Componente para contador animado
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total_reports: 0, lost_pets: 0, found_pets: 0, resolved: 0, active: 0, total_users: 0, active_users: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("reports"); // "reports" o "users"
  const [userSubTab, setUserSubTab] = useState("general"); // "general" o "reported"
  
  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCloseReportOpen, setIsCloseReportOpen] = useState(false);
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    type: "lost",
    petType: "dog",
    breed: "",
    petColor: "",
    gender: "",
    age: "",
    size: "medium",
    description: "",
    city: "",
    state: "",
    zipcode: "",
    country: "República Dominicana",
    dateTime: "",
    contactPhone: "",
    contactEmail: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("perdidog_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Intentar obtener datos de la API
      const [reportsResponse, usersResponse] = await Promise.all([
        reportsAPI.getAll(),
        usersAPI.getAll()
      ]);

      const reportsData = reportsResponse.data.data || reportsResponse.data;
      const usersData = usersResponse.data.data || usersResponse.data;

      console.log('Reports from API:', reportsData);
      console.log('Sample report structure:', reportsData[0]);
      console.log('Users from API:', usersData);

      setReports(Array.isArray(reportsData) ? reportsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      
      // Calcular estadísticas
      calculateStats(reportsData, usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      
      // Si falla la API, usar datos mock
      toast.info("Usando datos de demostración");
      setReports(MOCK_REPORTS);
      setUsers(MOCK_USERS);
      calculateStats(MOCK_REPORTS, MOCK_USERS);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (reportsData, usersData) => {
    const lostCount = reportsData.filter(r => r.type === "lost").length;
    const foundCount = reportsData.filter(r => r.type === "found").length;
    const resolvedCount = reportsData.filter(r => r.status === "resolved" || r.status === "closed").length;
    const activeCount = reportsData.filter(r => r.status === "active" || r.status === "open").length;
    const activeUsersCount = usersData.filter(u => u.status === "active").length;
    
    setStats({
      total_reports: reportsData.length,
      lost_pets: lostCount,
      found_pets: foundCount,
      resolved: resolvedCount,
      active: activeCount,
      total_users: usersData.length,
      active_users: activeUsersCount
    });
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("perdidog_token");
      localStorage.removeItem("perdidog_refresh_token");
      localStorage.removeItem("perdidog_user");
      navigate("/login");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "lost",
      petType: "dog",
      breed: "",
      petColor: "",
      gender: "",
      age: "",
      size: "medium",
      description: "",
      city: "",
      state: "",
      zipcode: "",
      country: "República Dominicana",
      dateTime: "",
      contactPhone: "",
      contactEmail: ""
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    try {
      // Validar campos requeridos
      if (!formData.type || !formData.petType || !formData.city || !formData.zipcode || !formData.dateTime) {
        toast.error("Por favor completa todos los campos requeridos (*)");
        return;
      }

      // Crear FormData para enviar imagen
      const submitData = new FormData();
      
      // Agregar campos requeridos primero (asegurar que sean strings)
      submitData.append('type', String(formData.type || ''));
      submitData.append('petType', String(formData.petType || ''));
      submitData.append('city', String(formData.city || ''));
      submitData.append('zipcode', String(formData.zipcode || ''));
      submitData.append('dateTime', String(formData.dateTime || ''));
      
      // Agregar campos opcionales solo si tienen valor
      if (formData.breed && formData.breed.trim()) submitData.append('breed', String(formData.breed));
      if (formData.petColor && formData.petColor.trim()) submitData.append('petColor', String(formData.petColor));
      if (formData.gender && formData.gender.trim()) submitData.append('gender', String(formData.gender));
      if (formData.age && formData.age.trim()) submitData.append('age', String(formData.age));
      if (formData.size && formData.size.trim()) submitData.append('size', String(formData.size));
      if (formData.description && formData.description.trim()) submitData.append('description', String(formData.description));
      if (formData.state && formData.state.trim()) submitData.append('state', String(formData.state));
      if (formData.country && formData.country.trim()) submitData.append('country', String(formData.country));
      if (formData.contactPhone && formData.contactPhone.trim()) submitData.append('contactPhone', String(formData.contactPhone));
      if (formData.contactEmail && formData.contactEmail.trim()) submitData.append('contactEmail', String(formData.contactEmail));
      
      // Agregar imagen si existe
      if (selectedImage) {
        submitData.append('photo', selectedImage);
      }
      
      console.log('Sending data:', Object.fromEntries(submitData));
      
      const response = await reportsAPI.create(submitData);
      const newReport = response.data.data || response.data;
      
      setReports([...reports, newReport]);
      toast.success("Reporte creado exitosamente");
      setIsCreateOpen(false);
      resetForm();
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error creating report:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          (Array.isArray(error.response?.data?.message) 
                            ? error.response.data.message.join(', ')
                            : "Error al crear el reporte");
      toast.error(errorMessage);
    }
  };

  const handleEdit = async () => {
    try {
      // Verificar permisos
      if (!user || selectedReport.userId !== user.id) {
        toast.error("Solo puedes editar tus propios reportes");
        return;
      }

      // Validar campos requeridos
      if (!formData.type || !formData.petType || !formData.city || !formData.zipcode || !formData.dateTime) {
        toast.error("Por favor completa todos los campos requeridos (*)");
        return;
      }

      let submitData;
      
      // Si hay una imagen nueva, usar FormData
      if (selectedImage) {
        submitData = new FormData();
        
        // Agregar campos requeridos primero (asegurar que sean strings)
        submitData.append('type', String(formData.type || ''));
        submitData.append('petType', String(formData.petType || ''));
        submitData.append('city', String(formData.city || ''));
        submitData.append('zipcode', String(formData.zipcode || ''));
        submitData.append('dateTime', String(formData.dateTime || ''));
        
        // Agregar campos opcionales solo si tienen valor
        if (formData.breed && formData.breed.trim()) submitData.append('breed', String(formData.breed));
        if (formData.petColor && formData.petColor.trim()) submitData.append('petColor', String(formData.petColor));
        if (formData.gender && formData.gender.trim()) submitData.append('gender', String(formData.gender));
        if (formData.age && formData.age.trim()) submitData.append('age', String(formData.age));
        if (formData.size && formData.size.trim()) submitData.append('size', String(formData.size));
        if (formData.description && formData.description.trim()) submitData.append('description', String(formData.description));
        if (formData.state && formData.state.trim()) submitData.append('state', String(formData.state));
        if (formData.country && formData.country.trim()) submitData.append('country', String(formData.country));
        if (formData.contactPhone && formData.contactPhone.trim()) submitData.append('contactPhone', String(formData.contactPhone));
        if (formData.contactEmail && formData.contactEmail.trim()) submitData.append('contactEmail', String(formData.contactEmail));
        
        // Agregar imagen
        submitData.append('photo', selectedImage);
      } else {
        // Si no hay imagen, enviar como JSON con solo los campos que tienen valor
        submitData = {
          type: String(formData.type || ''),
          petType: String(formData.petType || ''),
          city: String(formData.city || ''),
          zipcode: String(formData.zipcode || ''),
          dateTime: String(formData.dateTime || '')
        };
        
        // Agregar campos opcionales solo si tienen valor
        if (formData.breed && formData.breed.trim()) submitData.breed = String(formData.breed);
        if (formData.petColor && formData.petColor.trim()) submitData.petColor = String(formData.petColor);
        if (formData.gender && formData.gender.trim()) submitData.gender = String(formData.gender);
        if (formData.age && formData.age.trim()) submitData.age = String(formData.age);
        if (formData.size && formData.size.trim()) submitData.size = String(formData.size);
        if (formData.description && formData.description.trim()) submitData.description = String(formData.description);
        if (formData.state && formData.state.trim()) submitData.state = String(formData.state);
        if (formData.country && formData.country.trim()) submitData.country = String(formData.country);
        if (formData.contactPhone && formData.contactPhone.trim()) submitData.contactPhone = String(formData.contactPhone);
        if (formData.contactEmail && formData.contactEmail.trim()) submitData.contactEmail = String(formData.contactEmail);
      }
      
      console.log('Updating data:', selectedImage ? Object.fromEntries(submitData) : submitData);
      
      const response = await reportsAPI.update(selectedReport.id, submitData);
      const updatedReport = response.data.data || response.data;
      
      const updatedReports = reports.map(r => 
        r.id === selectedReport.id ? updatedReport : r
      );
      
      setReports(updatedReports);
      toast.success("Reporte actualizado exitosamente");
      setIsEditOpen(false);
      setSelectedReport(null);
      resetForm();
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error updating report:", error);
      console.error("Error response:", error.response?.data);
      console.error("Request config:", error.config);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          (Array.isArray(error.response?.data?.message) 
                            ? error.response.data.message.join(', ')
                            : "Error al actualizar el reporte");
      toast.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    try {
      // Verificar permisos
      if (!user || selectedReport.userId !== user.id) {
        toast.error("Solo puedes eliminar tus propios reportes");
        setIsDeleteOpen(false);
        setSelectedReport(null);
        return;
      }

      console.log('Deleting report with ID:', selectedReport.id);
      await reportsAPI.delete(selectedReport.id);
      
      const updatedReports = reports.filter(r => r.id !== selectedReport.id);
      setReports(updatedReports);
      toast.success("Reporte eliminado exitosamente");
      setIsDeleteOpen(false);
      setSelectedReport(null);
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error deleting report:", error);
      console.error("Error response:", error.response?.data);
      console.error("Request config:", error.config);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Error al eliminar el reporte";
      toast.error(errorMessage);
    }
  };

  const handleCloseReport = async () => {
    try {
      // Verificar permisos
      if (!user || selectedReport.userId !== user.id) {
        toast.error("Solo puedes cerrar tus propios reportes");
        setIsCloseReportOpen(false);
        setSelectedReport(null);
        return;
      }

      console.log('Closing report with ID:', selectedReport.id);
      
      // Enviar solo el status en el body
      const updateData = { 
        status: "resolved" 
      };
      
      console.log('Sending update data:', updateData);
      
      const response = await reportsAPI.update(selectedReport.id, updateData);
      const updatedReport = response.data.data || response.data;
      
      console.log('Update response:', updatedReport);
      
      const updatedReports = reports.map(r => 
        r.id === selectedReport.id ? updatedReport : r
      );
      
      setReports(updatedReports);
      toast.success("Reporte cerrado exitosamente - Mascota reunida con su familia! 🎉");
      setIsCloseReportOpen(false);
      setSelectedReport(null);
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error closing report:", error);
      console.error("Error response:", error.response?.data);
      console.error("Request config:", error.config);
      console.error("Request URL:", error.config?.url);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Error al cerrar el reporte. Verifica que el endpoint PATCH /report esté disponible.";
      toast.error(errorMessage);
    }
  };

  const handleBlockUser = async () => {
    try {
      const newStatus = selectedUser.status === "blocked" ? "active" : "blocked";
      
      // Si estamos bloqueando, usar el endpoint de soft delete
      // Si estamos desbloqueando, usar el endpoint de restore
      if (newStatus === "blocked") {
        await usersAPI.deleteById(selectedUser.id);
      } else {
        await usersAPI.restoreUser(selectedUser.id);
      }
      
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
      );
      
      setUsers(updatedUsers);
      toast.success(newStatus === "blocked" ? "Usuario bloqueado" : "Usuario desbloqueado");
      setIsBlockUserOpen(false);
      setSelectedUser(null);
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      toast.error(error.response?.data?.message || "Error al actualizar el usuario");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await usersAPI.deleteById(selectedUser.id);
      
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      toast.success("Usuario eliminado exitosamente");
      setIsBlockUserOpen(false);
      setSelectedUser(null);
      
      // Refrescar datos
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Error al eliminar el usuario");
    }
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    
    // Convertir la fecha al formato datetime-local si existe
    let dateTimeValue = "";
    if (report.dateTime) {
      try {
        const date = new Date(report.dateTime);
        dateTimeValue = date.toISOString().slice(0, 16);
      } catch (e) {
        console.error("Error parsing date:", e);
      }
    }
    
    setFormData({
      type: report.type || "lost",
      petType: report.petType || "dog",
      breed: report.breed || "",
      petColor: report.petColor || "",
      gender: report.gender || "",
      age: report.age || "",
      size: report.size || "medium",
      description: report.description || "",
      city: report.city || "",
      state: report.state || "",
      zipcode: report.zipcode || "",
      country: report.country || "República Dominicana",
      dateTime: dateTimeValue,
      contactPhone: report.contactPhone || "",
      contactEmail: report.contactEmail || ""
    });
    
    // Si hay imagen, mostrar preview (photos es un array)
    if (report.photos && report.photos.length > 0) {
      setImagePreview(report.photos[0].url);
      setSelectedImage(null); // Limpiar imagen seleccionada
    }
    
    setIsEditOpen(true);
  };

  const filteredReports = reports.filter(report => {
    const description = report.description || "";
    const city = report.city || "";
    const breed = report.breed || "";
    const reportType = report.type || "";
    const petType = report.petType || "";
    
    const matchesSearch = 
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || reportType === filterType;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesType = user.type === userSubTab;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved":
        return <Badge className="badge-resolved"><CheckCircle className="w-3 h-3 mr-1" />Resuelto</Badge>;
      case "active":
        return <Badge className="badge-active"><Clock className="w-3 h-3 mr-1" />Activo</Badge>;
      default:
        return <Badge className="badge-active"><Clock className="w-3 h-3 mr-1" />Activo</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    return type === "lost" 
      ? <Badge className="badge-lost"><AlertTriangle className="w-3 h-3 mr-1" />Perdido</Badge>
      : <Badge className="badge-found"><CheckCircle className="w-3 h-3 mr-1" />Encontrado</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="dashboard-page">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#015388] to-[#16A99F] flex items-center justify-center">
              <img 
                src={perdidogLogo} 
                alt="Perdidog Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-[#015388]">Perdidog</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div 
              onClick={() => setActiveTab("reports")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                activeTab === "reports" 
                  ? "sidebar-active text-[#015388] font-medium" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="w-5 h-5" />
              Reportes
            </div>
            <div 
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                activeTab === "users" 
                  ? "sidebar-active text-[#015388] font-medium" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              Usuarios
            </div>
          </nav>

          {/* User */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#015388] flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-600"
              onClick={handleLogout}
              data-testid="logout-btn"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                data-testid="mobile-menu-btn"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-[#015388]">
                {activeTab === "reports" ? "Reportes de Mascotas" : "Gestión de Usuarios"}
              </h1>
            </div>
            {activeTab === "reports" && (
              <Button 
                onClick={() => { resetForm(); setIsCreateOpen(true); }}
                className="bg-[#16A99F] hover:bg-[#14958c] text-white rounded-xl"
                data-testid="create-report-btn"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Nuevo Reporte</span>
              </Button>
            )}
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="stats-card rounded-xl animate-fade-in stagger-1" data-testid="stats-total">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Reportes</p>
                    <p className="text-3xl font-bold text-[#015388]">
                      <AnimatedCounter value={stats.total_reports} />
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#015388]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#015388]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card rounded-xl animate-fade-in stagger-2" data-testid="stats-lost">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Perdidos</p>
                    <p className="text-3xl font-bold text-red-500">
                      <AnimatedCounter value={stats.lost_pets} />
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card rounded-xl animate-fade-in stagger-3" data-testid="stats-found">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Encontrados</p>
                    <p className="text-3xl font-bold text-[#16A99F]">
                      <AnimatedCounter value={stats.found_pets} />
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#16A99F]/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#16A99F]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card rounded-xl animate-fade-in stagger-4" data-testid="stats-resolved">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resueltos</p>
                    <p className="text-3xl font-bold text-green-500">
                      <AnimatedCounter value={stats.resolved} />
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card rounded-xl animate-fade-in stagger-5" data-testid="stats-users">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Usuarios</p>
                    <p className="text-3xl font-bold text-[#015388]">
                      <AnimatedCounter value={stats.total_users} />
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#015388]/10 flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-[#015388]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Table */}
          <Card className="rounded-xl shadow-sm animate-fade-in">
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg text-[#015388]">
                    {activeTab === "reports" ? "Reportes de Mascotas" : "Gestión de Usuarios"}
                  </CardTitle>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full sm:w-48 rounded-lg"
                        data-testid="search-input"
                      />
                    </div>
                    {activeTab === "reports" && (
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-32 rounded-lg" data-testid="filter-type">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="lost">Perdidos</SelectItem>
                          <SelectItem value="found">Encontrados</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 rounded-lg" data-testid="filter-status">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="active">Activos</SelectItem>
                        {activeTab === "reports" && <SelectItem value="resolved">Resueltos</SelectItem>}
                        {activeTab === "users" && <SelectItem value="blocked">Bloqueados</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* User Sub-tabs */}
                {activeTab === "users" && (
                  <div className="flex gap-2 border-b -mb-4">
                    <button
                      onClick={() => setUserSubTab("general")}
                      className={`px-4 py-2 font-medium transition-all ${
                        userSubTab === "general"
                          ? "text-[#015388] border-b-2 border-[#015388]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Usuarios Generales
                    </button>
                    <button
                      onClick={() => setUserSubTab("reported")}
                      className={`px-4 py-2 font-medium transition-all ${
                        userSubTab === "reported"
                          ? "text-[#015388] border-b-2 border-[#015388]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Usuarios Reportados
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-[#015388] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : activeTab === "reports" ? (
                filteredReports.length === 0 ? (
                  <div className="text-center py-12">
                    <img 
                      src={perdidogLogo} 
                      alt="No hay reportes" 
                      className="w-12 h-12 mx-auto mb-4 opacity-30 object-contain"
                    />
                    <p className="text-gray-500">No se encontraron reportes</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Mascota</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Detalles</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReports.map((report) => (
                          <TableRow key={report.id} className="table-row-hover" data-testid={`report-row-${report.id}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                  {report.photos && report.photos.length > 0 ? (
                                    <img 
                                      src={report.photos[0].url} 
                                      alt="" 
                                      className="w-full h-full object-cover" 
                                    />
                                  ) : (
                                    <img 
                                      src={perdidogLogo} 
                                      alt="Mascota" 
                                      className="w-6 h-6 object-contain opacity-40"
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {report.breed || <span className="text-gray-400 italic">Sin raza especificada</span>}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {report.petType === "dog" ? "Perro" : 
                                     report.petType === "cat" ? "Gato" : 
                                     report.petType === "bird" ? "Ave" : 
                                     report.petType === "Other" ? "Otra mascota" : 
                                     report.petType}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(report.type)}</TableCell>
                            <TableCell>
                              <div className="text-sm space-y-1">
                                {report.petColor && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="font-medium">Color:</span> {report.petColor}
                                  </div>
                                )}
                                {report.size && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="font-medium">Tamaño:</span> {
                                      report.size.toLowerCase() === "small" ? "Pequeño" :
                                      report.size.toLowerCase() === "medium" ? "Mediano" :
                                      report.size.toLowerCase() === "large" ? "Grande" : report.size
                                    }
                                  </div>
                                )}
                                {report.gender && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="font-medium">Género:</span> {
                                      report.gender.toLowerCase() === "male" ? "Macho" :
                                      report.gender.toLowerCase() === "female" ? "Hembra" : "Desconocido"
                                    }
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <div>
                                  <div>{report.city || "-"}</div>
                                  {report.state && <div className="text-xs text-gray-500">{report.state}</div>}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Phone className="w-3 h-3" />
                                  {report.contactPhone || "-"}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600">
                                {report.dateTime ? new Date(report.dateTime).toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                }) : "-"}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" data-testid={`report-actions-${report.id}`}>
                                    <ChevronDown className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {user && report.userId === user.id ? (
                                    <>
                                      {report.status === "active" && (
                                        <DropdownMenuItem onClick={() => { setSelectedReport(report); setIsCloseReportOpen(true); }} className="text-green-600">
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Cerrar Reporte
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem onClick={() => openEditModal(report)}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => { setSelectedReport(report); setIsDeleteOpen(true); }}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Eliminar
                                      </DropdownMenuItem>
                                    </>
                                  ) : (
                                    <DropdownMenuItem disabled className="text-gray-400 cursor-not-allowed">
                                      <Ban className="w-4 h-4 mr-2" />
                                      Solo puedes editar tus propios reportes
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )
              ) : (
                filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron usuarios</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Usuario</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Teléfono</TableHead>
                          {userSubTab === "reported" && <TableHead>Motivo de Reporte</TableHead>}
                          {userSubTab === "reported" && <TableHead>Reportado Por</TableHead>}
                          <TableHead>Reportes</TableHead>
                          <TableHead>Fecha {userSubTab === "reported" ? "Reporte" : "Registro"}</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} className="table-row-hover" data-testid={`user-row-${user.id}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#015388] flex items-center justify-center text-white font-semibold">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                {user.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                {user.phone}
                              </div>
                            </TableCell>
                            {userSubTab === "reported" && (
                              <TableCell>
                                <div className="max-w-xs">
                                  <p className="text-sm text-gray-700 line-clamp-2">{user.report_reason}</p>
                                </div>
                              </TableCell>
                            )}
                            {userSubTab === "reported" && (
                              <TableCell>
                                <p className="text-sm text-gray-600">{user.reported_by}</p>
                              </TableCell>
                            )}
                            <TableCell>
                              <Badge className="bg-[#015388]/10 text-[#015388]">
                                {user.reports_count} reportes
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {new Date(userSubTab === "reported" ? user.reported_date : user.registered_date).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              {user.status === "active" ? (
                                <Badge className="badge-active">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Activo
                                </Badge>
                              ) : (
                                <Badge className="badge-lost">
                                  <Ban className="w-3 h-3 mr-1" />
                                  Bloqueado
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" data-testid={`user-actions-${user.id}`}>
                                    <ChevronDown className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    onClick={() => { setSelectedUser(user); setIsBlockUserOpen(true); }}
                                    className={user.status === "blocked" ? "text-green-600" : "text-orange-600"}
                                  >
                                    {user.status === "blocked" ? (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Desbloquear
                                      </>
                                    ) : (
                                      <>
                                        <Ban className="w-4 h-4 mr-2" />
                                        Bloquear
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => { setSelectedUser(user); handleDeleteUser(); }}
                                    className="text-red-600"
                                  >
                                    <UserX className="w-4 h-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Create/Edit Modal */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => { if (!open) { setIsCreateOpen(false); setIsEditOpen(false); resetForm(); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#015388]">
              {isEditOpen ? "Editar Reporte" : "Nuevo Reporte"}
            </DialogTitle>
            <DialogDescription>
              {isEditOpen 
                ? "Actualiza la información del reporte de mascota." 
                : "Completa el formulario para crear un nuevo reporte de mascota perdida o encontrada."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Reporte *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(v) => setFormData({...formData, type: v})}
              >
                <SelectTrigger data-testid="form-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">Perdido</SelectItem>
                  <SelectItem value="found">Encontrado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Mascota *</Label>
              <Select 
                value={formData.petType} 
                onValueChange={(v) => setFormData({...formData, petType: v})}
              >
                <SelectTrigger data-testid="form-pet-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                  <SelectItem value="bird">Ave</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Raza</Label>
              <Input
                value={formData.breed}
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
                placeholder="Ej: Golden Retriever (opcional)"
                data-testid="form-breed"
              />
              <p className="text-xs text-gray-500">Si no conoces la raza, déjalo en blanco</p>
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Input
                value={formData.petColor}
                onChange={(e) => setFormData({...formData, petColor: e.target.value})}
                placeholder="Ej: Dorado"
                data-testid="form-color"
              />
            </div>

            <div className="space-y-2">
              <Label>Género</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(v) => setFormData({...formData, gender: v})}
              >
                <SelectTrigger data-testid="form-gender">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Macho</SelectItem>
                  <SelectItem value="female">Hembra</SelectItem>
                  <SelectItem value="unknown">Desconocido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tamaño</Label>
              <Select 
                value={formData.size} 
                onValueChange={(v) => setFormData({...formData, size: v})}
              >
                <SelectTrigger data-testid="form-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño</SelectItem>
                  <SelectItem value="medium">Mediano</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Edad</Label>
              <Input
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="Ej: 2 años"
                data-testid="form-age"
              />
            </div>

            <div className="space-y-2">
              <Label>Ciudad *</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="Ej: Santo Domingo"
                required
                data-testid="form-city"
              />
            </div>

            <div className="space-y-2">
              <Label>Estado/Provincia</Label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                placeholder="Ej: Distrito Nacional"
                data-testid="form-state"
              />
            </div>

            <div className="space-y-2">
              <Label>Código Postal *</Label>
              <Input
                value={formData.zipcode}
                onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
                placeholder="Ej: 10101"
                required
                data-testid="form-zipcode"
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha y Hora *</Label>
              <Input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                required
                data-testid="form-datetime"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Descripción *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe características distintivas, circunstancias del extravío, etc."
                rows={3}
                required
                data-testid="form-description"
              />
            </div>

            <div className="space-y-2">
              <Label>Teléfono de Contacto *</Label>
              <Input
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                placeholder="Ej: +1 (849) 250-1084"
                required
                data-testid="form-phone"
              />
            </div>

            <div className="space-y-2">
              <Label>Email de Contacto</Label>
              <Input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                placeholder="Ej: contacto@email.com"
                data-testid="form-email"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Foto de la Mascota</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                data-testid="form-image"
                className="cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}
            </div>

            {isEditOpen && (
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select 
                  value={formData.status || "active"} 
                  onValueChange={(v) => setFormData({...formData, status: v})}
                >
                  <SelectTrigger data-testid="form-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="resolved">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); resetForm(); }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={isEditOpen ? handleEdit : handleCreate}
              className="bg-[#015388] hover:bg-[#016dad]"
              data-testid="form-submit-btn"
            >
              {isEditOpen ? "Guardar Cambios" : "Crear Reporte"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Eliminar Reporte</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              data-testid="confirm-delete-btn"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Report Confirmation */}
      <Dialog open={isCloseReportOpen} onOpenChange={setIsCloseReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600">Cerrar Reporte</DialogTitle>
            <DialogDescription>
              ¿La mascota fue reunida con su familia? Esto marcará el reporte como resuelto.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsCloseReportOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleCloseReport}
              data-testid="confirm-close-btn"
            >
              Sí, Cerrar Reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block/Unblock User Confirmation */}
      <Dialog open={isBlockUserOpen} onOpenChange={setIsBlockUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={selectedUser?.status === "blocked" ? "text-green-600" : "text-orange-600"}>
              {selectedUser?.status === "blocked" ? "Desbloquear Usuario" : "Bloquear Usuario"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "blocked" 
                ? `¿Deseas desbloquear a ${selectedUser?.name}? Podrá volver a usar la aplicación.`
                : `¿Estás seguro de que deseas bloquear a ${selectedUser?.name}? No podrá acceder a la aplicación.`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsBlockUserOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className={selectedUser?.status === "blocked" ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}
              onClick={handleBlockUser}
              data-testid="confirm-block-btn"
            >
              {selectedUser?.status === "blocked" ? "Desbloquear" : "Bloquear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
