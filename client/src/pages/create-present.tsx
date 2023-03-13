import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { Box } from "@pankod/refine-mui";
import { notPass } from "../assets";

import Form from "components/common/Form";


const CreatePresent = () => {
    var url = window.location.pathname;
    var names = url.split('/')[1];
    const { data: user } = useGetIdentity();
    let date = new Date()
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
            email: user.email,
            person: names,
            date: date,
        });
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
            alt="Stay Out"
            src={notPass}
            />
        )
    } else return (
        <Form
            type="Erstelle"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
        />
    );
};
export default CreatePresent;