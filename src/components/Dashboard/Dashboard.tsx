import ChartLine from '../ChartLine/ChartLine'
import Tile from '../Tile/Tile'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <>
      <Tile title="Income" subTitle="Month: " />
      <ChartLine />
      <Tile title="Expense" subTitle="Month: " />
      <ChartLine />
    </>
  )
}

export default Dashboard