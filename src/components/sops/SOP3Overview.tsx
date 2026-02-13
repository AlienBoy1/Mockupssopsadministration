import SOPOverview from './SOPOverview';

export default function SOP3Overview() {
  return (
    <SOPOverview
      sopNumber="SOP 3"
      sopTitle="Control de materiales para proyecto"
      slaRoute="/sop3-control-material/slas"
      kpiRoute="/sop3-control-material/kpis"
    />
  );
}
