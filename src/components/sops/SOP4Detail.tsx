import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Send, User, Laptop, CheckSquare, Loader2, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export default function SOP4Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    cliente: 'TechCorp Industries',
    vendedor: 'Juan Rodríguez',
    equipo: 'UR5e',
    cantidad: 1,
    proposito: 'Demostración técnica para proyecto de automatización',
    fechaSalida: '2024-02-15',
    fechaRetorno: '2024-03-01',
    destinoInstalacion: 'Planta TechCorp - Querétaro',
    responsableCliente: 'Ing. Roberto Sánchez',
    telefono: '+52 442 123 4567',
    checklistSalida: {
      estadoFisico: false,
      accesorios: false,
      software: false,
      documentacion: false,
    },
    observaciones: 'Equipo con software actualizado. Incluye maleta de transporte.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Cliente y Vendedor', icon: User },
    { number: 2, title: 'Detalles del Equipo', icon: Laptop },
    { number: 3, title: 'Checklist de Salida', icon: CheckSquare },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.cliente.trim()) newErrors.cliente = 'Requerido';
      if (!formData.vendedor.trim()) newErrors.vendedor = 'Requerido';
    } else if (step === 2) {
      if (!formData.proposito.trim()) newErrors.proposito = 'Requerido';
      if (!formData.destinoInstalacion.trim()) newErrors.destinoInstalacion = 'Requerido';
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
    
    localStorage.setItem(`htl_sop4_${id}`, JSON.stringify(formData));
    
    setLoading(false);
    toast.success('Préstamo registrado exitosamente');
    navigate('/sop4-prestamo-demo/slas');
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
            onClick={() => navigate('/sop4-prestamo-demo/slas')}
            whileHover={{ x: -5 }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Préstamo Demo DEMO-2024-{id}
              </span>
            </h1>
            <p className="text-gray-400">SOP 4 - Registro de préstamo de equipo demo</p>
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
                <h2 className="text-2xl font-bold text-white">Información del Cliente y Vendedor</h2>
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

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vendedor HTL *</label>
                  <input
                    type="text"
                    value={formData.vendedor}
                    onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Nombre del vendedor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Responsable del Cliente</label>
                  <input
                    type="text"
                    value={formData.responsableCliente}
                    onChange={(e) => setFormData({ ...formData, responsableCliente: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Nombre y puesto"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono de Contacto</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="+52 442 123 4567"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Laptop className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Detalles del Equipo Demo</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Equipo</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['UR5e', 'MiR250 Shelf', 'MiR100'].map((eq) => (
                      <button
                        key={eq}
                        type="button"
                        onClick={() => setFormData({ ...formData, equipo: eq as any })}
                        className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                          formData.equipo === eq
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700'
                        }`}
                      >
                        {eq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de Salida</label>
                  <input
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de Retorno Esperada</label>
                  <input
                    type="date"
                    value={formData.fechaRetorno}
                    onChange={(e) => setFormData({ ...formData, fechaRetorno: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Propósito del Préstamo *</label>
                  <textarea
                    value={formData.proposito}
                    onChange={(e) => setFormData({ ...formData, proposito: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Demo, prueba, evaluación..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Destino/Instalación *</label>
                  <input
                    type="text"
                    value={formData.destinoInstalacion}
                    onChange={(e) => setFormData({ ...formData, destinoInstalacion: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Ubicación donde se instalará"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <CheckSquare className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Checklist de Salida</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-300 mb-4">Verificar antes de la entrega:</p>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'estadoFisico', label: 'Estado físico del equipo (sin daños visibles)' },
                      { key: 'accesorios', label: 'Accesorios completos (cables, fuentes, maleta)' },
                      { key: 'software', label: 'Software actualizado y licencias activas' },
                      { key: 'documentacion', label: 'Documentación técnica y manuales incluidos' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.checklistSalida[item.key as keyof typeof formData.checklistSalida]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              checklistSalida: {
                                ...formData.checklistSalida,
                                [item.key]: e.target.checked,
                              },
                            })
                          }
                          className="mt-0.5 w-5 h-5 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones Adicionales</label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Notas adicionales sobre el equipo o el préstamo..."
                  />
                </div>
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
                        <span>Registrando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Registrar Préstamo</span>
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
