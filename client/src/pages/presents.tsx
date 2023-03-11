import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useGetIdentity } from "@pankod/refine-core";
import { useMemo } from "react";
import { StayOut } from "../assets";

import { PresentCard, CustomButton } from "components";

const AllPresents = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    var url = window.location.pathname;
    var names = url.split("/").pop();

 
    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    
    const allPresents = data?.data ?? [];
   

    const currentPrice = sorter.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

   
    return {
        title:
            logicalFilters.find((item) => item.field === "title")?.value ||
            "",
        presentType:
            logicalFilters.find((item) => item.field === "presentType")
                ?.value || "",
        person:
            logicalFilters.find((item) => item.field === "person")
                ?.value || "",
    };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    if (user.name.toLowerCase().includes(names))
    {
        return  (
            <Box
            component="img"
            sx={{
            height: 466,
            width: 700,
            maxHeight: { xs: 233, md: 932 },
            maxWidth: { xs: 350, md: 1040 },
            }}
            alt="Stay Out"
            src={StayOut}
            />
        )
    } else return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!allPresents.length
                            ? "Bisher leider keine Geschenkideen, ihr Bitses!"
                            : "Alle Geschenkideen"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Preis sortieren ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor="#957cab"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Nach Namen suchen"
                                value={currentFilterValues?.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues?.presentType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "presentType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">Alle</MenuItem>
                                {[
                                    "Techy",
                                    "Beauty",
                                    "Nerdy",
                                    "Game",
                                    "Art",
                                    "Others",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <CustomButton
                    title="Geschenk hinzufügen"
                    handleClick={() => navigate(url+"/create")}
                    backgroundColor="#957cab"
                    color="#fcfcfc"
                    icon={<Add />}
                />
            </Stack>

            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3}}>
                {allPresents?.filter(presents=>presents.person.includes(names)).map((present) => (
                    <PresentCard
                        key={present._id}
                        id={present._id}
                        title={present.title}
                        price={present.price}
                    />
                ))}
            </Box>

            {allPresents.filter(presents=>presents.person.includes(names)).length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Vorherige"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#957cab"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Seite{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Nächste"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#957cab"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10,
                            )
                        }
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    );
};

export default AllPresents;