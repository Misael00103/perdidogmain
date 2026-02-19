import { Link } from "react-router-dom";
import { Dog, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-gradient text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Perdidog</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Conectamos mascotas perdidas con sus familias. Juntos hacemos la diferencia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-white/70 hover:text-white transition-colors text-sm">
                  Características
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link to="/#download" className="text-white/70 hover:text-white transition-colors text-sm">
                  Descargar App
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-terms">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-privacy">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-disclaimer">
                  Descargo de Responsabilidad
                </Link>
              </li>
              <li>
                <Link to="/safety-report" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-safety">
                  Safety Report
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-white/70 hover:text-white transition-colors text-sm" data-testid="footer-sitemap">
                  Mapa del Sitio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-[#16A99F]" />
                <span>soporte@perdidog.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-[#16A99F]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-[#16A99F] mt-0.5" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 Perdidog. Todos los derechos reservados.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-red-400 fill-red-400" /> para las mascotas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
