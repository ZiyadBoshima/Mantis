import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      Delete Issue
    </Button>
  )
}

export default DeleteIssueButton