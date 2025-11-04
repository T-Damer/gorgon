import { useLingui } from '@lingui/react/macro'

export type QuestionaryResult = {
  title: string
  description: string
  treatment: string
  sum: number
}

export default function useResult(sum: number) {
  const { t } = useLingui()

  switch (true) {
    case sum < 10:
      return {
        title: t`Низкая степень риска развития гиперплазии`,
        description: t``,
        treatment: t``,
        sum,
      }
    case sum >= 11 && sum <= 15:
      return {
        title: t`Средняя степень риска развития гиперплазии`,
        description: t``,
        treatment: t``,
        sum,
      }
    case sum > 15:
      return {
        title: t`Высокая степень риска развития гиперплазии`,
        description: t``,
        treatment: t``,
        sum,
      }
    default:
      return {
        title: t`Низкая степень риска развития гиперплазии`,
        description: t``,
        treatment: t``,
        sum,
      }
  }
}
