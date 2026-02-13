import SOPOverview from './SOPOverview';

export default function SOP1Overview() {
  return (
    <SOPOverview
      sopNumber="SOP 1"
      sopTitle="Cotizaciones"
      sopSubtitle="(distribución, proyectos y compuestos)"
      slaRoute="/sop1-cotizaciones/slas"
      kpiRoute="/sop1-cotizaciones/kpis"
    />
  );
}
