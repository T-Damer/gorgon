import { Trans, useLingui } from '@lingui/react/macro'
import isDocStore from 'atoms/isDocStore'
import Card from 'components/Card'
import Header from 'components/Header'
import TransitionWrapper from 'components/TransitionWrapper'
import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router'

export default function MainPage() {
  const { t } = useLingui()
  const navigate = useNavigate()
  const setIsDoc = useSetAtom(isDocStore)

  return (
    <TransitionWrapper className="overflow-auto">
      <Header />
      <div className="flex h-full flex-col items-center justify-center gap-8 p-2 md:flex-row">
        <Card className="text-center text-black">
          <h1 className="font-black text-2xl">Горгона</h1>
          <p>
            <Trans>
              Это виртуальный акушерский консультант, который поможет вам
              определить риски развития гиперплазии эндометрия.
            </Trans>
          </p>
        </Card>

        <Card
          className="items-center justify-center font-bold text-2xl text-black transition-all hover:scale-105 hover:bg-slate-200 active:scale-110"
          onClick={() => {
            setIsDoc(true)
            navigate('/questions')
          }}
        >
          {t`Врач`}
        </Card>
        <Card
          className="items-center justify-center font-bold text-2xl text-black transition-all hover:scale-105 hover:bg-slate-200 active:scale-110"
          onClick={() => {
            setIsDoc(false)
            navigate('/questions')
          }}
        >
          {t`Пациент`}
        </Card>
      </div>
    </TransitionWrapper>
  )
}
