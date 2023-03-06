import { Link } from "@pankod/refine-react-router-v6";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
} from "@pankod/refine-mui";

import { PresentCardProps } from "interfaces/present";



const PresentCard = ({
    id,
    title,
    price,
}: PresentCardProps) => {
    var url = window.location.pathname;

    return (
        <Card
            component={Link}
            to={url+`/show/${id}`}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
            }}
            elevation={0}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#DADADA"
                    height="fit-content"
                >
                    <Typography fontSize={12} fontWeight={600} color="#11142d">
                        €{price}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PresentCard;
