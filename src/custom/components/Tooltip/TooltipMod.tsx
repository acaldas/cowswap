import { transparentize } from 'polished'
import { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import Popover, { PopoverProps } from 'components/Popover'

const TooltipContainer = styled.div`
  max-width: 256px;
  padding: 0.6rem 1rem;
  font-weight: 400;
  word-break: break-word;

  /* background: ${({ theme }) => theme.bg0};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg2};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)}; */
`

export interface TooltipProps extends Omit<PopoverProps, 'content' | 'PopoverContainer' | 'Arrow'> {
  text: ReactNode
}

interface TooltipContentProps extends Omit<PopoverProps, 'content' | 'PopoverContainer' | 'Arrow'> {
  content: ReactNode
  onOpen?: () => void
  // whether to wrap the content in a `TooltipContainer`
  wrap?: boolean
  disableHover?: boolean // disable the hover and content display
}

export default function Tooltip({ text, className, ...rest }: TooltipProps) {
  return <Popover className={className} content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />
}

export function TooltipContent({ content, wrap = false, ...rest }: TooltipContentProps) {
  return <Popover content={wrap ? <TooltipContainer>{content}</TooltipContainer> : content} {...rest} />
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  )
}

export function MouseoverTooltipContent({
  content,
  children,
  onOpen: openCallback = undefined,
  disableHover,
  ...rest
}: Omit<TooltipContentProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => {
    setShow(true)
    openCallback?.()
  }, [openCallback])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <TooltipContent {...rest} show={show} content={disableHover ? null : content}>
      <div
        // style={{ display: 'inline-block', lineHeight: 0, padding: '0.25rem' }}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        {children}
      </div>
    </TooltipContent>
  )
}
