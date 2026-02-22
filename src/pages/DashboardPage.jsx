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

// Mock data
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
    pet_type: "dog",
    pet_name: "",
    breed: "",
    color: "",
    gender: "",
    age: "",
    size: "medium",
    description: "",
    report_type: "lost",
    location: "",
    contact_phone: "",
    contact_email: "",
    image_url: "",
    date_lost_found: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("perdidog_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchData();
  }, []);

  const fetchData = () => {
    // Simular delay de carga
    setTimeout(() => {
      setReports(MOCK_REPORTS);
      setUsers(MOCK_USERS);
      
      // Calcular estadísticas
      const lostCount = MOCK_REPORTS.filter(r => r.report_type === "lost").length;
      const foundCount = MOCK_REPORTS.filter(r => r.report_type === "found").length;
      const resolvedCount = MOCK_REPORTS.filter(r => r.status === "resolved").length;
      const activeCount = MOCK_REPORTS.filter(r => r.status === "active").length;
      const activeUsersCount = MOCK_USERS.filter(u => u.status === "active").length;
      
      setStats({
        total_reports: MOCK_REPORTS.length,
        lost_pets: lostCount,
        found_pets: foundCount,
        resolved: resolvedCount,
        active: activeCount,
        total_users: MOCK_USERS.length,
        active_users: activeUsersCount
      });
      
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("perdidog_token");
    localStorage.removeItem("perdidog_user");
    navigate("/login");
  };

  const resetForm = () => {
    setFormData({
      pet_type: "dog",
      pet_name: "",
      breed: "",
      color: "",
      gender: "",
      age: "",
      size: "medium",
      description: "",
      report_type: "lost",
      location: "",
      contact_phone: "",
      contact_email: "",
      image_url: "",
      date_lost_found: ""
    });
  };

  const handleCreate = () => {
    // Crear nuevo reporte con ID único
    const newReport = {
      ...formData,
      id: Math.max(...reports.map(r => r.id), 0) + 1,
      status: "active"
    };
    
    setReports([...reports, newReport]);
    toast.success("Reporte creado exitosamente");
    setIsCreateOpen(false);
    resetForm();
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const handleEdit = () => {
    const updatedReports = reports.map(r => 
      r.id === selectedReport.id ? { ...r, ...formData } : r
    );
    
    setReports(updatedReports);
    toast.success("Reporte actualizado exitosamente");
    setIsEditOpen(false);
    setSelectedReport(null);
    resetForm();
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const handleDelete = () => {
    const updatedReports = reports.filter(r => r.id !== selectedReport.id);
    
    setReports(updatedReports);
    toast.success("Reporte eliminado exitosamente");
    setIsDeleteOpen(false);
    setSelectedReport(null);
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const handleCloseReport = () => {
    const updatedReports = reports.map(r => 
      r.id === selectedReport.id ? { ...r, status: "resolved" } : r
    );
    
    setReports(updatedReports);
    toast.success("Reporte cerrado exitosamente - Mascota reunida con su familia! 🎉");
    setIsCloseReportOpen(false);
    setSelectedReport(null);
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const handleBlockUser = () => {
    const updatedUsers = users.map(u => 
      u.id === selectedUser.id ? { ...u, status: u.status === "blocked" ? "active" : "blocked" } : u
    );
    
    setUsers(updatedUsers);
    toast.success(selectedUser.status === "blocked" ? "Usuario desbloqueado" : "Usuario bloqueado");
    setIsBlockUserOpen(false);
    setSelectedUser(null);
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(u => u.id !== selectedUser.id);
    
    setUsers(updatedUsers);
    toast.success("Usuario eliminado exitosamente");
    setIsBlockUserOpen(false);
    setSelectedUser(null);
    
    // Recalcular stats
    setTimeout(fetchData, 100);
  };

  const openEditModal = (report) => {
    setSelectedReport(report);
    setFormData({
      pet_type: report.pet_type || "dog",
      pet_name: report.pet_name || "",
      breed: report.breed || "",
      color: report.color || "",
      gender: report.gender || "",
      age: report.age || "",
      size: report.size || "medium",
      description: report.description || "",
      report_type: report.report_type || "lost",
      location: report.location || "",
      contact_phone: report.contact_phone || "",
      contact_email: report.contact_email || "",
      image_url: report.image_url || "",
      date_lost_found: report.date_lost_found || ""
    });
    setIsEditOpen(true);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.pet_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.breed?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || report.report_type === filterType;
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
                src="/src/images/perdidog5-removebg-preview.png" 
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
                      src="/src/images/perdidog5-removebg-preview.png" 
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
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Contacto</TableHead>
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
                                  {report.image_url ? (
                                    <img src={report.image_url} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <img 
                                      src="/src/images/perdidog5-removebg-preview.png" 
                                      alt="Mascota" 
                                      className="w-6 h-6 object-contain opacity-40"
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{report.pet_name || "Sin nombre"}</p>
                                  <p className="text-sm text-gray-500">{report.breed || report.pet_type}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(report.report_type)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {report.location || "-"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Phone className="w-3 h-3" />
                                  {report.contact_phone}
                                </div>
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
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => { if (!open) { setIsCreateOpen(false); setIsEditOpen(false); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#015388]">
              {isEditOpen ? "Editar Reporte" : "Nuevo Reporte"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <Select 
                value={formData.report_type} 
                onValueChange={(v) => setFormData({...formData, report_type: v})}
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
              <Label>Tipo de Mascota</Label>
              <Select 
                value={formData.pet_type} 
                onValueChange={(v) => setFormData({...formData, pet_type: v})}
              >
                <SelectTrigger data-testid="form-pet-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nombre de la Mascota</Label>
              <Input
                value={formData.pet_name}
                onChange={(e) => setFormData({...formData, pet_name: e.target.value})}
                placeholder="Ej: Max"
                data-testid="form-pet-name"
              />
            </div>

            <div className="space-y-2">
              <Label>Raza</Label>
              <Input
                value={formData.breed}
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
                placeholder="Ej: Golden Retriever"
                data-testid="form-breed"
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Input
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
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

            <div className="space-y-2 sm:col-span-2">
              <Label>Ubicación *</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Ej: Colonia Roma, CDMX"
                required
                data-testid="form-location"
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
                value={formData.contact_phone}
                onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                placeholder="Ej: +52 55 1234 5678"
                required
                data-testid="form-phone"
              />
            </div>

            <div className="space-y-2">
              <Label>Email de Contacto</Label>
              <Input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                placeholder="Ej: contacto@email.com"
                data-testid="form-email"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>URL de Imagen</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://ejemplo.com/foto.jpg"
                data-testid="form-image"
              />
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
                    <SelectItem value="closed">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}
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
