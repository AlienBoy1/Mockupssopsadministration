import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Send, User, AlertTriangle, Wrench, Loader2, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function SOP5Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    cliente: 'TechCorp Industries',
    contacto: 'Ing. Roberto Sánchez',
    telefono: '+52 442 123 4567',
    email: 'roberto.sanchez@techcorp.com',
    tipo: 'Postventa',
    severidad: 'S2',
    equipo: 'UR5e - Serie 12345',
    descripcion: 'Robot presenta error en el controlador durante operaciones de soldadura',
    pasos: 'Error aparece al ejecutar programa número 3 después de aproximadamente 2 horas de operación continua',
    impacto: 'Línea de producción detenida parcialmente',
    solucionEsperada: 'Diagnóstico remoto inicial y si es necesario visita técnica',
    asignadoA: 'Iván Ramírez',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Cliente y Contacto', icon: User },
    { number: 2, title: 'Problema', icon: AlertTriangle },
    { number: 3, title: 'Asignación', icon: Wrench },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.cliente.trim()) newErrors.cliente = 'Requerido';
      if (!formData.contacto.trim()) newErrors.contacto = 'Requerido';
    } else if (step === 2) {
      if (!formData.descripcion.trim()) newErrors.descripcion = 'Requerido';
      if (!formData.equipo.trim()) newErrors.equipo = 'Requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem(`htl_sop5_${id}`, JSON.stringify(formData));
    
    setLoading(false);
    toast.success('Ticket creado y asignado exitosamente');
    navigate('/sop5-soporte/slas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            onClick={() => navigate('/sop5-soporte/slas')}
            whileHover={{ x: -5 }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Ticket Soporte SRV-2024-{id}
              </span>
            </h1>
            <p className="text-gray-400">SOP 5 - Registro de soporte y servicios</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/50'
                      : 'bg-gray-700/50 border border-gray-600'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="text-white" size={24} />
                    ) : (
                      <step.icon className={currentStep >= step.number ? 'text-white' : 'text-gray-500'} size={24} />
                    )}
                  </div>
                  <p className={`text-xs mt-2 text-center ${
                    currentStep >= step.number ? 'text-white font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-700/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 mb-6"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <User className="text-orange-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Información del Cliente</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cliente *</label>
                  <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.cliente ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    placeholder="Nombre del cliente"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Persona de Contacto *</label>
                  <input
                    type="text"
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Nombre y cargo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="+52 442 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="email@cliente.com"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Descripción del Problema</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Servicio</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Preventa', 'Postventa', 'Mantenimiento'].map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => setFormData({ ...formData, tipo: tipo as any })}
                        className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                          formData.tipo === tipo
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700'
                        }`}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Severidad</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: 'S1', label: 'S1 - Crítico (≤ 4h)', color: 'from-red-500 to-red-600' },
                      { value: 'S2', label: 'S2 - Alta (≤ 24h)', color: 'from-orange-500 to-orange-600' },
                      { value: 'S3', label: 'S3 - Normal (≤ 5 días)', color: 'from-blue-500 to-blue-600' },
                    ].map((sev) => (
                      <button
                        key={sev.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, severidad: sev.value as any })}
                        className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                          formData.severidad === sev.value
                            ? `bg-gradient-to-r ${sev.color} text-white shadow-lg`
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700'
                        }`}
                      >
                        {sev.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Equipo Afectado *</label>
                  <input
                    type="text"
                    value={formData.equipo}
                    onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Modelo y número de serie"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descripción del Problema *</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Describe el problema detalladamente..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pasos para Reproducir</label>
                  <textarea
                    value={formData.pasos}
                    onChange={(e) => setFormData({ ...formData, pasos: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="¿Cómo se reproduce el problema?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Impacto en Operación</label>
                  <input
                    type="text"
                    value={formData.impacto}
                    onChange={(e) => setFormData({ ...formData, impacto: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="¿Cómo afecta la operación?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Solución Esperada</label>
                  <input
                    type="text"
                    value={formData.solucionEsperada}
                    onChange={(e) => setFormData({ ...formData, solucionEsperada: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="¿Qué esperas como solución?"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Wrench className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Asignación del Ticket</h2>
              </div>

              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-6">
                <h3 className="text-sm font-medium text-blue-300 mb-4">Resumen del Ticket</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cliente:</span>
                    <span className="text-white font-medium">{formData.cliente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tipo:</span>
                    <span className="text-white font-medium">{formData.tipo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Severidad:</span>
                    <span className="text-white font-medium">{formData.severidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equipo:</span>
                    <span className="text-white font-medium">{formData.equipo}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Asignar a:</label>
                <select
                  value={formData.asignadoA}
                  onChange={(e) => setFormData({ ...formData, asignadoA: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                >
                  <option value="Iván Ramírez">Iván Ramírez (Técnico Senior)</option>
                  <option value="Fidencio Martínez">Fidencio Martínez (Ingeniero Aplicaciones)</option>
                  <option value="Ventas PM">Ventas PM (Project Manager)</option>
                  <option value="Soporte L1">Soporte L1 (Primera Línea)</option>
                </select>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <p className="text-sm text-orange-300">
                  El ticket será asignado automáticamente según severidad y disponibilidad. Se enviará notificación por email al responsable asignado.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between gap-4">
          <motion.button
            onClick={handlePrev}
            disabled={currentStep === 1}
            whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
            whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            Anterior
          </motion.button>

          <div className="flex gap-3">
            {currentStep < 3 ? (
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
                <div className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium">
                  Siguiente
                </div>
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-700/50 transition-all"
                >
                  <Save size={20} className="inline mr-2" />
                  Guardar Borrador
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
                  <div className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium flex items-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Creando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Crear Ticket</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
