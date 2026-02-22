import { Link } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Users, Phone, Mail } from "lucide-react";
import Footer from "@/components/Footer";

const SafetyReportPage = () => {
  const safetyTips = [
    {
      title: "Verificación de Identidad",
      description: "Siempre solicita documentación o pruebas de propiedad antes de entregar una mascota.",
      icon: CheckCircle
    },
    {
      title: "Reuniones Seguras",
      description: "Reúnete en lugares públicos y concurridos. Nunca vayas solo a una reunión.",
      icon: Users
    },
    {
      title: "Información Personal",
      description: "No compartas tu dirección exacta o información financiera con desconocidos.",
      icon: Shield
    },
    {
      title: "Reporta Actividad Sospechosa",
      description: "Si algo no se siente bien, confía en tu instinto y reporta a nuestro equipo.",
      icon: AlertTriangle
    }
  ];

  const reportTypes = [
    "Fraude o estafa",
    "Robo de mascotas",
    "Maltrato animal",
    "Información falsa",
    "Acoso o comportamiento inapropiado",
    "Suplantación de identidad"
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="safety-report-page">
      {/* Header */}
      <header className="bg-[#015388] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <img 
                src="/src/images/perdidog5-removebg-preview.png" 
                alt="Perdidog Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">Perdidog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Safety Report</h1>
          <p className="text-white/70 mt-2">Tu seguridad es nuestra prioridad</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-[#015388]/5 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#015388] mb-4">Nuestro Compromiso con tu Seguridad</h2>
          <p className="text-gray-700 leading-relaxed">
            En Perdidog, nos tomamos muy en serio la seguridad de nuestra comunidad. Hemos implementado 
            medidas y políticas para proteger tanto a los usuarios como a las mascotas. Este documento 
            describe nuestras prácticas de seguridad y cómo puedes mantenerte seguro al usar nuestra plataforma.
          </p>
        </div>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#015388] mb-6">Consejos de Seguridad</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#16A99F]/10 flex items-center justify-center mb-4">
                  <tip.icon className="w-6 h-6 text-[#16A99F]" />
                </div>
                <h3 className="font-bold text-[#015388] mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#015388] mb-6">¿Qué Puedes Reportar?</h2>
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700 mb-4">
              Si observas alguna de las siguientes situaciones, te pedimos que nos lo reportes inmediatamente:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {reportTypes.map((type, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#015388] mb-6">Cómo Hacer un Reporte</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#015388] text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Recopila Evidencia</h3>
                <p className="text-gray-600">Toma capturas de pantalla de mensajes sospechosos o guarda cualquier información relevante.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#015388] text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Contacta a Nuestro Equipo</h3>
                <p className="text-gray-600">Envía un email a seguridad@perdidog.com con los detalles del incidente.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#015388] text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Seguimiento</h3>
                <p className="text-gray-600">Nuestro equipo investigará el reporte y te contactará en 24-48 horas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#015388] mb-6">Nuestros Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#015388] text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold">99.5%</div>
              <div className="text-sm text-white/70">Reportes Verificados</div>
            </div>
            <div className="bg-[#16A99F] text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm text-white/70">Tiempo de Respuesta</div>
            </div>
            <div className="bg-[#015388] text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-white/70">Tolerancia a Fraudes</div>
            </div>
            <div className="bg-[#16A99F] text-white rounded-xl p-6 text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-white/70">Monitoreo Activo</div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-[#015388] to-[#16A99F] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas Ayuda Urgente?</h2>
          <p className="text-white/80 mb-6">
            Si te encuentras en una situación de emergencia o necesitas asistencia inmediata, 
            no dudes en contactarnos a través de los siguientes medios:
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-white/70">Email de Emergencias</div>
                <div className="font-semibold">seguridad@perdidog.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-white/70">Línea de Emergencias</div>
                <div className="font-semibold">+1 (849) 250-1084</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyReportPage;
