import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Mail, Shield } from "lucide-react";
import Footer from "@/components/Footer";
import perdidogLogo from "@/images/perdidog5-removebg-preview.png";

const DeleteAccountPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="delete-account-page">
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
                src={perdidogLogo} 
                alt="Perdidog Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">Perdidog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Eliminar Cuenta y Datos</h1>
          <p className="text-white/70 mt-2">Solicitud de eliminación de datos personales</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-800 mb-1">Acción Permanente</h2>
              <p className="text-red-700">
                Al eliminar tu cuenta, perderás el acceso a todos tus reportes y datos de forma permanente. Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>

        <div className="legal-content prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#015388] flex items-center gap-2">
              1. Pasos para eliminar tu cuenta
            </h2>
            <p>
              En Perdidog, ofrecemos dos formas sencillas de solicitar la eliminación de tu cuenta y todos los datos asociados:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Desde la Aplicación</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Inicia sesión en tu cuenta de Perdidog.</li>
                  <li>Dirígete a tu <strong>Perfil</strong> o <strong>Dashboard</strong>.</li>
                  <li>Accede a la sección de <strong>Ajustes de Cuenta</strong>.</li>
                  <li>Selecciona la opción <strong>"Eliminar mi cuenta"</strong>.</li>
                  <li>Confirma tu decisión mediante el proceso de verificación.</li>
                </ol>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Mediante Correo Electrónico</h3>
                <p className="text-sm mb-3">Si no puedes acceder a tu cuenta, puedes enviarnos una solicitud directa:</p>
                <div className="flex items-center gap-2 text-[#015388] font-medium">
                  <Mail className="w-4 h-4" />
                  <span>soporte@perdidog.com</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                  * Debes enviar la solicitud desde el correo electrónico asociado a tu cuenta de Perdidog.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#015388]">2. ¿Qué datos se eliminan?</h2>
            <p>
              Una vez procesada tu solicitud de eliminación, eliminaremos de forma permanente los siguientes datos de nuestros servidores activos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Información de perfil:</strong> Nombre, correo electrónico, número de teléfono y foto de perfil.</li>
              <li><strong>Reportes de mascotas:</strong> Todos los anuncios de mascotas perdidas o encontradas que hayas creado.</li>
              <li><strong>Fotos y Contenido:</strong> Todas las imágenes de mascotas que hayas subido a la plataforma.</li>
              <li><strong>Mensajes:</strong> Historial de chats y comunicaciones con otros usuarios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#015388]">3. Retención de datos y excepciones</h2>
            <p>
              Para cumplir con obligaciones legales y garantizar la seguridad de nuestra comunidad, retenemos cierta información bajo las siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Logs de seguridad:</strong> Registros de acceso y actividad técnica se mantienen por un periodo de <strong>90 días</strong> antes de su purga automática.</li>
              <li><strong>Cumplimiento legal:</strong> Si existe una obligación legal, proceso judicial o requerimiento gubernamental, podemos retener datos específicos por el tiempo que la ley exija.</li>
              <li><strong>Datos anonimizados:</strong> Podemos conservar datos agregados y anonimizados (que no pueden identificarte) para fines estadísticos y de mejora del servicio.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Nuestro Compromiso
            </h2>
            <p className="text-blue-800 text-sm m-0">
              Perdidog cumple con las normativas de protección de datos personales. Procesamos todas las solicitudes de eliminación en un plazo máximo de <strong>72 horas</strong> hábiles tras la confirmación.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeleteAccountPage;
