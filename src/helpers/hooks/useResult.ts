import { useLingui } from '@lingui/react/macro'

export type QuestionaryResult = {
  title: string
  description: string
  value: string
  sum: number
}

export default function useResult(sum: number) {
  const { t } = useLingui()

  switch (true) {
    case sum < 10:
      return {
        value: 'low',
        title: t`Низкая степень риска развития гиперплазии`,
        description: t`-`,
        sum,
      }
    case sum >= 11 && sum <= 15:
      return {
        value: 'med',
        title: t`Средняя степень риска развития гиперплазии`,
        description: t`-`,
        sum,
      }
    case sum > 15:
      return {
        value: 'high',
        title: t`Высокая степень риска развития гиперплазии`,
        description: t`-`,
        sum,
      }
    default:
      return {
        value: 'low',
        title: t`Низкая степень риска развития гиперплазии`,
        description: t`-`,
        sum,
      }
  }
}
