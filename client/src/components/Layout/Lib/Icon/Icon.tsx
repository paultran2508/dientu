import { Icon } from '@mui/material';

interface PropsIcon {
  name: string
}

const IconStyle = ({ name }: PropsIcon) => {
  return <Icon style={{ fontSize: 'inherit' }} >{name}</Icon>

}

export default IconStyle