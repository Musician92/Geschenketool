import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useTable } from "@pankod/refine-core";
import {
    PieChart,
    PresentReferrals,
    TotalPresents,
} from "components";

const Home = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
    } = useTable();

    const allPresents = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Sarahs Geschenke"
                    value={allPresents?.filter(presents=>presents.person.includes("sarah")).length}
                    series={[(1-allPresents?.filter(presents=>presents.person.includes("sarah")).length/allPresents.length), (allPresents?.filter(presents=>presents.person.includes("sarah")).length/allPresents.length)]}
                    colors={["#a5a2b0", "#9cdb84"]}
                />
                <PieChart
                    title="Jonas Geschenke"
                    value={allPresents?.filter(presents=>presents.person.includes("jonas")).length}
                    series={[1-allPresents?.filter(presents=>presents.person.includes("jonas")).length/allPresents.length, allPresents?.filter(presents=>presents.person.includes("jonas")).length/allPresents.length]}
                    colors={["#a5a2b0", "#9cdb84"]}
                />
                <PieChart
                    title="Ralfs Geschenke"
                    value={allPresents?.filter(presents=>presents.person.includes("ralf")).length}
                    series={[1-allPresents?.filter(presents=>presents.person.includes("ralf")).length/allPresents.length, allPresents?.filter(presents=>presents.person.includes("ralf")).length/allPresents.length]}
                    colors={["#a5a2b0", "#9cdb84"]}
                />
                <PieChart
                    title="Georgs Geschenke"
                    value={allPresents?.filter(presents=>presents.person.includes("georg")).length}
                    series={[1-allPresents?.filter(presents=>presents.person.includes("georg")).length/allPresents.length, allPresents?.filter(presents=>presents.person.includes("georg")).length/allPresents.length]}
                    colors={["#a5a2b0", "#9cdb84"]}
                />
                <PieChart
                    title="Nics Geschenke"
                    value={allPresents?.filter(presents=>presents.person.includes("nic")).length}
                    series={[1-allPresents?.filter(presents=>presents.person.includes("nic")).length/allPresents.length, allPresents?.filter(presents=>presents.person.includes("nic")).length/allPresents.length]}
                    colors={["#a5a2b0", "#9cdb84"]}
                />
            </Box>

            <Stack
                mt="25px"
                width="100%"
                direction={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <TotalPresents />
                <PresentReferrals />
            </Stack>
        </Box>
    );
};

export default Home;