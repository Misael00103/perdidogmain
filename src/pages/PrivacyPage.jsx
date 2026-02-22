import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import perdidogLogo from "@/images/perdidog5-removebg-preview.png";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="privacy-page">
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
          <h1 className="text-3xl sm:text-4xl font-bold">Política de Privacidad</h1>
          <p className="text-white/70 mt-2">Última actualización: Febrero 2024</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <p className="text-blue-800">
            <strong>Tu privacidad es importante:</strong> En Perdidog nos comprometemos a proteger tu información personal 
            y ser transparentes sobre cómo la utilizamos.
          </p>
        </div>

        <div className="legal-content prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#015388]">1. Información que Recopilamos</h2>
          <p>
            Perdidog recopila la siguiente información para proporcionar y mejorar nuestros servicios:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Información de registro:</strong> Nombre, correo electrónico, número de teléfono</li>
            <li><strong>Información de ubicación:</strong> Ubicación GPS para mostrar mascotas cercanas</li>
            <li><strong>Contenido del usuario:</strong> Fotos y descripciones de mascotas</li>
            <li><strong>Datos de uso:</strong> Cómo interactúa con la aplicación</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">2. Uso de la Información</h2>
          <p>
            Utilizamos su información para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proporcionar y mantener nuestros servicios</li>
            <li>Mostrar reportes de mascotas relevantes en su área</li>
            <li>Enviar notificaciones sobre mascotas perdidas o encontradas</li>
            <li>Facilitar la comunicación entre usuarios</li>
            <li>Mejorar y personalizar la experiencia del usuario</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">3. Compartición de Información</h2>
          <p>
            Compartimos su información en las siguientes circunstancias:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Con otros usuarios:</strong> La información de sus reportes es visible públicamente</li>
            <li><strong>Con proveedores de servicios:</strong> Empresas que nos ayudan a operar la aplicación</li>
            <li><strong>Por requisitos legales:</strong> Cuando sea requerido por ley</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">4. Protección de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">5. Sus Derechos</h2>
          <p>
            Usted tiene derecho a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceder a su información personal</li>
            <li>Rectificar datos inexactos</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Oponerse al procesamiento de sus datos</li>
            <li>Solicitar la portabilidad de sus datos</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">6. Cookies y Tecnologías Similares</h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">7. Retención de Datos</h2>
          <p>
            Conservamos su información mientras su cuenta esté activa o sea necesaria para proporcionar servicios. También podemos retener cierta información según sea necesario para cumplir con obligaciones legales.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">8. Menores de Edad</h2>
          <p>
            Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos intencionalmente información de niños menores de 13 años.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">9. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos a través de la aplicación o por correo electrónico.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">10. Contacto</h2>
          <p>
            Para preguntas sobre esta Política de Privacidad, contáctenos:
          </p>
          <ul className="list-none pl-0">
            <li><strong>Email:</strong> privacidad@perdidog.com</li>
            <li><strong>Teléfono:</strong> +1 (849) 250-1084</li>
            <li><strong>Dirección:</strong> República Dominicana</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
