import SOPOverview from './SOPOverview';

export default function SOP2Overview() {
  return (
    <SOPOverview
      sopNumber="SOP 2"
      sopTitle="Requisiciones"
      slaRoute="/sop2-requisiciones/slas"
      kpiRoute="/sop2-requisiciones/kpis"
    />
  );
}
