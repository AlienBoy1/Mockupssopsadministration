import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Send, User, FileText, Package, Loader2, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function SOP2Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    solicitante: 'Carlos Méndez',
    departamento: 'PM',
    proyecto: 'Proyecto Alpha',
    descripcion: 'Componentes para proyecto Alpha - Sensores y cables',
    justificacion: 'Materiales necesarios para completar fase de ensamble según plan maestro',
    urgente: false,
    listaMateriales: 'Sensor de proximidad M18 x 10 unidades\nCables blindados Cat6 x 50 metros\nConectores M12 x 20 unidades',
    especificaciones: 'Versiones liberadas en drawing DWG-2024-001',
    proveedor: 'Por definir',
    costoEstimado: '$12,500 MXN',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Información del Solicitante', icon: User },
    { number: 2, title: 'Detalles de Requisición', icon: FileText },
    { number: 3, title: 'Especificaciones', icon: Package },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.solicitante.trim()) newErrors.solicitante = 'Requerido';
      if (!formData.proyecto.trim()) newErrors.proyecto = 'Requerido';
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
    
    localStorage.setItem(`htl_sop2_${id}`, JSON.stringify(formData));
    
    setLoading(false);
    toast.success('Requisición enviada para aprobación');
    navigate('/sop2-requisiciones/slas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080C14] via-[#0F1419] to-[#080C14] p-4 sm:p-6 lg:p-8 pt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            onClick={() => navigate('/sop2-requisiciones/slas')}
            whileHover={{ x: -5 }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Requisición REQ-2024-{id}
              </span>
            </h1>
            <p className="text-gray-400">SOP 2 - Canal único de materiales/servicios</p>
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
          {/* Step 1: Solicitante */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <User className="text-orange-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Información del Solicitante</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Solicitante *
                  </label>
                  <input
                    type="text"
                    value={formData.solicitante}
                    onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.solicitante ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    placeholder="Nombre completo"
                  />
                  {errors.solicitante && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <Info size={14} /> {errors.solicitante}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Departamento *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['PM', 'Ingeniería', 'SI', 'Almacén'].map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => setFormData({ ...formData, departamento: dept })}
                        className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                          formData.departamento === dept
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Proyecto Asociado *
                  </label>
                  <input
                    type="text"
                    value={formData.proyecto}
                    onChange={(e) => setFormData({ ...formData, proyecto: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${
                      errors.proyecto ? 'border-red-500' : 'border-gray-700'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                    placeholder="Ej: Proyecto Alpha"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl cursor-pointer hover:bg-orange-500/20 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.urgente}
                      onChange={(e) => setFormData({ ...formData, urgente: e.target.checked })}
                      className="w-5 h-5 bg-gray-800/50 border border-gray-700 rounded focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="text-orange-400" size={20} />
                      <span className="text-sm font-medium text-orange-300">Marcar como urgente (≤ 24h)</span>
                    </div>
                  </label>
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
                <h2 className="text-2xl font-bold text-white">Detalles de la Requisición</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción General *
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={2}
                  className={`w-full px-4 py-3 bg-gray-800/50 border ${
                    errors.descripcion ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none`}
                  placeholder="Describe brevemente la requisición..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Justificación del Gasto
                </label>
                <textarea
                  value={formData.justificacion}
                  onChange={(e) => setFormData({ ...formData, justificacion: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                  placeholder="¿Por qué es necesaria esta compra?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  BOM / Lista de Materiales *
                </label>
                <textarea
                  value={formData.listaMateriales}
                  onChange={(e) => setFormData({ ...formData, listaMateriales: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none font-mono text-sm"
                  placeholder="Sensor M18 x 10 uds&#10;Cable Cat6 x 50m&#10;Conectores M12 x 20 uds"
                />
              </div>
            </div>
          )}

          {/* Step 3: Especificaciones */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Package className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Especificaciones Técnicas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Especificaciones Técnicas y Drawings
                  </label>
                  <input
                    type="text"
                    value={formData.especificaciones}
                    onChange={(e) => setFormData({ ...formData, especificaciones: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Referencia a drawings liberados"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Proveedor Sugerido (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.proveedor}
                    onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Nombre del proveedor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Costo Estimado
                  </label>
                  <input
                    type="text"
                    value={formData.costoEstimado}
                    onChange={(e) => setFormData({ ...formData, costoEstimado: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="$12,500 MXN"
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
                        <span>Enviar a Compras</span>
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