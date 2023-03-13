import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";




const CreatePresent = () => {
    var url = window.location.pathname;
    var names = url.split('/')[1];
    const { data: user } = useGetIdentity();
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
        });
    };

    return (
        <Form
            type="Bearbeiten"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
        />
    );
};

export default CreatePresent;