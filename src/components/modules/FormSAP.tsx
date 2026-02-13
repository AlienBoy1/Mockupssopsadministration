import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useI18n } from '../../contexts/I18nContext';

export default function FormSAP() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    requestDate: '',
    deliveryDate: '',
    destination: '',
    materialDescription: '',
    quantity: '',
    serialNumbers: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = t('form.required');
    }
    if (!formData.requestDate) {
      newErrors.requestDate = t('form.required');
    }
    if (!formData.materialDescription.trim()) {
      newErrors.materialDescription = t('form.required');
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Cantidad debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error on change
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('htl_fsap_submissions') || '[]');
    submissions.push({ ...formData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('htl_fsap_submissions', JSON.stringify(submissions));
    
    setLoading(false);
    toast.success('Formulario F-SAP enviado exitosamente');
    
    // Reset form
    setFormData({
      projectName: '',
      requestDate: '',
      deliveryDate: '',
      destination: '',
      materialDescription: '',
      quantity: '',
      serialNumbers: '',
      notes: '',
    });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Formulario F-SAP
          </h1>
          <p className="text-gray-400">
            Salida de Material - Requisición de equipo y componentes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 lg:p-8 space-y-6">
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleChange('projectName', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.projectName ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Ej: Proyecto Alpha"
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-400">{errors.projectName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Fecha de Solicitud *
                </label>
                <input
                  type="date"
                  value={formData.requestDate}
                  onChange={(e) => handleChange('requestDate', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.requestDate ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.requestDate && (
                  <p className="mt-1 text-sm text-red-400">{errors.requestDate}</p>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Fecha de Entrega Esperada
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleChange('deliveryDate', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Destino / Ubicación
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Planta Norte - Edificio B"
                />
              </div>
            </div>

            {/* Material Info */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Descripción del Material *
              </label>
              <textarea
                value={formData.materialDescription}
                onChange={(e) => handleChange('materialDescription', e.target.value)}
                className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.materialDescription ? 'border-red-500' : 'border-gray-700'
                }`}
                rows={3}
                placeholder="Describe el material o equipo..."
              />
              {errors.materialDescription && (
                <p className="mt-1 text-sm text-red-400">{errors.materialDescription}</p>
              )}
            </div>

            {/* Quantity and Serial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.quantity ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="0"
                  min="1"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-400">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Números de Serie (separados por comas)
                </label>
                <input
                  type="text"
                  value={formData.serialNumbers}
                  onChange={(e) => handleChange('serialNumbers', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SN001, SN002, SN003"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Información adicional..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('form.submit')}</span>
                  </>
                )}
              </motion.button>
              
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-[#1A1F28] hover:bg-[#1F2530] text-gray-300 rounded-lg transition-colors"
              >
                <Save size={20} />
                <span>Guardar Borrador</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
