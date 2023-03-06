import {Box, Typography, Stack} from "@pankod/refine-mui";
import { useTable } from "@pankod/refine-core";

interface ProgressBarProps{
  title: string,
  percentage: number,
  color: string,

}

const ProgressBar = ({title, percentage, color}:ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>

    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#e4e8ef">
        <Box 
          width={`${percentage}%`}
          bgcolor={color}
          position="absolute"
          height="100%"
          borderRadius={1}
        />
      </Box>

  </Box>
)

const PresentReferrals = () => {
  const {
    tableQueryResult: { data },
  } = useTable();

  const allPresents = data?.data ?? [];

  const presentReferralsInfo = [
    {
      title: 'Tech',
      percentage: allPresents?.filter(presents=>presents.presentType==="tech").length/allPresents?.length*100,
      color: '#6C5DD3',
    },
    {
      title: 'Beauty',
      percentage: allPresents?.filter(presents=>presents.presentType==="beauty").length/allPresents?.length*100,
      color: '#7FBA7A',
    },
    {
      title: 'Nerd',
      percentage: allPresents?.filter(presents=>presents.presentType==="nerd").length/allPresents?.length*100,
      color: '#FFCE73',
    },
    {
      title: 'Game',
      percentage: allPresents?.filter(presents=>presents.presentType==="game").length/allPresents?.length*100,
      color: '#F45252',
    },
    {
      title: 'Art',
      percentage: allPresents?.filter(presents=>presents.presentType==="art").length/allPresents?.length*100,
      color: '#F45252',
    },
    {
      title: 'Others',
      percentage: allPresents?.filter(presents=>presents.presentType==="others").length/allPresents?.length*100,
      color: '#0099ff',
    },
  ];
  return (
    <Box
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Geschenkkategorien
      </Typography>

      <Stack my="20px" direction="column" gap= {4}>
        {presentReferralsInfo.map((bar) =>
        <ProgressBar key={bar.title}{...bar}/>
        )}
      </Stack>
      
    </Box>
  )
}

export default PresentReferrals