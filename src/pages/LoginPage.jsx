import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dog, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import perdidogLogo from "@/images/perdidog5-removebg-preview.png";
import { authAPI } from "@/services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(loginData);
      const { accessToken, refreshToken, user } = response.data;
      
      // Guardar tokens y usuario
      localStorage.setItem("perdidog_token", accessToken);
      localStorage.setItem("perdidog_refresh_token", refreshToken);
      localStorage.setItem("perdidog_user", JSON.stringify(user));
      
      toast.success("¡Bienvenido de vuelta!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #015388 0%, #016dad 50%, #16A99F 100%)' }} data-testid="login-page">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          data-testid="back-to-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <Card className="login-card border-0 shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
          <CardHeader className="text-center pt-8 pb-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#015388] to-[#16A99F] flex items-center justify-center mb-4 animate-pulse-slow">
              <img 
                src={perdidogLogo} 
                alt="Perdidog Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#015388]">Perdidog Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Panel de Administración</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-gray-700">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="admin@perdidog.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="pl-10 h-12 rounded-xl border-gray-200"
                    required
                    data-testid="login-email-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-700">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200"
                    required
                    data-testid="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#015388] hover:bg-[#016dad] text-white rounded-xl font-semibold transition-all hover:scale-105"
                disabled={isLoading}
                data-testid="login-submit-btn"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
