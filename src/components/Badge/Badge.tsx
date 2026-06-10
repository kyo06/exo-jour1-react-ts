import './Badge.module.css'

interface BadgeProps {
  text: string
  color?: string
}

export default function Badge({ text, color }: BadgeProps) {
  return (
    <div className="badge" style={{ color: color }}>
      {text}
    </div>
  )
}
