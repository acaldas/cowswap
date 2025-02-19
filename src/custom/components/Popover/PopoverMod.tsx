import { Options, Placement } from '@popperjs/core'
import Portal from '@reach/portal'
import useInterval from 'lib/hooks/useInterval'
import React, { useCallback, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'
import styled, { DefaultTheme, StyledComponent } from 'styled-components/macro'

// MOD imports
import { transparentize } from 'polished'
import { PopoverContainerProps } from '.'

export const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  /* color: ${({ theme }) => theme.text2}; */
  /* MOD */
  color: ${({ theme }) => theme.text1};
  background: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
  border-radius: 8px;
`

const ReferenceElement = styled.div`
  display: inline-block;
`

export const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.bg3};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg1};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps extends PopoverContainerProps, React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  // show: boolean
  children: React.ReactNode
  placement?: Placement
  // MOD
  PopoverContainer: StyledComponent<'div', DefaultTheme, PopoverContainerProps, never> // gp mod
  Arrow: StyledComponent<'div', DefaultTheme, Omit<PopoverContainerProps, 'color' | 'show'>, never> // gp mod
}

export default function Popover({
  content,
  show,
  children,
  placement = 'auto',
  bgColor,
  color,
  PopoverContainer,
  Arrow,
  className,
}: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  const options = useMemo(
    (): Options => ({
      placement,
      strategy: 'fixed',
      modifiers: [
        { name: 'offset', options: { offset: [8, 8] } },
        { name: 'arrow', options: { element: arrowElement } },
        { name: 'preventOverflow', options: { padding: 8 } },
      ],
    }),
    [arrowElement, placement]
  )

  const { styles, update, attributes } = usePopper(referenceElement, popperElement, options)

  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    <>
      <ReferenceElement ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        <PopoverContainer
          className={className}
          show={show}
          ref={setPopperElement as any}
          style={styles.popper}
          {...attributes.popper}
          bgColor={bgColor}
          color={color}
        >
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement as any}
            style={styles.arrow}
            bgColor={bgColor}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </>
  )
}
