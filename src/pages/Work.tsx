import Header from 'components/Header'
import QuestionSwiper from 'components/QuestionSwiper'
import TransitionWrapper from 'components/TransitionWrapper'

export default function WorkPage() {
  return (
    <TransitionWrapper className="overflow-hidden">
      <Header />
      <div className="mt-4 flex h-[calc(100%-4rem)] items-center justify-center overflow-hidden px-2 pb-4">
        <QuestionSwiper />
      </div>
    </TransitionWrapper>
  )
}
