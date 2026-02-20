interface SlayMeterProps {
  slayScore: number
  width?: string
}

export default function SlayMeter({ slayScore }: SlayMeterProps) {
  return (
    <div className="slay-meter">
      <div className="slay-meter-fill" style={{ width: `${slayScore}%` }} />
      <span className="slay-score">{slayScore}%</span>
    </div>
  );
}
