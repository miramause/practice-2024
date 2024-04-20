import { useMutation } from '@tanstack/react-query';
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from 'react-hook-form';
import { createEditCabin } from "../../services/apiCabins";
import { toast } from 'react-hot-toast';
import { useQueryClient } from "@tanstack/react-query"
import PropTypes from 'prop-types';
// import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm1({cabinToEdit}) {
  const {id: editId, ...editValue} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValue: isEditSession ? editValue : {},
  });

  const queryClient = useQueryClient();

  const {errors} = formState;

  // const {isCreating, createCabin} = useCreateCabin;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created!")
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })

  const { mutate:editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin edited!")
      useQueryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {

    const image = typeof data.image === 'string' ? data.image : data.image[0]
    console.log(data)
    if (isEditSession) editCabin({newCabinData: {...DataTransfer, image}, id: editId});
    else createCabin({...data, image: image})
  }

  function onError(errors){
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled = {isWorking} {...register("name",
          {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.name?.message}>
        <Input type="number" id="maxCapacity" disabled = {isWorking} {...register("maxCapacity",
          {
            required: "This field is required",
            min: {
              value: 1,
              message: 'Capasity must be al least 1'
            }
          })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.name?.message}>
        <Input type="number" id="regularPrice" disabled = {isWorking} {...register("regularPrice",
          {
            required: "This field is required",
            min: {
              value: 1,
              message: 'Capasity must be al least 1'
            }
          })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.name?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled = {isWorking} {...register("discount",
          {
            required: "This field is required",
            validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"
          })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.name?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled = {isWorking} {...register("description",
          {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow label="Cabin image" >
        <FileInput id="image" accept="image/*"
        {...register("image",
        {
          required: isEditSession ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession ? 'Edit cabin' : 'Add cabin'}Add cabin</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm1.propTypes = {

  cabinToEdit: PropTypes.object.isRequired, // Example validation, adjust as needed
};

export default CreateCabinForm1;
