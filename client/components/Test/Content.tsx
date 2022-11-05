
type Props = {
  imgs: string[]
}

const Content = ({ imgs }: Props) => {
  console.log("render")
  return (
    <div>{
      imgs.map(img => <h2 key={img}>{img}</h2>)}</div>
  )
}

export default Content