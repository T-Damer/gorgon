import { useLingui } from '@lingui/react/macro'
import patientsDataStore from 'atoms/patientsDataStore'
import clsx from 'clsx'
import TransitionWrapper from 'components/TransitionWrapper'
import useQuestions from 'helpers/hooks/useQuestions'
import useResult from 'helpers/hooks/useResult'
import saveObjectAsXlsx from 'helpers/saveObjectAsXlsx'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'

export default function ResultPage() {
  const navigate = useNavigate()
  const [atom, setAtom] = useAtom(patientsDataStore)
  const { t } = useLingui()
  const sum = atom.map((item) => item.answerId).reduce((a, b) => a + b, 0)
  const questions = useQuestions()
  const result = useResult(sum)

  const resultToBg = {
    low: 'bg-green-500',
    med: 'bg-yellow-500',
    high: 'bg-red-500',
  }

  return (
    <TransitionWrapper className="z-10 flex items-center justify-center overflow-auto">
      <div className="mx-2 flex h-5/6 w-full max-w-prose flex-col justify-between gap-y-3 overflow-y-scroll rounded-md bg-white p-8 text-black">
        <h1 className="text-center font-black text-2xl">{t`Результат`}</h1>
        <div
          className={clsx(
            'flex h-48 w-48 items-center justify-center self-center rounded-full text-center font-bold text-lg',
            resultToBg[result.value as keyof typeof resultToBg]
          )}
        >
          {result.title}
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            className="btn btn-lg rounded-3xl"
            onClick={() => {
              setAtom([])
              navigate('/')
            }}
          >{t`Пройти заново`}</button>

          <button
            className="btn btn-primary btn-lg rounded-3xl"
            onClick={() =>
              saveObjectAsXlsx(t`Результат`, atom, result, questions)
            }
          >{t`Сохранить и отправить`}</button>
        </div>
      </div>
    </TransitionWrapper>
  )
}
