import { useCallback, useMemo } from 'react'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { updateReceiptAtom, receiptAtom } from '@cow/modules/limitOrders/state/limitOrdersReceiptAtom'
import {
  ParsedOrder,
  useLimitOrdersList,
} from '@cow/modules/limitOrders/containers/OrdersWidget/hooks/useLimitOrdersList'

export function useCloseReceiptModal() {
  const updateReceiptState = useUpdateAtom(updateReceiptAtom)
  return useCallback(() => updateReceiptState({ orderId: null }), [updateReceiptState])
}

export function useSelectReceiptOrder() {
  const updateReceiptState = useUpdateAtom(updateReceiptAtom)
  return useCallback((orderId: string) => updateReceiptState({ orderId }), [updateReceiptState])
}

export function useSelectedOrder(): ParsedOrder | null {
  const { orderId } = useAtomValue(receiptAtom)
  const orders = useLimitOrdersList()

  return useMemo(() => {
    if (!orderId || !orders) {
      return null
    }

    const allOrders = Object.values(orders).flat()

    return allOrders.find(({ id }) => id === orderId) || null
  }, [orderId, orders])
}
