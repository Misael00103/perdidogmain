import { Link } from "react-router-dom";
import { ArrowLeft, Dog, Home, FileText, Shield, AlertTriangle, Map } from "lucide-react";
import Footer from "@/components/Footer";

const SitemapPage = () => {
  const sections = [
    {
      title: "Páginas Principales",
      icon: Home,
      links: [
        { name: "Inicio", path: "/", description: "Página principal de Perdidog" },
        { name: "Panel Admin", path: "/login", description: "Acceso al panel de administración" },
        { name: "Dashboard", path: "/dashboard", description: "Panel de control para administradores" }
      ]
    },
    {
      title: "Información Legal",
      icon: FileText,
      links: [
        { name: "Términos y Condiciones", path: "/terms", description: "Condiciones de uso del servicio" },
        { name: "Política de Privacidad", path: "/privacy", description: "Cómo manejamos tu información" },
        { name: "Descargo de Responsabilidad", path: "/disclaimer", description: "Limitaciones de responsabilidad" }
      ]
    },
    {
      title: "Seguridad",
      icon: Shield,
      links: [
        { name: "Safety Report", path: "/safety-report", description: "Informe de seguridad y buenas prácticas" }
      ]
    },
    {
      title: "Recursos",
      icon: Map,
      links: [
        { name: "Mapa del Sitio", path: "/sitemap", description: "Esta página" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="sitemap-page">
      {/* Header */}
      <header className="bg-[#015388] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Dog className="w-10 h-10 text-[#16A99F]" />
            <span className="text-2xl font-bold">Perdidog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Mapa del Sitio</h1>
          <p className="text-white/70 mt-2">Encuentra fácilmente todas las secciones de Perdidog</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#015388] flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#015388]">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path}
                      className="block p-3 bg-white rounded-xl hover:shadow-md transition-shadow"
                    >
                      <span className="font-semibold text-[#015388] hover:text-[#16A99F] transition-colors">
                        {link.name}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Features */}
        <div className="mt-12 bg-gradient-to-r from-[#015388] to-[#16A99F] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Funcionalidades de la App</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Onboarding y Registro</h3>
              <p className="text-sm text-white/80">Configura tu perfil, preferencias de mascotas y ubicación</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Reportes Lost & Found</h3>
              <p className="text-sm text-white/80">Reporta mascotas perdidas o encontradas con fotos y ubicación</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Chat y Comunicación</h3>
              <p className="text-sm text-white/80">Conecta directamente con otros usuarios</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Notificaciones</h3>
              <p className="text-sm text-white/80">Alertas en tiempo real sobre mascotas en tu área</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SitemapPage;
