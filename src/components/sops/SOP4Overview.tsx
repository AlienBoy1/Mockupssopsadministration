import SOPOverview from './SOPOverview';

export default function SOP4Overview() {
  return (
    <SOPOverview
      sopNumber="SOP 4"
      sopTitle="Préstamo de equipo"
      slaRoute="/sop4-prestamo-demo/slas"
      kpiRoute="/sop4-prestamo-demo/kpis"
    />
  );
}
