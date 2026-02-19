import { Link } from "react-router-dom";
import { ArrowLeft, Dog, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="disclaimer-page">
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
          <h1 className="text-3xl sm:text-4xl font-bold">Descargo de Responsabilidad</h1>
          <p className="text-white/70 mt-2">Última actualización: Enero 2024</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-800 mb-2">Aviso Importante</h3>
            <p className="text-amber-700">
              Perdidog es una plataforma de conexión entre usuarios. No somos responsables de las acciones 
              de terceros ni garantizamos el resultado de ninguna interacción realizada a través de nuestra plataforma.
            </p>
          </div>
        </div>

        <div className="legal-content prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-bold text-[#015388]">1. Naturaleza del Servicio</h2>
          <p>
            Perdidog proporciona una plataforma tecnológica que conecta a personas que han perdido mascotas 
            con personas que han encontrado animales. No somos una agencia de rescate animal, refugio, ni 
            prestamos servicios veterinarios.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">2. Sin Garantías</h2>
          <p>
            No garantizamos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Que encontrará a su mascota perdida</li>
            <li>La precisión o veracidad de los reportes publicados por usuarios</li>
            <li>La identidad, intenciones o comportamiento de otros usuarios</li>
            <li>El estado de salud o condición de las mascotas reportadas</li>
            <li>La disponibilidad ininterrumpida del servicio</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">3. Limitación de Responsabilidad</h2>
          <p>
            En ningún caso Perdidog, sus directivos, empleados o afiliados serán responsables de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Daños directos, indirectos, incidentales o consecuentes</li>
            <li>Pérdida de datos, ingresos o beneficios</li>
            <li>Lesiones personales o daños a la propiedad</li>
            <li>Acciones de otros usuarios de la plataforma</li>
            <li>Fraudes o engaños perpetrados por terceros</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">4. Verificación de Información</h2>
          <p>
            No verificamos la información proporcionada por los usuarios. Es responsabilidad de cada usuario 
            verificar la veracidad de los reportes y tomar precauciones al interactuar con otros usuarios.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">5. Interacciones Entre Usuarios</h2>
          <p>
            Las interacciones entre usuarios se realizan bajo su propio riesgo. Recomendamos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reunirse en lugares públicos y seguros</li>
            <li>Ir acompañado a reuniones con desconocidos</li>
            <li>Verificar la identidad de la mascota antes de entregarla</li>
            <li>No compartir información personal sensible</li>
            <li>Reportar comportamientos sospechosos</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#015388]">6. Contenido de Terceros</h2>
          <p>
            Nuestra plataforma puede contener enlaces a sitios web o servicios de terceros. No somos 
            responsables del contenido, políticas de privacidad o prácticas de estos sitios externos.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">7. Uso del Servicio</h2>
          <p>
            El uso de Perdidog implica la aceptación de que el servicio se proporciona "tal cual" y 
            "según disponibilidad", sin garantías de ningún tipo, expresas o implícitas.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">8. Indemnización</h2>
          <p>
            Usted acepta indemnizar y mantener indemne a Perdidog de cualquier reclamación, daño, 
            pérdida, costo o gasto que surja de su uso del servicio o violación de estos términos.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">9. Jurisdicción</h2>
          <p>
            Este descargo de responsabilidad se rige por las leyes de México. Cualquier disputa será 
            resuelta en los tribunales competentes de la Ciudad de México.
          </p>

          <h2 className="text-2xl font-bold text-[#015388]">10. Contacto</h2>
          <p>
            Para dudas sobre este descargo de responsabilidad:
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

export default DisclaimerPage;
