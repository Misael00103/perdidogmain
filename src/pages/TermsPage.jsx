import { Link } from "react-router-dom";
import { ArrowLeft, Dog } from "lucide-react";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="terms-page">
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
          <h1 className="text-3xl sm:text-4xl font-bold">Términos y Condiciones</h1>
          <p className="text-white/70 mt-2">Última actualización: Enero 2024</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="legal-content prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#015388]">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar la aplicación Perdidog ("la Aplicación"), usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a la Aplicación.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">2. Descripción del Servicio</h2>
          <p>
            Perdidog es una plataforma que permite a los usuarios:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reportar mascotas perdidas o encontradas</li>
            <li>Buscar mascotas en su área geográfica</li>
            <li>Conectar con otros usuarios para facilitar el reencuentro de mascotas</li>
            <li>Recibir alertas sobre mascotas reportadas cerca de su ubicación</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">3. Registro de Usuario</h2>
          <p>
            Para utilizar ciertas funciones de la Aplicación, deberá crear una cuenta proporcionando información precisa y actualizada. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">4. Uso Aceptable</h2>
          <p>
            Al utilizar Perdidog, usted se compromete a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proporcionar información veraz y precisa en sus reportes</li>
            <li>No utilizar la plataforma para actividades ilegales o fraudulentas</li>
            <li>Respetar a otros usuarios y sus mascotas</li>
            <li>No publicar contenido ofensivo, difamatorio o inapropiado</li>
            <li>No intentar hackear o comprometer la seguridad de la Aplicación</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">5. Contenido del Usuario</h2>
          <p>
            Los usuarios son responsables del contenido que publican en la Aplicación, incluyendo fotos, descripciones y datos de contacto. Perdidog se reserva el derecho de eliminar contenido que viole estos términos.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">6. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de la Aplicación, incluyendo pero no limitado a textos, gráficos, logos, íconos, imágenes y software, es propiedad de Perdidog o sus licenciantes y está protegido por leyes de propiedad intelectual.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">7. Limitación de Responsabilidad</h2>
          <p>
            Perdidog actúa únicamente como plataforma de conexión entre usuarios. No garantizamos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El reencuentro de mascotas perdidas</li>
            <li>La veracidad de la información proporcionada por otros usuarios</li>
            <li>La seguridad de las interacciones entre usuarios</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la Aplicación.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">9. Terminación</h2>
          <p>
            Podemos suspender o terminar su acceso a la Aplicación en cualquier momento, sin previo aviso, por violación de estos términos o por cualquier otra razón a nuestra discreción.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">10. Ley Aplicable</h2>
          <p>
            Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin dar efecto a ningún principio de conflicto de leyes.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">11. Contacto</h2>
          <p>
            Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos en:
          </p>
          <ul className="list-none pl-0">
            <li><strong>Email:</strong> legal@perdidog.com</li>
            <li><strong>Teléfono:</strong> +1 (555) 123-4567</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
