import { Currency } from '@uniswap/sdk-core'
import useCurrencyLogoURIs from 'lib/hooks/useCurrencyLogoURIs'
import React from 'react'
import styled from 'styled-components/macro'

import Logo from 'components/Logo'

export const StyledLogo = styled(Logo)<{ size: string; $native: boolean }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  /* background: radial-gradient(white 50%, #ffffff00 calc(75% + 1px), #ffffff00 100%);
  border-radius: 50%;
  -mox-box-shadow: 0 0 1px ${({ $native }) => ($native ? 'white' : 'black')};
  -webkit-box-shadow: 0 0 1px ${({ $native }) => ($native ? 'white' : 'black')};
  box-shadow: 0 0 1px ${({ $native }) => ($native ? 'white' : 'black')};
  border: 0px solid rgba(255, 255, 255, 0); */
  border-radius: ${({ size }) => size};
  /* box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075); */
  /* background-color: ${({ theme }) => theme.white}; */
  background-color: ${({ theme }) => theme.white}; // MOD
  color: ${({ theme }) => theme.black}!important; // MOD
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ...rest
}: {
  currency?: Currency | null
  size?: string
  style?: React.CSSProperties
}) {
  const logoURIs = useCurrencyLogoURIs(currency)

  return (
    <StyledLogo
      size={size}
      $native={currency?.isNative ?? false}
      srcs={logoURIs}
      alt={`${currency?.symbol ?? 'token'} logo`}
      style={style}
      {...rest}
    />
  )
}
