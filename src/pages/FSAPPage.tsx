import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Loader2, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useConnection } from '../contexts/ConnectionContext';

interface FormData {
  orderNumber: string;
  projectName: string;
  requestedBy: string;
  department: string;
  materialDescription: string;
  quantity: string;
  unit: string;
  destination: string;
  purposeOfUse: string;
  expectedReturnDate: string;
  notes: string;
}

export function FSAPPage() {
  const [loading, setLoading] = useState(false);
  const { isOnline } = useConnection();
  const [formData, setFormData] = useState<FormData>({
    orderNumber: '',
    projectName: '',
    requestedBy: '',
    department: '',
    materialDescription: '',
    quantity: '',
    unit: 'piezas',
    destination: '',
    purposeOfUse: '',
    expectedReturnDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Auto-save draft
    const draft = { ...formData, [field]: value };
    localStorage.setItem('htl_fsap_draft', JSON.stringify(draft));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.orderNumber) newErrors.orderNumber = 'Campo requerido';
    if (!formData.projectName) newErrors.projectName = 'Campo requerido';
    if (!formData.requestedBy) newErrors.requestedBy = 'Campo requerido';
    if (!formData.department) newErrors.department = 'Campo requerido';
    if (!formData.materialDescription) newErrors.materialDescription = 'Campo requerido';
    if (!formData.quantity || parseInt(formData.quantity) <= 0) newErrors.quantity = 'Cantidad inválida';
    if (!formData.destination) newErrors.destination = 'Campo requerido';
    if (!formData.purposeOfUse) newErrors.purposeOfUse = 'Campo requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage
      const submissions = JSON.parse(localStorage.getItem('htl_fsap_submissions') || '[]');
      submissions.push({
        ...formData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('htl_fsap_submissions', JSON.stringify(submissions));

      if (!isOnline) {
        localStorage.setItem('pending_sync_fsap', JSON.stringify(submissions));
      }

      // Clear draft
      localStorage.removeItem('htl_fsap_draft');

      toast.success('Formulario F-SAP enviado correctamente');
      
      // Reset form
      setFormData({
        orderNumber: '',
        projectName: '',
        requestedBy: '',
        department: '',
        materialDescription: '',
        quantity: '',
        unit: 'piezas',
        destination: '',
        purposeOfUse: '',
        expectedReturnDate: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8 text-[var(--primary-400)]" />
          <h1 className="text-3xl font-bold text-white">Formulario F-SAP</h1>
        </div>
        <p className="text-[var(--text-secondary)]">
          Salida de Material - Registro de movimientos de inventario
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6 space-y-6"
      >
        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Número de Orden *
            </label>
            <input
              id="orderNumber"
              type="text"
              value={formData.orderNumber}
              onChange={(e) => handleChange('orderNumber', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
                errors.orderNumber
                  ? 'border-[var(--error-500)] focus:border-[var(--error-500)] focus:ring-2 focus:ring-[var(--error-500)]/20'
                  : formData.orderNumber
                  ? 'border-[var(--success-500)] focus:border-[var(--success-500)] focus:ring-2 focus:ring-[var(--success-500)]/20'
                  : 'border-[var(--border-primary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20'
              }`}
              placeholder="Ej: ORD-2024-001"
            />
            {errors.orderNumber && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.orderNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Nombre del Proyecto *
            </label>
            <input
              id="projectName"
              type="text"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
                errors.projectName
                  ? 'border-[var(--error-500)] focus:border-[var(--error-500)] focus:ring-2 focus:ring-[var(--error-500)]/20'
                  : formData.projectName
                  ? 'border-[var(--success-500)] focus:border-[var(--success-500)] focus:ring-2 focus:ring-[var(--success-500)]/20'
                  : 'border-[var(--border-primary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20'
              }`}
              placeholder="Ej: Proyecto Alpha"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.projectName}</p>
            )}
          </div>
        </div>

        {/* Requester Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="requestedBy" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Solicitado Por *
            </label>
            <input
              id="requestedBy"
              type="text"
              value={formData.requestedBy}
              onChange={(e) => handleChange('requestedBy', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
                errors.requestedBy
                  ? 'border-[var(--error-500)]'
                  : formData.requestedBy
                  ? 'border-[var(--success-500)]'
                  : 'border-[var(--border-primary)]'
              } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
              placeholder="Nombre del solicitante"
            />
            {errors.requestedBy && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.requestedBy}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Departamento *
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] transition-colors ${
                errors.department
                  ? 'border-[var(--error-500)]'
                  : formData.department
                  ? 'border-[var(--success-500)]'
                  : 'border-[var(--border-primary)]'
              } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
            >
              <option value="">Seleccionar...</option>
              <option value="engineering">Ingeniería</option>
              <option value="production">Producción</option>
              <option value="quality">Control de Calidad</option>
              <option value="logistics">Logística</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.department}</p>
            )}
          </div>
        </div>

        {/* Material Info */}
        <div>
          <label htmlFor="materialDescription" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Descripción del Material *
          </label>
          <textarea
            id="materialDescription"
            value={formData.materialDescription}
            onChange={(e) => handleChange('materialDescription', e.target.value)}
            rows={3}
            className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
              errors.materialDescription
                ? 'border-[var(--error-500)]'
                : formData.materialDescription
                ? 'border-[var(--success-500)]'
                : 'border-[var(--border-primary)]'
            } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
            placeholder="Descripción detallada del material..."
          />
          {errors.materialDescription && (
            <p className="mt-1 text-sm text-[var(--error-500)]">{errors.materialDescription}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Cantidad *
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
                errors.quantity
                  ? 'border-[var(--error-500)]'
                  : formData.quantity
                  ? 'border-[var(--success-500)]'
                  : 'border-[var(--border-primary)]'
              } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Unidad
            </label>
            <select
              id="unit"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20 transition-colors"
            >
              <option value="piezas">Piezas</option>
              <option value="kg">Kilogramos</option>
              <option value="m">Metros</option>
              <option value="cajas">Cajas</option>
              <option value="litros">Litros</option>
            </select>
          </div>
        </div>

        {/* Destination & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Destino *
            </label>
            <input
              id="destination"
              type="text"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
                errors.destination
                  ? 'border-[var(--error-500)]'
                  : formData.destination
                  ? 'border-[var(--success-500)]'
                  : 'border-[var(--border-primary)]'
              } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
              placeholder="Ubicación de destino"
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-[var(--error-500)]">{errors.destination}</p>
            )}
          </div>

          <div>
            <label htmlFor="expectedReturnDate" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Fecha Esperada de Retorno
            </label>
            <input
              id="expectedReturnDate"
              type="date"
              value={formData.expectedReturnDate}
              onChange={(e) => handleChange('expectedReturnDate', e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20 transition-colors"
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purposeOfUse" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Propósito del Uso *
          </label>
          <textarea
            id="purposeOfUse"
            value={formData.purposeOfUse}
            onChange={(e) => handleChange('purposeOfUse', e.target.value)}
            rows={3}
            className={`w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors ${
              errors.purposeOfUse
                ? 'border-[var(--error-500)]'
                : formData.purposeOfUse
                ? 'border-[var(--success-500)]'
                : 'border-[var(--border-primary)]'
            } focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20`}
            placeholder="Describe el propósito del uso del material..."
          />
          {errors.purposeOfUse && (
            <p className="mt-1 text-sm text-[var(--error-500)]">{errors.purposeOfUse}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Notas Adicionales
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary-400)] focus:ring-2 focus:ring-[var(--primary-400)]/20 transition-colors"
            placeholder="Información adicional..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-[var(--border-secondary)]">
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Enviar Formulario</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
