import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useI18n } from '../../contexts/I18nContext';

export default function FormDEM() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientContact: '',
    clientEmail: '',
    clientPhone: '',
    equipmentDescription: '',
    serialNumber: '',
    loanStartDate: '',
    loanEndDate: '',
    purpose: '',
    conditions: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = t('form.required');
    if (!formData.clientEmail.trim()) newErrors.clientEmail = t('form.required');
    if (!formData.equipmentDescription.trim()) newErrors.equipmentDescription = t('form.required');
    if (!formData.loanStartDate) newErrors.loanStartDate = t('form.required');
    if (!formData.loanEndDate) newErrors.loanEndDate = t('form.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
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
    
    const submissions = JSON.parse(localStorage.getItem('htl_fdem_submissions') || '[]');
    submissions.push({ ...formData, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('htl_fdem_submissions', JSON.stringify(submissions));
    
    setLoading(false);
    toast.success('Formulario F-DEM enviado exitosamente');
    
    setFormData({
      clientName: '',
      clientContact: '',
      clientEmail: '',
      clientPhone: '',
      equipmentDescription: '',
      serialNumber: '',
      loanStartDate: '',
      loanEndDate: '',
      purpose: '',
      conditions: '',
      notes: '',
    });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Formulario F-DEM
          </h1>
          <p className="text-gray-400">
            Préstamo de Equipo Demo - Registro de salida temporal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#0F1419] border border-gray-800 rounded-xl p-6 lg:p-8 space-y-6">
            {/* Client Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Información del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Nombre del Cliente / Empresa *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleChange('clientName', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.clientName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Ej: Acme Corporation"
                  />
                  {errors.clientName && (
                    <p className="mt-1 text-sm text-red-400">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Persona de Contacto
                  </label>
                  <input
                    type="text"
                    value={formData.clientContact}
                    onChange={(e) => handleChange('clientContact', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleChange('clientEmail', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.clientEmail ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="cliente@empresa.com"
                  />
                  {errors.clientEmail && (
                    <p className="mt-1 text-sm text-red-400">{errors.clientEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => handleChange('clientPhone', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+52 123 456 7890"
                  />
                </div>
              </div>
            </div>

            {/* Equipment Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Equipo Demo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-2">
                    Descripción del Equipo *
                  </label>
                  <textarea
                    value={formData.equipmentDescription}
                    onChange={(e) => handleChange('equipmentDescription', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.equipmentDescription ? 'border-red-500' : 'border-gray-700'
                    }`}
                    rows={2}
                    placeholder="Modelo, especificaciones, accesorios incluidos..."
                  />
                  {errors.equipmentDescription && (
                    <p className="mt-1 text-sm text-red-400">{errors.equipmentDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Número de Serie
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => handleChange('serialNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SN-XXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Loan Period */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Periodo de Préstamo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={formData.loanStartDate}
                    onChange={(e) => handleChange('loanStartDate', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.loanStartDate ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {errors.loanStartDate && (
                    <p className="mt-1 text-sm text-red-400">{errors.loanStartDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Fecha de Devolución Esperada *
                  </label>
                  <input
                    type="date"
                    value={formData.loanEndDate}
                    onChange={(e) => handleChange('loanEndDate', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#1A1F28] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.loanEndDate ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {errors.loanEndDate && (
                    <p className="mt-1 text-sm text-red-400">{errors.loanEndDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Purpose and Conditions */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Propósito del Préstamo
                </label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => handleChange('purpose', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Ej: Prueba piloto, demostración en sitio, evaluación técnica..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Condiciones Especiales
                </label>
                <textarea
                  value={formData.conditions}
                  onChange={(e) => handleChange('conditions', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Términos especiales, restricciones de uso, seguro..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Cualquier información adicional relevante..."
                />
              </div>
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
