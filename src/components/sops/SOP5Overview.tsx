import SOPOverview from './SOPOverview';

export default function SOP5Overview() {
  return (
    <SOPOverview
      sopNumber="SOP 5"
      sopTitle="Soporte de servicios"
      slaRoute="/sop5-soporte/slas"
      kpiRoute="/sop5-soporte/kpis"
    />
  );
}
