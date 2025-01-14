// import { Trans } from '@lingui/macro'
// import { useWeb3React } from '@web3-react/core'
// import CopyHelper from 'components/AccountDetails/Copy'
// import { getConnection, getConnectionName, getIsCoinbaseWallet, getIsMetaMask } from 'connection/utils'
// import { Context, useCallback, useContext } from 'react'
// import { ExternalLink as LinkIcon } from 'react-feather'
// import { useAppDispatch } from 'state/hooks'
// import { updateSelectedWallet } from 'state/user/reducer'
// import { DefaultTheme } from 'styled-components/macro'
import styled /* , { ThemeContext } */ from 'styled-components/macro'
// import { isMobile } from 'utils/userAgent'

import { ReactComponent as Close } from 'assets/images/x.svg'
// import { clearAllTransactions } from '../../state/transactions/reducer'
import { ExternalLink /* , LinkStyledButton, ThemedText */ } from 'theme'
// import { shortenAddress } from 'utils'
// import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ButtonSecondary } from 'components/Button'
// import StatusIcon from '../Identicon/StatusIcon'
// import { AutoRow } from '../Row'
// import Transaction from '@src/components/AccountDetails/Transaction'

import Activity from 'components/AccountDetails/Transaction' // MOD
import { ActivityDescriptors } from 'hooks/useRecentActivity' // MOD

export const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.text1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

export const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

export const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

export const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`

export const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

export const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

export const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    border-radius: 0;
    margin-bottom: 16px;
  `}

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`

export const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

export const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

/* function WrappedStatusIcon({ connector }: { connector: AbstractConnector | Connector }) {
  return (
    <IconWrapper size={16}>
      <StatusIcon connector={connector} />
    </IconWrapper>
  )
} */

export const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`

export const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.text1};
`

// function renderTransactions(transactions: string[]) {
export function renderActivities(activities: ActivityDescriptors[]) {
  return (
    <TransactionListWrapper>
      {activities.map((activity) => {
        return <Activity key={activity.id} activity={activity} />
      })}
    </TransactionListWrapper>
  )
}

/* interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useWeb3React()
  const connectionType = getConnection(connector).type

  const theme = useContext(ThemeContext as Context<DefaultTheme>)
  const dispatch = useAppDispatch()

  const isMetaMask = getIsMetaMask()
  const isCoinbaseWallet = getIsCoinbaseWallet()
  const isInjectedMobileBrowser = (isMetaMask || isCoinbaseWallet) && isMobile

  function formatConnectorName() {
    return (
      <WalletName>
        <Trans>Connected with</Trans> {getConnectionName(connectionType, isMetaMask)}
      </WalletName>
    )
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <Trans>Account</Trans>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {!isInjectedMobileBrowser && (
                    <>
                      <WalletAction
                        style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                        onClick={() => {
                          if (connector.deactivate) {
                            connector.deactivate()
                          } else {
                            connector.resetState()
                          }

                          dispatch(updateSelectedWallet({ wallet: undefined }))
                          openOptions()
                        }}
                      >
                        <Trans>Disconnect</Trans>
                      </WalletAction>
                      <WalletAction
                        style={{ fontSize: '.825rem', fontWeight: 400 }}
                        onClick={() => {
                          openOptions()
                        }}
                      >
                        <Trans>Change</Trans>
                      </WalletAction>
                    </>
                  )}
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow data-testid="web3-account-identifier-row">
                <AccountControl>
                  <div>
                    <StatusIcon connectionType={connectionType} />
                    <p>{ENSName ? ENSName : account && shortenAddress(account)}</p>
                  </div>
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={true}
                            href={getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>View on Explorer</Trans>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={false}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>View on Explorer</Trans>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>
            <ThemedText.Body>
              <Trans>Recent Transactions</Trans>
            </ThemedText.Body>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>
              <Trans>(clear all)</Trans>
            </LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <ThemedText.Body color={theme.text1}>
            <Trans>Your transactions will appear here...</Trans>
          </ThemedText.Body>
        </LowerSection>
      )}
    </>
  )
} */
