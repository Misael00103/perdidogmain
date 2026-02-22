import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { 
  Dog, Search, MapPin, Bell, Users, Shield, Heart, 
  Smartphone, ArrowRight, CheckCircle, Play 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import perdidogLogo from "@/images/perdidog5-removebg-preview.png";

// Componente para contador animado
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    // Extraer el número del string (ej: "15K+" -> 15)
    const numericEnd = parseInt(end.toString().replace(/[^0-9]/g, ''));
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function para suavizar la animación
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(numericEnd * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className={isVisible ? "inline-block animate-count-up" : "inline-block"}>
      {count}{suffix}
    </span>
  );
};

const LandingPage = () => {
  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate classes
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      icon: Search,
      title: "Búsqueda Inteligente",
      description: "Encuentra mascotas perdidas o reporta avistamientos cerca de tu ubicación con nuestra tecnología de geolocalización."
    },
    {
      icon: Bell,
      title: "Alertas Instantáneas",
      description: "Recibe notificaciones en tiempo real cuando alguien reporte una mascota similar a la tuya en tu área."
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Únete a miles de amantes de los animales comprometidos con ayudar a reunir mascotas con sus familias."
    },
    {
      icon: MapPin,
      title: "Mapa Interactivo",
      description: "Visualiza reportes de mascotas perdidas y encontradas en un mapa intuitivo y fácil de usar."
    },
    {
      icon: Shield,
      title: "Seguro y Confiable",
      description: "Tu información está protegida. Verificamos cada reporte para garantizar la seguridad de todos."
    },
    {
      icon: Heart,
      title: "Red de Rescate",
      description: "Conectamos con refugios y ONGs locales para maximizar las posibilidades de reunión."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Descarga la App",
      description: "Disponible gratis para iOS y Android. Regístrate en segundos."
    },
    {
      number: "02",
      title: "Reporta o Busca",
      description: "Crea un reporte de tu mascota perdida o reporta un animal encontrado."
    },
    {
      number: "03",
      title: "Conecta",
      description: "Recibe alertas y conecta con personas que puedan ayudarte."
    },
    {
      number: "04",
      title: "Reencuentro",
      description: "Celebra el reencuentro con tu mascota gracias a nuestra comunidad."
    }
  ];

  const stats = [
    { value: 15, suffix: "K+", label: "Mascotas Reunidas" },
    { value: 50, suffix: "K+", label: "Usuarios Activos" },
    { value: 100, suffix: "+", label: "Ciudades" },
    { value: 98, suffix: "%", label: "Satisfacción" }
  ];

  return (
    <div className="min-h-screen" data-testid="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #015388 0%, #016dad 50%, #16A99F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm animate-fade-in stagger-1">
                <span className="w-2 h-2 bg-[#16A99F] rounded-full animate-pulse"></span>
                <span>+1,000 mascotas reunidas este mes</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up stagger-2">
                Reunimos mascotas 
                <span className="text-[#16A99F]"> perdidas</span> con sus familias
              </h1>
              
              <p className="text-lg text-white/80 max-w-xl animate-fade-in-up stagger-3">
                Perdidog es la plataforma líder para reportar, buscar y encontrar mascotas perdidas. 
                Únete a nuestra comunidad y ayuda a reunir familias.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#015388] hover:bg-gray-100 rounded-full px-8 h-14 text-base font-semibold group transition-all hover:scale-105"
                  data-testid="hero-download-btn"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Descargar Gratis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
               
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 animate-fade-in-up stagger-5">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-[#16A99F]">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative p-2 rounded-[36px] animate-float" style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' }}>
                <div className="rounded-[28px] overflow-hidden w-[280px] h-[580px] bg-gray-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1574210319288-ad55b1f86160?w=400&h=800&fit=crop"
                    alt="Perdidog App Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#015388]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 space-y-3 animate-fade-in-up">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#16A99F] flex items-center justify-center animate-pulse-slow">
                          <img 
                            src={perdidogLogo} 
                            alt="Perdidog" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Max encontrado</p>
                          <p className="text-white/70 text-sm">Hace 5 minutos</p>
                        </div>
                      </div>
                      <Button className="w-full bg-white text-[#015388] hover:bg-gray-100 rounded-xl transition-all hover:scale-105">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-animate">
            <span className="text-[#16A99F] font-semibold text-sm uppercase tracking-wider">Características</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#015388] mt-3 mb-4">
              Todo lo que necesitas para encontrar a tu mascota
            </h2>
            <p className="text-gray-600">
              Herramientas poderosas diseñadas para maximizar las posibilidades de reunir mascotas con sus familias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`card-hover border-0 shadow-lg rounded-2xl overflow-hidden scroll-animate-scale`} style={{ transitionDelay: `${index * 0.1}s` }} data-testid={`feature-card-${index}`}>
                <CardContent className="p-8">
                  <div className="feature-icon w-14 h-14 rounded-xl flex items-center justify-center mb-6 animate-pulse-slow">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#015388] mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-animate">
            <span className="text-[#16A99F] font-semibold text-sm uppercase tracking-wider">Cómo Funciona</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#015388] mt-3 mb-4">
              Encuentra a tu mascota en 4 simples pasos
            </h2>
            <p className="text-gray-600">
              Un proceso simple y efectivo para reunir mascotas con sus familias lo más rápido posible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative scroll-animate" style={{ transitionDelay: `${index * 0.15}s` }} data-testid={`step-${index}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover h-full transition-all hover:scale-105">
                  <div className="text-5xl font-bold text-[#16A99F]/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-[#015388] mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-[#16A99F]/30 animate-pulse-slow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 scroll-animate-left">
              <span className="text-[#16A99F] font-semibold text-sm uppercase tracking-wider">La App</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#015388]">
                Una experiencia móvil diseñada para ti y tu mascota
              </h2>
              <p className="text-gray-600 text-lg">
                Nuestra app está diseñada pensando en la emergencia. Reporta en segundos, 
                recibe alertas instantáneas y conecta con tu comunidad local.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Reportes rápidos con fotos y ubicación GPS",
                  "Alertas push personalizadas por área",
                  "Chat directo con otros usuarios",
                  "Historial completo de tus mascotas"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#16A99F] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-[#015388] hover:bg-[#016dad] text-white rounded-full px-8 h-14 transition-all hover:scale-105"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  App Store
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#015388] text-[#015388] hover:bg-[#015388] hover:text-white rounded-full px-8 h-14 transition-all hover:scale-105"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Google Play
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center scroll-animate-right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#015388]/20 to-[#16A99F]/20 rounded-[40px] blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1672664408117-a58d7e489264?w=500&h=700&fit=crop"
                  alt="Happy dog"
                  className="relative rounded-3xl shadow-2xl w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 md:py-28 relative" style={{ background: 'linear-gradient(135deg, #015388 0%, #016dad 50%, #16A99F 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <img 
            src={perdidogLogo} 
            alt="Perdidog Logo" 
            className="w-16 h-16 mx-auto mb-6 animate-pulse-slow scroll-animate-scale object-contain"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 scroll-animate">
            Descarga Perdidog hoy y únete a nuestra comunidad
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto scroll-animate">
            Miles de mascotas han sido reunidas con sus familias gracias a Perdidog. 
            Descarga la app gratis y sé parte del cambio.
          </p>
          <div className="flex flex-wrap justify-center gap-4 scroll-animate-scale">
            <Button 
              size="lg" 
              className="bg-white text-[#015388] hover:bg-gray-100 rounded-full px-10 h-14 text-base font-semibold transition-all hover:scale-110"
              data-testid="cta-download-btn"
            >
              Descargar Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
