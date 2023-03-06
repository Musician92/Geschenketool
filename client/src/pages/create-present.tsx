import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import Form from "components/common/Form";


const CreatePresent = () => {
    const currentLocation = window.location;
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
            person: currentLocation.pathname.split('/')[1],
            date: date,
        });
    };

    return (
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