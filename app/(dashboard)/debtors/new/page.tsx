import Topbar from '@/components/layout/Topbar'
import AddDebtorWizard from '@/components/debtors/AddDebtorWizard'

export default function NewDebtorPage() {
  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Add Debtor" backHref="/debtors" />
      <AddDebtorWizard />
    </div>
  )
}
