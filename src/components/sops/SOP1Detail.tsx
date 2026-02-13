import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Send, User, FileText, DollarSign, Loader2, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function SOP1Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    cliente: 'TechCorp Industries',
    contacto: 'Juan Pérez',
    email: 'juan.perez@techcorp.com',
    telefono: '+52 123 456 7890',
    tipo: 'Inside Sales',
    descripcion: 'Cotización para sistema de automatización - 3 robots colaborativos UR5e',
    listaMateriales: '3x UR5e\n1x Control Cabinet\n3x Teaching Pendant',
    preciosUR: '$42,000 USD c/u',
    preciosMIR: 'N/A',
    descuentos: '10%',
    costoIngenieria: '$5,000 USD',
    tarifarioSI: '120 horas',
    notas: 'Cliente solicita instalación incluida',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Información del Cliente', icon: User },
    { number: 2, title: 'Detalles de Cotización', icon: FileText },
    { number: 3, title: 'Precios y Costos', icon: DollarSign },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.cliente.trim()) newErrors.cliente = 'Requerido';
      if (!formData.email.trim()) newErrors.email = 'Requerido';
    } else if (step === 2) {
      if (!formData.descripcion.trim()) newErrors.descripcion = 'Requerido';
      if (!formData.listaMateriales.trim()) newErrors.listaMateriales = 'Requerido';
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
    
    localStorage.setItem(`htl_sop1_${id}`, JSON.stringify(formData));
    
    setLoading(false);
    toast.success('Cotización guardada exitosamente');
    navigate('/sop1-cotizaciones/slas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            onClick={() => navigate('/sop1-cotizaciones/slas')}
            whileHover={{ x: -5 }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Cotización COT-2024-{id}
              </span>
            </h1>
            <p className="text-gray-400">SOP 1 - Distribución, proyectos y componentes</p>
          </div>
        </motion.div>

        {/* Progress Steps */}
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

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 mb-6"
        >
          {/* Step 1: Cliente Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <User className="text-orange-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Información del Cliente</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cliente / Empresa *
                  </label>
                  <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.cliente ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    placeholder="Ej: Acme Corporation"
                  />
                  {errors.cliente && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <Info size={14} /> {errors.cliente}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contacto
                  </label>
                  <input
                    type="text"
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    placeholder="cliente@empresa.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <Info size={14} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Solicitud
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Inside Sales', 'Field Sales', 'Brand Leader', 'PM'].map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => setFormData({ ...formData, tipo })}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
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
              </div>
            </div>
          )}

          {/* Step 2: Detalles */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FileText className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Detalles de la Cotización</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción General *
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.descripcion ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none`}
                  placeholder="Describe brevemente el proyecto o productos..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lista de Materiales/Servicios *
                </label>
                <textarea
                  value={formData.listaMateriales}
                  onChange={(e) => setFormData({ ...formData, listaMateriales: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none font-mono text-sm"
                  placeholder="Ej: 3x UR5e&#10;1x Control Cabinet&#10;3x Teaching Pendant"
                />
              </div>
            </div>
          )}

          {/* Step 3: Precios */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Precios y Costos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precios UR/MiR (Robotiq)
                  </label>
                  <input
                    type="text"
                    value={formData.preciosUR}
                    onChange={(e) => setFormData({ ...formData, preciosUR: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="$42,000 USD c/u"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descuentos Aplicados
                  </label>
                  <input
                    type="text"
                    value={formData.descuentos}
                    onChange={(e) => setFormData({ ...formData, descuentos: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="10%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Costo Ingeniería y SI
                  </label>
                  <input
                    type="text"
                    value={formData.costoIngenieria}
                    onChange={(e) => setFormData({ ...formData, costoIngenieria: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="$5,000 USD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Horas Estimadas SI
                  </label>
                  <input
                    type="text"
                    value={formData.tarifarioSI}
                    onChange={(e) => setFormData({ ...formData, tarifarioSI: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="120 horas"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Información adicional relevante..."
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
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
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Enviar Cotización</span>
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