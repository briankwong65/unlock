import { Button } from '@unlock-protocol/ui'
import { useCallback } from 'react'

export const AttendeesActionsWrapper = ({
  toggleAll,
  selected,
  bulkApprove,
  bulkDeny,
  allSelected,
}: {
  toggleAll: (keys: any) => void
  selected: { [key: string]: boolean }
  bulkApprove: (keys: any) => void
  bulkDeny: (keys: any) => void
  allSelected: boolean
}) => {
  const numberOfSelected = Object.values(selected).filter(
    (value) => !!value
  ).length
  const AttendeesActions = ({ keys }: { keys: any }) => {
    const toggle = useCallback(() => {
      toggleAll(keys)
    }, [keys])

    return (
      <div className="flex gap-2">
        <Button onClick={toggle} variant="secondary" size="small">
          {allSelected ? 'Unselect all' : 'Select all'}
        </Button>
        <Button
          onClick={() => bulkApprove(keys)}
          disabled={numberOfSelected === 0}
          variant="secondary"
          size="small"
        >
          Approve {numberOfSelected === 0 ? '' : numberOfSelected}
        </Button>
        <Button
          onClick={() => bulkDeny(keys)}
          disabled={numberOfSelected === 0}
          variant="secondary"
          size="small"
        >
          Deny {numberOfSelected === 0 ? '' : numberOfSelected}
        </Button>
      </div>
    )
  }
  return AttendeesActions
}
