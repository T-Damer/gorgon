import { cn } from 'helpers/cn'
import { HTMLAttributes, PropsWithChildren } from 'react'
import { ClassNameProp } from 'types/Props'

export default function Card({
  children,
  className,
  ...rest
}: PropsWithChildren & ClassNameProp & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        'flex h-64 w-80 flex-col gap-4 rounded-md bg-white p-4 drop-shadow-2xl ',
        className
      )}
    >
      {children}
    </div>
  )
}
