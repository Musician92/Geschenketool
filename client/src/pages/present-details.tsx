/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
    Delete,
    Edit,
    Star,
} from "@mui/icons-material";

import { CustomButton } from "components";
import { noParking } from "../assets";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const PresentDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();
    var url = window.location.pathname;
    var names = url.split('/')[1];
 
    const { data, isLoading, isError } = queryResult;

    const presentDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const currentLocation = window.location;

    const isCurrentUser = user.email === presentDetails.creator.email;

    const handleDeletePresent = () => {
        const response = confirm(
            "Are you sure you want to delete this present?",
        );
        if (response) {
            mutate(
                {
                    resource: currentLocation.pathname.split('/')[1],
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/"+ currentLocation.pathname.split('/')[1]);
                    },
                },
            );
        }
    };

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
            alt="No Parking"
            src={noParking}
            />
        )
    } else return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"

        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1}>
                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {presentDetails.presentType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {presentDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Typography fontSize={14} color="#808191">
                                        <a href={presentDetails.link} target="_blank" rel="noreferrer">{presentDetails.link}</a>
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Preis
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        €{presentDetails.price}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Beschreibung
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {presentDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(presentDetails.creator.avatar)
                                        ? presentDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {presentDetails.creator.name}
                                </Typography>
                            </Box>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {presentDetails.creator.allPresents.length}{" "}
                                Geschenke
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title="Bearbeiten"
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={<Edit />}
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            "/"+ currentLocation.pathname.split('/')[1]+`/edit/${presentDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title="Löschen"
                                backgroundColor= "#d42e2e"
                                color="#FCFCFC"
                                fullWidth
                                icon={<Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeletePresent();
                                }}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default PresentDetails;