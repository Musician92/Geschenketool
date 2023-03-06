import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Box, Typography, Stack} from "@pankod/refine-mui";
import { ArrowCircleUpRounded } from '@mui/icons-material';
import { TotalPresentsOptions} from './charts.config';

import { useTable } from "@pankod/refine-core";

const TotalPresents = () => {

    const {
        tableQueryResult: { data },
    } = useTable();

    const allPresents = data?.data ?? [];

    const TotalPresentsSeries = [
      {
        name: 'Anzahl',
        data: Array.from({length: 12}, (v, k) => k).map(month => allPresents?.filter(presents=> new Date(presents.date).getMonth() === month).length),
      }
    ];

  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Anzahl Geschenke
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          {allPresents.length}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{
            fontSize: 25, color: "#957cab"
          }}/>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalPresentsSeries}
        type="bar"
        height={310}
        options={TotalPresentsOptions}
      />

    </Box>
  )
}

export default TotalPresents