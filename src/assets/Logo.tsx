import { useBeforeUnload, useNavigate } from 'react-router'

export default function Logo() {
  const navigate = useNavigate()
  useBeforeUnload(() => navigate('/select'))

  return (
    <div
      className="flex cursor-pointer gap-2 font-bold text-black text-xl transition-opacity hover:opacity-80"
      onClick={() => navigate('/select')}
    >
      <span className="flex aspect-square rounded-full bg-white/50 p-3 text-xl backdrop-blur-2xl">
        <img src="img/gorgon.png" alt="logo" width={32} height={32} />
      </span>
    </div>
  )
}
