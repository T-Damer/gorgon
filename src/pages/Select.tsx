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
    <TransitionWrapper className="overflow-hidden">
      <Header />
      <div className="flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-6 overflow-hidden p-2">
        <Card className="text-center text-black">
          <h1 className="font-black text-2xl">
            <Trans>Горгона</Trans>
          </h1>
          <p>
            <Trans>
              Виртуальная анкета для оценки степени риска развития гиперплазии
              эндометрия и эндометриоидной интраэпителиальной неоплазии
            </Trans>
          </p>
        </Card>

        <div className="flex shrink-0 items-center justify-center">
          <button
            type="button"
            className="relative z-10 inline-flex min-h-14 min-w-56 cursor-pointer items-center justify-center rounded-3xl border border-gray-500 bg-gray-300 px-8 py-4 font-bold text-black shadow transition-colors hover:bg-gray-400"
            onClick={() => {
              setIsDoc(true)
              navigate('/questions')
            }}
          >
            {t`Пройти анкету`}
          </button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
