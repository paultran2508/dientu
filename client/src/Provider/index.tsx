import { AlertOptions, positions, Provider as Alert } from 'react-alert'

import TemplateAlertBasic from './Alert'

type Props = {
  children: React.ReactNode
}

const options: AlertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
}

const Provider = ({ children }: Props) => {
  return (
    <Alert template={TemplateAlertBasic} {...options}>
      {children}
    </Alert>
  )
}

export default Provider